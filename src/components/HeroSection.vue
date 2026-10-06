<script setup>
import { motion, useScroll, useSpring, useTransform } from 'motion-v'
import CtaButton from './CtaButton.vue'
import { INSCRICAO_URL, INSTAGRAM_URL, EVENTO } from '../config'
import { useReveal, EASE_SOFT, SPRING_SCROLL } from '../motion/presets'

const { reduce } = useReveal()

// Parallax sutil no "180°" fantasma do fundo, com inércia
const { scrollY } = useScroll()
const ghostY = useSpring(useTransform(scrollY, [0, 800], [0, 140]), SPRING_SCROLL)

// Entrada em stagger no carregamento, assentando devagar
const enter = (delay) =>
  reduce.value
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 1.05, delay, ease: EASE_SOFT },
      }
</script>

<template>
  <section id="hero" class="hero">
    <motion.span class="ghost" aria-hidden="true" :style="reduce ? null : { y: ghostY }">
      180°
    </motion.span>
    <span class="spark spark--a" aria-hidden="true">✦</span>
    <span class="spark spark--b" aria-hidden="true">✦</span>

    <div class="wrap hero-inner">
      <motion.h1 v-bind="enter(0)" class="title">
        <span class="title-num">180</span>
        <span class="title-word">graus</span>
      </motion.h1>

      <motion.p v-bind="enter(0.18)" class="sub">
        {{ EVENTO.data }}, no {{ EVENTO.local }}. Pra você que tem 14 anos ou mais.
      </motion.p>

      <motion.div v-bind="enter(0.34)" class="actions">
        <CtaButton :href="INSCRICAO_URL" variant="accent">Quero participar</CtaButton>
        <CtaButton :href="INSTAGRAM_URL" variant="ghost">Instagram</CtaButton>
      </motion.div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100dvh;
  display: flex;
  align-items: flex-end;
  padding: 6rem 0 3.5rem;
  overflow: clip;
  background: radial-gradient(130% 90% at 75% 0%, var(--dark-2) 0%, var(--dark) 60%);
}

/* Motif: pontilhado halftone dos cartazes, estático e barato */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background-image: radial-gradient(rgba(47, 158, 94, 0.16) 1.3px, transparent 1.4px);
  background-size: 19px 19px;
}

.ghost {
  position: absolute;
  z-index: 2;
  top: -2%;
  right: -8%;
  font-family: var(--font-display);
  font-size: clamp(15rem, 62vw, 36rem);
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 2px rgba(47, 158, 94, 0.35);
  user-select: none;
  pointer-events: none;
  will-change: transform;
}

/* Motif: faíscas desenhadas dos cartazes */
.spark {
  position: absolute;
  z-index: 2;
  color: var(--accent);
  font-size: 1.8rem;
  line-height: 1;
  user-select: none;
  pointer-events: none;
}

.spark--a {
  top: 18%;
  left: 8%;
}

.spark--b {
  bottom: 34%;
  right: 10%;
  font-size: 1.2rem;
  color: var(--fog);
}

.hero-inner {
  position: relative;
  z-index: 3;
}

.title-num {
  display: block;
  font-size: clamp(6.5rem, 34vw, 16rem);
  line-height: 0.85;
  color: var(--light);
  text-shadow: 0.04em 0.04em 0 var(--accent-deep); /* sombra dura estilo cartaz */
}

.title-word {
  display: block;
  font-size: clamp(2rem, 10vw, 4.8rem);
  letter-spacing: 0.3em;
  margin-left: 0.1em;
  color: var(--accent);
}

.sub {
  margin-top: 1.4rem;
  font-size: clamp(1.05rem, 4vw, 1.3rem);
  color: var(--fog);
  max-width: 30ch;
}

.actions {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
}
</style>
