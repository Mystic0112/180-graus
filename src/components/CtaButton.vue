<script setup>
import { motion } from 'motion-v'
import { SPRING_TAP } from '../motion/presets'

defineProps({
  href: { type: String, required: true },
  variant: { type: String, default: 'accent' }, // accent | ghost | dark
})
</script>

<template>
  <motion.a
    class="cta"
    :class="`cta--${variant}`"
    :href="href"
    target="_blank"
    rel="noopener"
    :while-hover="{ scale: 1.03 }"
    :while-press="{ scale: 0.97 }"
    :transition="SPRING_TAP"
  >
    <slot />
  </motion.a>
</template>
