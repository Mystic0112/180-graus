<script setup>
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import TurnSection from './components/TurnSection.vue'
import AboutSection from './components/AboutSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import InfoSection from './components/InfoSection.vue'
import FaqSection from './components/FaqSection.vue'
import FinalCta from './components/FinalCta.vue'
import SiteFooter from './components/SiteFooter.vue'
import StickyWhatsApp from './components/StickyWhatsApp.vue'
</script>

<template>
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <SiteHeader />
  <main id="conteudo">
    <HeroSection />
    <TurnSection />
    <div class="light-zone">
      <AboutSection />
      <ExperienceSection />
      <InfoSection />
      <FaqSection />
      <FinalCta />
      <SiteFooter />
    </div>
  </main>
  <StickyWhatsApp />
</template>
