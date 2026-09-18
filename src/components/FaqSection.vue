<script setup>
import { motion } from 'motion-v'
import { EVENTO } from '../config'
import { useReveal } from '../motion/presets'

const { reveal } = useReveal()

const perguntas = [
  {
    p: 'Preciso ser católico ou conhecer o grupo?',
    r: 'Não. O 180 GRAUS foi pensado também pra quem está chegando agora. Todo mundo é bem-vindo.',
  },
  {
    p: 'Onde e quando vai ser?',
    r: `${EVENTO.data}, no ${EVENTO.local}.`,
  },
  {
    p: 'Quem pode participar?',
    r: 'Qualquer jovem a partir de 14 anos.',
  },
  {
    p: 'Como faço minha inscrição?',
    r: 'Pelo WhatsApp. Toca no botão "Quero participar" que a gente te passa tudo, incluindo valores.',
  },
]
</script>

<template>
  <section id="faq" class="section" aria-labelledby="faq-titulo">
    <div class="wrap">
      <motion.h2 v-bind="reveal(0)" id="faq-titulo">Ficou com dúvida?</motion.h2>
      <div class="lista">
        <motion.div v-for="(item, i) in perguntas" :key="item.p" v-bind="reveal(i + 1)">
          <details class="item">
            <summary>{{ item.p }}</summary>
            <p>{{ item.r }}</p>
          </details>
        </motion.div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.lista {
  margin-top: 2rem;
  display: grid;
  gap: 0.75rem;
  max-width: 680px;
}

.item {
  background: var(--light-2);
  border-radius: 20px;
  padding: 0.25rem 1.25rem;
}

summary {
  cursor: pointer;
  font-weight: 700;
  font-size: 1.05rem;
  padding: 1rem 0;
  min-height: 44px;
  display: flex;
  align-items: center;
  list-style-position: inside;
}

.item p {
  padding: 0 0 1.1rem;
  color: var(--ink-soft);
}
</style>
