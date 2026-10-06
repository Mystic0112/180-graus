import { ref, watch, computed } from 'vue'
import { useInView } from 'motion-v'

/**
 * Prévia falada (17s, com áudio), tocada uma vez.
 * - Toca quando metade do <video> está na tela (e `liberado`); fora disso, pausa e retoma depois.
 * - Tenta COM som. Sem gesto prévio na página (scroll não conta) o navegador barra: toca mudo
 *   e pede "Toque pra ouvir". Se até o mudo for barrado (iPhone em Pouca Energia), pede "Toque pra ver".
 * - Terminou (ou abriu o completo): fica parada e não volta a tocar sozinha.
 */
export function useTeaser({ video, secao, liberado }) {
  const iniciou = ref(false)
  const comSom = ref(false)
  const pede = ref(null) // null | 'ouvir' | 'ver'
  const terminou = ref(false)
  const ouviuComSom = ref(false) // decide se o completo continua daqui ou começa do zero
  let escolha = null // true/false depois que a pessoa mexe no som

  // Pré-carga 300px antes da seção (o arquivo é grande); o play só com o vídeo na tela
  const perto = useInView(secao, { margin: '0px 0px 300px 0px', once: true })
  const naTela = useInView(video, { amount: 0.5 })
  const ativo = computed(() => liberado.value && naTela.value)

  watch(perto, (sim) => {
    if (sim && liberado.value && video.value) video.value.preload = 'auto'
  })

  function marcarInicio(v) {
    iniciou.value = true
    comSom.value = !v.muted
    pede.value = v.muted && escolha === null ? 'ouvir' : null
  }

  const tentar = (v) => v.play().then(() => 'ok', (e) => e.name)

  async function tocar(v) {
    if (v.ended || terminou.value) return
    v.muted = !(escolha ?? navigator.userActivation?.hasBeenActive ?? true)
    let r = await tentar(v)
    if (r === 'NotAllowedError' && !v.muted) {
      v.muted = true
      r = await tentar(v)
    }
    // AbortError (saiu da tela no meio) e afins: nada a fazer, a próxima entrada tenta de novo
    if (r === 'ok') marcarInicio(v)
    else if (r === 'NotAllowedError') pede.value = 'ver'
  }

  // Clique no botão de som. Dentro do gesto: tirar o mudo não reinicia nem pausa o vídeo,
  // e o play() com som é liberado mesmo quando o autoplay mudo foi barrado.
  function acionar() {
    const v = video.value
    if (!v) return
    if (pede.value === 'ver') {
      escolha = true
      v.muted = false
      v.play().then(() => marcarInicio(v)).catch(() => {})
      return
    }
    v.muted = !v.muted
    escolha = !v.muted
    comSom.value = escolha
    pede.value = null
  }

  // @timeupdate: tocou com som em algum momento?
  function aoAvancar(e) {
    if (!e.target.paused && !e.target.muted) ouviuComSom.value = true
  }

  watch([ativo, video], ([on, v]) => {
    if (!v) return
    if (on) tocar(v)
    else v.pause()
  })

  return { iniciou, comSom, pede, terminou, ouviuComSom, acionar, aoAvancar }
}
