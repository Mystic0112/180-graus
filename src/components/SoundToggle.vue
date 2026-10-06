<script setup>
import { motion } from 'motion-v'
import { SPRING_TAP } from '../motion/presets'

// modo 'ouvir' | 'ver': o navegador barrou o autoplay (com som / até mudo) -> chamada grande
// no centro do vídeo. 'toggle': mudo discreto no canto (o vídeo fala alto no meio da rua).
// Mesmo elemento nos três modos: trocar de modo não perde o foco do teclado.
defineProps({
  modo: { type: String, default: 'toggle' },
  comSom: { type: Boolean, default: false },
})
</script>

<template>
  <motion.button
    type="button"
    class="som"
    :class="modo === 'toggle' ? 'som--toggle' : 'som--pede'"
    :aria-label="modo === 'toggle' ? 'Som do vídeo' : null"
    :aria-pressed="modo === 'toggle' ? comSom : null"
    :initial="{ opacity: 0, scale: 0.85 }"
    :animate="{ opacity: 1, scale: 1 }"
    :exit="{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }"
    :transition="SPRING_TAP"
    :while-press="{ scale: 0.95 }"
  >
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path v-if="modo === 'ver'" d="M7 4.5v15l12.5-7.5z" fill="currentColor" />
      <template v-else>
        <path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor" />
        <path v-if="comSom || modo === 'ouvir'" d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none" />
        <path v-else d="M16 9.5l5 5M21 9.5l-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </template>
    </svg>
    <span v-if="modo === 'ouvir'">Toque pra ouvir</span>
    <span v-else-if="modo === 'ver'">Toque pra ver</span>
  </motion.button>
</template>

<style scoped>
.som {
  position: absolute;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  border: 0;
  cursor: pointer;
  font: 700 1.1rem var(--font-body);
}

.som svg { flex: none; }

/* centro do palco = centro do vídeo em qualquer escala */
.som--pede {
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  min-height: 60px;
  padding: 0 1.6rem 0 1.3rem;
  width: max-content; /* absolute + left 50%: sem isso quebra/encolhe no 360px */
  border-radius: 999px;
  background: var(--light);
  color: var(--ink);
  box-shadow: 0 10px 30px rgba(10, 31, 18, 0.45);
}

/* canto superior direito da janela final, sempre abaixo do header (64px) e longe do
   "Assistir" (centro, embaixo) e do CTA fixo (rodapé) */
.som--toggle {
  top: max(5rem, calc((100dvh - var(--janela-h)) / 2 + 1rem));
  right: 1rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--ink);
  color: var(--light);
  box-shadow: 0 6px 18px rgba(10, 31, 18, 0.4);
}
</style>
