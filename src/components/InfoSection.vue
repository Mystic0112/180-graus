<script setup>
import { motion } from 'motion-v'
import { EVENTO } from '../config'
import { useReveal } from '../motion/presets'

const { reveal } = useReveal()

const linhas = [
  { chave: 'Quando', valor: EVENTO.data },
  { chave: 'Onde', valor: EVENTO.local },
  { chave: 'Pra quem', valor: EVENTO.publico },
]
</script>

<template>
  <section id="info" class="section info" aria-label="Data, local e público">
    <div class="wrap">
      <motion.div v-for="(l, i) in linhas" :key="l.chave" v-bind="reveal(i)" class="linha">
        <span class="chave">{{ l.chave }}</span>
        <span class="valor">{{ l.valor }}</span>
      </motion.div>
    </div>
  </section>
</template>

<style scoped>
.linha {
  display: grid;
  gap: 0.25rem;
  padding-block: clamp(1.5rem, 5vw, 2.5rem);
  border-top: 1px solid rgba(20, 26, 18, 0.2);
}

.linha:last-child {
  border-bottom: 1px solid rgba(20, 26, 18, 0.2);
}

.chave {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--accent-deep);
}

.valor {
  font-family: var(--font-display);
  text-transform: uppercase;
  font-size: clamp(2.2rem, 10vw, 4.6rem);
  line-height: 0.95;
}
</style>
