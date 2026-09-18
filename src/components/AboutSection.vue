<script setup>
import { motion } from 'motion-v'
import { useReveal } from '../motion/presets'

const { reveal } = useReveal()
</script>

<template>
  <section id="sobre" class="section" aria-labelledby="sobre-titulo">
    <div class="wrap">
      <motion.h2 v-bind="reveal(0)" id="sobre-titulo">O que é o 180 GRAUS?</motion.h2>
      <motion.p v-bind="reveal(1)" class="texto">
        Um Seminário de Vida no Espírito Santo feito pra jovens: dois dias de louvor, pregação
        e experiências reais com Deus, num ambiente pensado pra quem está chegando agora.
      </motion.p>
      <motion.p v-bind="reveal(2)" class="texto destaque">
        Você não precisa conhecer nada antes. Só aparecer.
      </motion.p>
    </div>
  </section>
</template>

<style scoped>
.texto {
  margin-top: 1.5rem;
  font-size: clamp(1.1rem, 4vw, 1.35rem);
  max-width: 46ch;
  color: var(--ink-soft);
}

.destaque {
  color: var(--ink);
  font-weight: 700;
}
</style>
