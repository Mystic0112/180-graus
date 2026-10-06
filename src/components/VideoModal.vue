<script setup>
import { ref } from 'vue'
import { animate } from 'motion-v'
import { VIDEO, WHATSAPP_URL } from '../config'
import { useReveal, SPRING_SETTLE } from '../motion/presets'

// <dialog> nativo: trap de foco (sem quebrar os controles do player), Esc, top layer e inert
const emit = defineEmits(['fechar'])

const { reduce } = useReveal()
const dlg = ref(null)
const player = ref(null)
const video = ref(null)
const falhou = ref(false)
let gatilho = null
let fechando = false
let sessao = 0 // um close pendente de uma abertura anterior não fecha a nova

// Chamar direto no handler do clique: showModal + play() síncronos ficam dentro do
// gesto do usuário, o que libera o som (iOS inclusive). O src só entra aqui: os ~16MB
// (720p, tocam enquanto baixam) só descem depois do clique.
// inicio: segundos já ouvidos na prévia (vale só no 1º carregamento; depois retoma onde parou)
function abrir(origem, inicio = 0) {
  const v = video.value
  gatilho = origem
  sessao++
  fechando = false
  falhou.value = false
  if (!v.getAttribute('src')) {
    v.src = VIDEO.completo
    v.currentTime = inicio // antes dos metadados vira a posição inicial padrão
  } else if (v.error) v.load()
  dlg.value.showModal()
  v.focus()
  v.play().catch(() => {})
  if (reduce.value) return
  animate(dlg.value, { opacity: [0, 1] }, { duration: 0.25 })
  animate(player.value, { opacity: [0, 1], y: [32, 0], scale: [0.96, 1] }, SPRING_SETTLE)
}

// Botão, Esc e clique fora: anima a saída e fecha
async function fechar() {
  if (fechando || !dlg.value?.open) return
  fechando = true
  const minha = sessao
  video.value.pause()
  if (!reduce.value) await animate(dlg.value, { opacity: 0 }, { duration: 0.18 })
  if (minha !== sessao) return
  dlg.value.close()
  dlg.value.style.opacity = ''
  fechando = false
}

// Evento close: cobre também o fechamento forçado pelo navegador (Esc repetido)
function aoFechar() {
  video.value.pause()
  emit('fechar')
  gatilho?.focus()
}

defineExpose({ abrir })
</script>

<template>
  <dialog ref="dlg" class="modal" aria-label="Convite do 180 GRAUS em vídeo"
    @cancel.prevent="fechar" @close="aoFechar" @click.self="fechar">
    <button type="button" class="fechar" @click="fechar">
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" />
      </svg>
      Fechar
    </button>
    <div ref="player" class="player">
      <video ref="video" :poster="VIDEO.poster" controls playsinline @error="falhou = true"></video>
      <p v-if="falhou" class="erro" role="alert">
        Não deu pra carregar o vídeo.
        <span class="erro-links">
          <a :href="VIDEO.completo" target="_blank" rel="noopener">Abrir o vídeo</a>
          <a :href="WHATSAPP_URL" target="_blank" rel="noopener">Falar no WhatsApp</a>
        </span>
      </p>
    </div>
  </dialog>
</template>

<style scoped>
.modal {
  width: 100vw;
  height: 100dvh;
  max-width: none;
  max-height: none;
  margin: 0;
  border: 0;
  padding: 4.5rem 0 calc(1rem + env(safe-area-inset-bottom));
  background: rgba(6, 18, 10, 0.94);
  color: var(--light);
}

.modal[open] { display: grid; place-items: center; }

.modal::backdrop { background: transparent; }

.fechar {
  position: absolute;
  top: calc(0.75rem + env(safe-area-inset-top));
  right: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 48px;
  padding: 0 1.1rem;
  border: 2px solid var(--fog);
  border-radius: 999px;
  background: transparent;
  color: var(--light);
  font: 700 1rem var(--font-body);
  cursor: pointer;
}

.fechar:hover { background: var(--light); color: var(--ink); }

.player { width: min(100%, 1280px, calc((100dvh - 6rem) * 16 / 9)); }

.player video { width: 100%; aspect-ratio: 16 / 9; background: #000; }

.erro {
  display: grid;
  gap: 0.75rem;
  padding: 1.25rem;
  font-weight: 700;
}

.erro-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  font-weight: 400;
}

.erro-links a { display: inline-flex; align-items: center; min-height: 44px; }

@media (min-width: 820px) {
  .player video { border-radius: 20px; }
}
</style>
