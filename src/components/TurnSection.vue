<script setup>
import { ref } from 'vue'
import { motion, useScroll, useSpring, useTransform } from 'motion-v'
import { useReveal, SPRING_SCROLL } from '../motion/presets'

const { reduce } = useReveal()
const wrap = ref(null)

// Progresso do scroll enquanto a seção está "pinada"
const { scrollYProgress } = useScroll({
  target: wrap,
  offset: ['start start', 'end end'],
})

// Spring sobre o progresso: a virada ganha inércia em vez de seguir o dedo 1:1
const progresso = useSpring(scrollYProgress, SPRING_SCROLL)

// A virada: fundo escuro -> claro, texto claro -> escuro, 180° gira meia-volta
const bg = useTransform(progresso, [0.05, 0.8], ['#0a1f12', '#f5f0df'])
const ink = useTransform(progresso, [0.35, 0.7], ['#f5f0df', '#141a12'])
// Começa de cabeça pra baixo (mundo invertido) e endireita quando a página clareia
const rotate = useTransform(progresso, [0.1, 0.7], [180, 0])
const punchOpacity = useTransform(progresso, [0.55, 0.78], [0, 1])
const punchY = useTransform(progresso, [0.55, 0.78], [24, 0])
</script>

<template>
  <section
    id="virada"
    ref="wrap"
    class="turn"
    :class="{ 'turn--animated': !reduce }"
    aria-label="A virada de chave que você está buscando, está em Deus"
  >
    <motion.div v-if="!reduce" class="stage" :style="{ backgroundColor: bg }">
      <div class="wrap inner">
        <motion.p class="line" :style="{ color: ink }">
          A virada de chave<br />que você está buscando
        </motion.p>
        <motion.span class="dial" aria-hidden="true" :style="{ rotate, color: ink }">
          180°
        </motion.span>
        <motion.p
          class="line line--punch"
          :style="{ color: ink, opacity: punchOpacity, y: punchY }"
        >
          está em Deus.
        </motion.p>
      </div>
    </motion.div>

    <!-- Versão estática para prefers-reduced-motion -->
    <div v-else class="stage stage--static">
      <div class="wrap inner">
        <p class="line">A virada de chave<br />que você está buscando</p>
        <span class="dial" aria-hidden="true">180°</span>
        <p class="line line--punch">está em Deus.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* position: relative garante o cálculo correto do offset no useScroll (aviso do motion-v) */
.turn {
  position: relative;
}

.turn--animated {
  height: 260vh;
}

.stage {
  position: sticky;
  top: 0;
  height: 100dvh;
  display: grid;
  align-items: center;
  overflow: clip;
}

.stage--static {
  position: static;
  height: auto;
  background: var(--light);
  color: var(--ink);
  padding-block: clamp(4.5rem, 14vw, 8rem);
}

.inner {
  display: grid;
  justify-items: start;
  gap: clamp(1rem, 4vw, 2rem);
}

.line {
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 8vw, 3.6rem);
  line-height: 1.02;
  text-transform: uppercase;
}

.line--punch {
  font-size: clamp(2.6rem, 11vw, 5.4rem);
  will-change: transform, opacity;
}

.dial {
  font-family: var(--font-display);
  font-size: clamp(6rem, 32vw, 14rem);
  line-height: 1;
  display: inline-block;
  will-change: transform;
}
</style>
