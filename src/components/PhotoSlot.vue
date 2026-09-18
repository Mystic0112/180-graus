<script setup>
import { computed } from 'vue'
import { motion } from 'motion-v'
import { useReveal } from '../motion/presets'

const props = defineProps({
  titulo: { type: String, required: true },
  frase: { type: String, required: true },
  // Sem src, renderiza o placeholder de gradiente (layout idêntico ao da foto real)
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  ratio: { type: String, default: '4 / 5' },
  variant: { type: Number, default: 0 },
  delay: { type: Number, default: 0 },
})

const { reduce } = useReveal()

// Legenda entra um tico depois do card
const capMotion = computed(() =>
  reduce.value
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        inViewOptions: { once: true, amount: 0.4 },
        transition: { type: 'spring', stiffness: 110, damping: 22, delay: props.delay + 0.15 },
      },
)
</script>

<template>
  <figure class="slot">
    <div class="frame" :style="{ aspectRatio: ratio }">
      <img
        v-if="src"
        :src="src"
        :alt="alt || `${titulo} no 180 GRAUS`"
        loading="lazy"
        decoding="async"
        class="media"
      />
      <div v-else class="media ph" :class="`ph--${variant % 3}`" aria-hidden="true">
        <span class="ph-letra">{{ titulo[0] }}</span>
      </div>
    </div>
    <motion.figcaption v-bind="capMotion" class="cap">
      <strong>{{ titulo }}</strong>
      <span>{{ frase }}</span>
    </motion.figcaption>
  </figure>
</template>

<style scoped>
.slot {
  display: grid;
  gap: 0.6rem;
}

.frame {
  border-radius: 20px;
  overflow: clip;
}

.media {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Identidade: fotos em preto e branco; no hover revelam a cor e dão um zoom leve */
img.media {
  filter: grayscale(1);
  transition: filter 0.45s ease;
}

.slot:hover img.media,
.slot:focus-within img.media {
  filter: grayscale(0);
}

@media (prefers-reduced-motion: no-preference) {
  img.media {
    transition:
      filter 0.45s ease,
      transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform;
  }

  .slot:hover img.media,
  .slot:focus-within img.media {
    transform: scale(1.04);
  }
}

/* Placeholder elegante: gradiente + inicial gigante. Layout não muda quando a foto real entrar. */
.ph {
  position: relative;
  display: grid;
  place-items: center;
}

.ph--0 {
  background: radial-gradient(120% 120% at 20% 0%, #1a4a2e 0%, var(--dark) 70%);
}

.ph--1 {
  background: radial-gradient(130% 110% at 80% 10%, rgba(47, 158, 94, 0.55) 0%, var(--dark-2) 55%);
}

.ph--2 {
  background: linear-gradient(165deg, var(--dark-2) 0%, #0d2b1a 100%);
}

.ph-letra {
  font-family: var(--font-display);
  font-size: clamp(4rem, 18vw, 8rem);
  color: rgba(245, 240, 223, 0.16);
  line-height: 1;
  user-select: none;
}

.cap {
  display: grid;
  gap: 0.2rem;
  line-height: 1.4;
}

.cap strong {
  font-family: var(--font-display);
  font-weight: 400;
  text-transform: uppercase;
  font-size: clamp(1.5rem, 3.2vw, 1.9rem);
  letter-spacing: 0.03em;
}

.cap span {
  color: var(--ink-soft);
  font-size: clamp(1.05rem, 2.2vw, 1.2rem);
  max-width: 34ch;
}
</style>
