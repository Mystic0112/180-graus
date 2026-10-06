<script setup>
import { ref, computed } from 'vue'
import { motion } from 'motion-v'
import { VIDEO } from '../config'
import { useReveal, SPRING_SETTLE, SPRING_DESTAQUE } from '../motion/presets'

const props = defineProps({
  visivel: { type: Boolean, default: true },
  destaque: { type: Boolean, default: false }, // prévia terminou: chama pro vídeo completo
})

const { reduce } = useReveal()
// Teclado: com foco visível ele aparece antes da janela encher a tela. Só :focus-visible,
// pra não ficar preso na tela após toque (Android) ou devolução de foco pelo player.
const focado = ref(false)
const mostrar = computed(() => props.visivel || focado.value)

const estado = computed(() =>
  mostrar.value
    ? { opacity: 1, y: 0, scale: props.destaque ? 1.08 : 1 }
    : { opacity: 0, y: 24, scale: 0.92 },
)
</script>

<template>
  <motion.button
    type="button"
    class="cta cta--dark assistir"
    :class="{ 'assistir--oculto': !mostrar, 'assistir--destaque': destaque }"
    :initial="false"
    :animate="estado"
    :transition="reduce ? { duration: 0 } : destaque ? SPRING_DESTAQUE : SPRING_SETTLE"
    :while-press="{ scale: 0.97 }"
    @focus="focado = $event.target.matches(':focus-visible')"
    @blur="focado = false"
  >
    <svg class="play" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      <path d="M10 7.5v9l7-4.5z" class="play-seta" />
    </svg>
    <span class="rotulo">
      Assistir vídeo completo
      <span class="extra">
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <path d="M4 9v6h4l5 4V5L8 9zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z" fill="currentColor" />
        </svg>
        com som · {{ VIDEO.duracao }}
      </span>
    </span>
  </motion.button>
</template>

<style scoped>
.assistir {
  gap: 0.75rem;
  min-height: 60px;
  padding: 0.6rem 1.6rem 0.6rem 0.7rem;
  border: 0;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(10, 31, 18, 0.4);
}

.assistir--oculto {
  pointer-events: none;
}

.assistir--destaque {
  box-shadow: 0 0 0 4px var(--accent), 0 10px 30px rgba(10, 31, 18, 0.4);
}

.play {
  flex: none;
  width: 44px;
  height: 44px;
  color: var(--accent);
}

.play-seta {
  fill: var(--ink);
}

.rotulo {
  display: grid;
  justify-items: start;
  line-height: 1.2;
  text-align: left;
}

.extra {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.82rem;
  font-weight: 400;
  color: var(--fog);
}
</style>
