<script setup>
import { motion } from 'motion-v'
import PhotoSlot from './PhotoSlot.vue'
import { useReveal } from '../motion/presets'
import fotoAdoracao from '../assets/fotos/adoracao.webp'
import fotoLouvor from '../assets/fotos/louvor.webp'
import fotoAnimacao from '../assets/fotos/animacao.webp'
import fotoPregacao from '../assets/fotos/pregacao.webp'
import fotoOracao from '../assets/fotos/oracao.webp'
import fotoAmizades from '../assets/fotos/amizades.webp'

const { reduce, reveal } = useReveal()

// Cards: entrada com scale + stagger, lift no hover, aperto no toque.
// hover/press carregam a própria transition pra não herdar o delay de entrada.
const cardMotion = (i) =>
  reduce.value
    ? {}
    : {
        initial: { opacity: 0, y: 32, scale: 0.94 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        inViewOptions: { once: true, amount: 0.25 },
        whileHover: {
          y: -6,
          scale: 1.02,
          transition: { type: 'spring', stiffness: 260, damping: 24 },
        },
        whilePress: {
          scale: 0.98,
          transition: { type: 'spring', stiffness: 260, damping: 24 },
        },
        transition: { type: 'spring', stiffness: 110, damping: 20, delay: (i % 3) * 0.1 },
      }

const vivencias = [
  {
    titulo: 'Adoração',
    frase: 'Frente a frente com Jesus no Santíssimo. O momento mais forte dos dois dias.',
    ratio: '3 / 4',
    src: fotoAdoracao,
    alt: 'Jovens reunidos ao redor do Santíssimo Sacramento durante a adoração',
  },
  {
    titulo: 'Louvor',
    frase: 'Música ao vivo, voz no alto e todo mundo cantando junto.',
    ratio: '1 / 1',
    src: fotoLouvor,
    alt: 'Celebração no palco do seminário com luzes coloridas',
  },
  {
    titulo: 'Pregação',
    frase: 'Uma palavra que fala da sua vida. Direta, sem enrolação.',
    ratio: '1 / 1',
    src: fotoPregacao,
    alt: 'Padre ministrando a bênção a um jovem',
  },
  {
    titulo: 'Oração',
    frase: 'Um tempo de intimidade, só entre você e Deus.',
    ratio: '3 / 4',
    src: fotoOracao,
    alt: 'Jovens rezando uns pelos outros',
  },
  {
    titulo: 'Animação',
    frase: 'Dinâmicas, gincana e muita energia. Ninguém fica parado.',
    ratio: '1 / 1',
    src: fotoAnimacao,
    alt: 'Jovens de mãos erguidas celebrando ao ar livre',
  },
  {
    titulo: 'Novas amizades',
    frase: 'Você chega sem conhecer ninguém e sai com gente pra vida toda.',
    ratio: '1 / 1',
    src: fotoAmizades,
    alt: 'Três amigas sorrindo juntas durante o evento',
  },
]
</script>

<template>
  <section id="experiencia" class="section experiencia" aria-labelledby="exp-titulo">
    <div class="xadrez" aria-hidden="true"></div>
    <div class="wrap">
      <motion.h2 v-bind="reveal(0)" id="exp-titulo" class="titulo">
        O que você<br />vai viver
      </motion.h2>

      <div class="grade">
        <motion.div
          v-for="(v, i) in vivencias"
          :key="v.titulo"
          v-bind="cardMotion(i)"
          class="celula"
        >
          <PhotoSlot
            :titulo="v.titulo"
            :frase="v.frase"
            :ratio="v.ratio"
            :variant="i"
            :src="v.src"
            :alt="v.alt"
            :delay="(i % 3) * 0.1"
          />
        </motion.div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.experiencia {
  position: relative;
  background: var(--light-2);
  overflow: clip;
  padding-top: clamp(5.5rem, 16vw, 9rem);
}

/* Motif: faixa xadrez verde-e-creme dos cartazes, levemente inclinada */
.xadrez {
  position: absolute;
  top: 0;
  left: -4%;
  width: 108%;
  height: 30px;
  background: repeating-conic-gradient(var(--accent) 0% 25%, var(--light) 0% 50%);
  background-size: 30px 30px;
  rotate: -1.4deg;
  transform-origin: center;
}

.titulo {
  margin-bottom: clamp(2rem, 8vw, 3.5rem);
}

.grade {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  align-items: start;
}

/* Ritmo assimétrico: colunas defasadas */
.celula:nth-child(even) {
  margin-top: 2.25rem;
}

@media (min-width: 820px) {
  .grade {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .celula:nth-child(even) {
    margin-top: 0;
  }

  .celula:nth-child(3n + 2) {
    margin-top: 3rem;
  }
}
</style>
