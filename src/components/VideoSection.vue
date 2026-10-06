<script setup>
import { ref, computed } from 'vue'
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValueEvent } from 'motion-v'
import VideoModal from './VideoModal.vue'
import WatchButton from './WatchButton.vue'
import SoundToggle from './SoundToggle.vue'
import { VIDEO } from '../config'
import { useReveal, SPRING_SCROLL } from '../motion/presets'
import { useTeaser } from '../motion/useTeaser'

// Escala inicial da janela (fonte única: vira --s0 no CSS) e raio visual do card
const S0 = 0.5
const RAIO = 28

// reduced-motion: sem pin nem autoplay; a prévia fica parada com os controles nativos
const { reduce: estatico } = useReveal()

const secao = ref(null)
const teaser = ref(null)
const modal = ref(null)
const aberto = ref(false)
const cheio = ref(false)

// Como na virada: progresso do pin -> spring sem oscilação -> transforms
const { scrollYProgress } = useScroll({ target: secao, offset: ['start start', 'end end'] })
const progresso = useSpring(scrollYProgress, SPRING_SCROLL)
const scale = useTransform(progresso, [0, 0.7], [S0, 1])
// Raio compensado pela escala (visual RAIO -> 0): exceção medida a transform/opacity (360x740, CPU 6x:
// empata com raio fixo, ~20 Paints/6-11ms em 148 frames). String px: motion-v ignora número no 1º render.
const borderRadius = useTransform(scale, (s) => `${Math.max(0, (RAIO * (1 - (s - S0) / (1 - S0))) / s)}px`)
const tituloOpacity = useTransform(progresso, [0.12, 0.4], [1, 0])
const tituloY = useTransform(progresso, [0.12, 0.4], [0, -32])

useMotionValueEvent(progresso, 'change', (v) => (cheio.value = v > 0.72))

// Prévia (~5MB, 1080p): pré-carga 300px antes da seção, toca com o vídeo na tela e o player fechado
const liberado = computed(() => !estatico.value && !aberto.value)
const { iniciou, comSom, pede, terminou, ouviuComSom, acionar, aoAvancar } = useTeaser({ video: teaser, secao, liberado })

// Síncrono no clique: o play() com som precisa acontecer dentro do gesto (iOS)
// Abrir o completo encerra a prévia (não volta a falar ao fechar). Quem já ouviu a prévia com som
// continua dali no completo (mesmo vídeo, tempo 1:1); quem viu mudo ou nem viu começa do zero.
function abrirPlayer(e) {
  const v = teaser.value
  aberto.value = true
  terminou.value = true
  v.pause()
  modal.value.abrir(e.currentTarget, ouviuComSom.value ? v.currentTime : 0)
}
</script>

<template>
  <section id="convite" ref="secao" class="convite" :class="{ 'convite--animado': !estatico }"
    :style="{ '--s0': S0 }" aria-labelledby="convite-titulo">
    <div class="palco">
      <motion.h2 id="convite-titulo" class="titulo"
        :style="estatico ? null : { opacity: tituloOpacity, y: tituloY }">Posso provar.</motion.h2>

      <motion.div class="janela" :style="estatico ? null : { scale, borderRadius }">
        <!-- sem autoplay/loop e preload none: só baixa/toca quando o useTeaser chamar o play() -->
        <video ref="teaser" class="midia" :src="VIDEO.teaser" :poster="VIDEO.poster" :controls="estatico"
          playsinline preload="none" aria-label="Prévia do convite em vídeo do Armando"
          @ended="terminou = true" @timeupdate="aoAvancar"></video>
      </motion.div>

      <div class="acoes">
        <WatchButton :visivel="estatico || cheio || terminou" :destaque="terminou" @click="abrirPlayer" />
      </div>

      <AnimatePresence>
        <SoundToggle v-if="(iniciou || pede) && !terminou" :modo="pede ?? 'toggle'" :com-som="comSom"
          @click="acionar" />
      </AnimatePresence>
    </div>

    <VideoModal ref="modal" @fechar="aberto = false" />
  </section>
</template>

<style scoped>
.convite {
  position: relative; /* cálculo do offset no useScroll */
  background: var(--light);
  /* janela final: tela inteira. No retrato, largura toda em 5:4: mostra os 70% centrais do quadro,
     o bastante pro logo SHALOM inteiro (18-82% da largura); 2:3 cortava os letreiros */
  --janela-h: 100dvh;
}

@media (orientation: portrait) {
  .convite { --janela-h: min(100dvh, 80vw); }
}

/* ---- versão estática (reduced-motion) ---- */
.palco {
  display: grid;
  text-align: center;
  justify-items: center;
  gap: clamp(1.5rem, 5vw, 2.5rem);
  width: min(100% - 2.5rem, 1080px);
  margin-inline: auto;
  padding-block: clamp(4.5rem, 14vw, 8rem);
}

.janela { width: 100%; aspect-ratio: 16 / 9; overflow: clip; border-radius: 20px; background: var(--ink); }

.midia { width: 100%; height: 100%; object-fit: cover; }

/* ---- janela que cresce (pin) ---- */
.convite--animado { height: 240vh; }

.convite--animado .palco {
  position: sticky;
  top: 0;
  display: block;
  width: 100%;
  height: 100dvh;
  padding: 0;
  overflow: clip;
}

.convite--animado .titulo {
  position: absolute;
  inset-inline: 1.25rem;
  bottom: calc(50% + var(--janela-h) * var(--s0) / 2 + 1.25rem);
}

/* celular deitado: não há espaço entre o header e o card; o título sai (segue no aria-labelledby) */
@media (max-height: 500px) {
  .convite--animado .titulo { display: none; }
}

.convite--animado .janela {
  position: absolute;
  inset: 0;
  margin: auto;
  height: var(--janela-h);
  aspect-ratio: auto;
  border-radius: 0;
  will-change: transform;
}

.convite--animado .acoes {
  position: absolute;
  inset-inline: 0;
  bottom: calc((100dvh - var(--janela-h)) / 2 + 1.5rem);
  display: flex;
  justify-content: center;
}
</style>
