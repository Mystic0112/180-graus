<script setup>
import { motion } from 'motion-v'
import CtaButton from './CtaButton.vue'
import { WHATSAPP_URL } from '../config'
import { useReveal } from '../motion/presets'

const { reveal } = useReveal()
</script>

<template>
  <section class="section" aria-labelledby="cta-titulo">
    <div class="wrap">
      <!-- Bloco verde de cantos arredondados, como o bloco de info dos cartazes -->
      <div class="bloco">
        <span class="spark" aria-hidden="true">✦</span>
        <motion.h2 v-bind="reveal(0)" id="cta-titulo" class="titulo">
          Pronto pra<br />virar a chave?
        </motion.h2>
        <motion.p v-bind="reveal(1)" class="texto">
          A inscrição é rápida e feita direto no WhatsApp.
        </motion.p>
        <motion.div v-bind="reveal(2)" class="acao">
          <CtaButton :href="WHATSAPP_URL" variant="dark">Quero participar</CtaButton>
        </motion.div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bloco {
  position: relative;
  background: var(--accent-deep);
  color: var(--on-accent);
  border-radius: 28px;
  padding: clamp(2.5rem, 9vw, 4.5rem) clamp(1.5rem, 6vw, 3.5rem);
  overflow: clip;
}

.spark {
  position: absolute;
  top: 1.4rem;
  right: 1.6rem;
  font-size: 1.6rem;
  color: var(--on-accent);
  user-select: none;
  pointer-events: none;
}

.titulo {
  font-size: clamp(2.2rem, 9.5vw, 5.5rem);
  color: var(--on-accent);
  text-shadow: 0.045em 0.045em 0 var(--ink);
}

.texto {
  margin-top: 1.25rem;
  font-size: 1.15rem;
  font-weight: 700;
}

.acao {
  margin-top: 2rem;
}
</style>
