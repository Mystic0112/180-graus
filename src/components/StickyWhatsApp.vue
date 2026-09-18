<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { WHATSAPP_URL } from '../config'
import { useReveal } from '../motion/presets'

const { reduce } = useReveal()
const visivel = ref(false)
let observer

onMounted(() => {
  const hero = document.getElementById('hero')
  if (!hero || !('IntersectionObserver' in window)) {
    visivel.value = true
    return
  }
  // Aparece só depois que o hero (que já tem CTA) sai da tela
  observer = new IntersectionObserver(([entry]) => {
    visivel.value = !entry.isIntersecting
  })
  observer.observe(hero)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <AnimatePresence>
    <motion.div
      v-if="visivel"
      class="fixo"
      :initial="reduce ? false : { y: 96, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :exit="reduce ? undefined : { y: 96, opacity: 0 }"
      :transition="{ type: 'spring', stiffness: 200, damping: 26 }"
    >
      <a class="cta cta--accent botao" :href="WHATSAPP_URL" target="_blank" rel="noopener">
        Quero participar
      </a>
    </motion.div>
  </AnimatePresence>
</template>

<style scoped>
.fixo {
  position: fixed;
  left: 1rem;
  right: 1rem;
  bottom: calc(0.75rem + env(safe-area-inset-bottom));
  z-index: 40;
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.botao {
  pointer-events: auto;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 8px 28px rgba(10, 31, 18, 0.38);
}

@media (min-width: 820px) {
  .fixo {
    justify-content: flex-end;
  }

  .botao {
    width: auto;
  }
}
</style>
