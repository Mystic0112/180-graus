<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { motion, AnimatePresence, useScroll } from 'motion-v'
import { WHATSAPP_URL, INSTAGRAM_URL } from '../config'
import { useReveal, SPRING_SETTLE } from '../motion/presets'

const links = [
  { label: 'O que é', href: '#sobre' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Info', href: '#info' },
  { label: 'FAQ', href: '#faq' },
]

const { reduce } = useReveal()
const aberto = ref(false)
const rolado = ref(false)
const zonaClara = ref(false)

// Tema do header acompanha a virada escuro -> claro da página
const { scrollY } = useScroll()
let limiteClaro = Infinity

function medir() {
  const virada = document.getElementById('virada')
  if (virada) limiteClaro = virada.offsetTop + virada.offsetHeight * 0.55
}

function atualizar(y) {
  rolado.value = y > 24
  zonaClara.value = y > limiteClaro
}

function fechar() {
  aberto.value = false
  document.body.style.overflow = ''
}

function alternarMenu() {
  aberto.value = !aberto.value
  document.body.style.overflow = aberto.value ? 'hidden' : ''
}

function onTecla(e) {
  if (e.key === 'Escape') fechar()
}

let pararScroll
onMounted(() => {
  medir()
  atualizar(scrollY.get())
  pararScroll = scrollY.on('change', atualizar)
  window.addEventListener('resize', medir, { passive: true })
  window.addEventListener('keydown', onTecla)
})

onUnmounted(() => {
  pararScroll?.()
  window.removeEventListener('resize', medir)
  window.removeEventListener('keydown', onTecla)
})

const entradaLink = (i) =>
  reduce.value
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        animate: { opacity: 1, y: 0 },
        transition: { ...SPRING_SETTLE, delay: 0.06 + i * 0.08 },
      }
</script>

<template>
  <header class="hdr" :class="{ 'hdr--rolado': rolado, 'hdr--claro': zonaClara && !aberto }">
    <a class="brand" href="#conteudo" @click="fechar">180 GRAUS</a>

    <nav class="links-desktop" aria-label="Seções da página">
      <a v-for="l in links" :key="l.href" :href="l.href">{{ l.label }}</a>
    </nav>

    <div class="acoes">
      <a class="hdr-cta" :href="WHATSAPP_URL" target="_blank" rel="noopener">Quero participar</a>
      <button
        class="menu-btn"
        type="button"
        :aria-expanded="aberto"
        aria-controls="menu-mobile"
        @click="alternarMenu"
      >
        {{ aberto ? 'Fechar' : 'Menu' }}
      </button>
    </div>
  </header>

  <AnimatePresence>
    <motion.nav
      v-if="aberto"
      id="menu-mobile"
      class="menu"
      aria-label="Menu de seções"
      :initial="reduce ? false : { opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="reduce ? undefined : { opacity: 0 }"
      :transition="{ duration: 0.35, ease: 'easeOut' }"
    >
      <motion.a
        v-for="(l, i) in links"
        :key="l.href"
        v-bind="entradaLink(i)"
        class="menu-link"
        :href="l.href"
        @click="fechar"
      >
        {{ l.label }}
      </motion.a>
      <motion.div v-bind="entradaLink(links.length)" class="menu-social">
        <a :href="INSTAGRAM_URL" target="_blank" rel="noopener">Instagram</a>
        <a :href="WHATSAPP_URL" target="_blank" rel="noopener">WhatsApp</a>
      </motion.div>
    </motion.nav>
  </AnimatePresence>
</template>

<style scoped>
.hdr {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 35;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  min-height: 64px;
  padding: 0.5rem 1rem;
  color: var(--light);
  transition: background-color 0.45s ease, color 0.45s ease;
}

.hdr--rolado {
  background: rgba(10, 31, 18, 0.6);
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
}

.hdr--claro {
  background: rgba(245, 240, 223, 0.8);
  color: var(--ink);
}

.brand {
  font-family: var(--font-display);
  font-size: 1.05rem;
  letter-spacing: 0.06em;
  text-decoration: none;
  color: inherit;
  padding: 0.55rem 0;
  white-space: nowrap;
}

.links-desktop {
  display: none;
}

.acoes {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.hdr-cta {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  background: var(--accent-deep);
  color: var(--on-accent);
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  white-space: nowrap;
}

.menu-btn {
  min-height: 44px;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: 1.5px solid currentColor;
  background: transparent;
  color: inherit;
  font: 700 0.9rem var(--font-body);
  cursor: pointer;
}

.menu {
  position: fixed;
  inset: 0;
  z-index: 30;
  background: var(--dark);
  color: var(--light);
  padding: 6.5rem 1.5rem 2rem;
  display: grid;
  align-content: start;
  gap: 0.4rem;
  overflow-y: auto;
}

.menu-link {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 11vw, 3.2rem);
  text-transform: uppercase;
  text-decoration: none;
  color: inherit;
  padding-block: 0.3rem;
}

.menu-link:hover {
  color: var(--accent);
}

.menu-social {
  margin-top: 1.75rem;
  display: flex;
  gap: 1.75rem;
}

.menu-social a {
  font-weight: 700;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
}

@media (min-width: 900px) {
  .hdr {
    padding-inline: 1.5rem;
  }

  .links-desktop {
    display: flex;
    gap: 1.75rem;
  }

  .links-desktop a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    font-weight: 700;
    font-size: 0.95rem;
    text-decoration: none;
    color: inherit;
    opacity: 0.82;
  }

  .links-desktop a:hover {
    opacity: 1;
  }

  .menu-btn {
    display: none;
  }
}
</style>
