import { useReducedMotion } from 'motion-v'

export const EASE_SOFT = [0.22, 1, 0.36, 1]

// Spring de toque: macio, sem oscilação visível
export const SPRING_TAP = { type: 'spring', stiffness: 260, damping: 26 }

// Spring de entrada: assenta em vez de "chegar e parar"
export const SPRING_SETTLE = { type: 'spring', stiffness: 100, damping: 22, mass: 1 }

// Suavização de valores ligados ao scroll (inércia, sem seguir o dedo 1:1)
export const SPRING_SCROLL = { stiffness: 85, damping: 28, mass: 0.6 }

/**
 * Reveal padrão de seção: fade + subida curta que assenta com spring.
 * Retorna {} sob prefers-reduced-motion (conteúdo estático, sempre visível).
 * Uso: <motion.div v-bind="reveal(i)">
 */
export function useReveal() {
  const reduce = useReducedMotion()

  function reveal(i = 0, dist = 20) {
    if (reduce.value) return {}
    return {
      initial: { opacity: 0, y: dist },
      whileInView: { opacity: 1, y: 0 },
      inViewOptions: { once: true, amount: 0.2 },
      transition: { ...SPRING_SETTLE, delay: i * 0.12 },
    }
  }

  return { reduce, reveal }
}
