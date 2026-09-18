<script setup>
import { INSTAGRAM_URL, EVENTO } from '../config'
</script>

<template>
  <footer class="rodape">
    <div class="wrap conteudo">
      <p class="marca">180 GRAUS</p>
      <p class="desc">Seminário de Vida no Espírito Santo. {{ EVENTO.data }}, no {{ EVENTO.local }}.</p>
      <nav class="links" aria-label="Links do rodapé">
        <a :href="INSTAGRAM_URL" target="_blank" rel="noopener">Instagram</a>
        <a href="#conteudo">Voltar ao topo</a>
      </nav>
      <div class="creditos">
        <p>© 2026 180 GRAUS. Todos os direitos reservados.</p>
        <p>
          Desenvolvido por
          <a
            href="https://www.instagram.com/helio.vlm?stkn=MXRmd3JobmxjcHhiMQ=="
            target="_blank"
            rel="noopener"
          >Helio Vinicius</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.rodape {
  padding: 3rem 0 7rem; /* respiro extra pro CTA fixo não cobrir os links */
  border-top: 1px solid rgba(20, 26, 18, 0.14);
}

.conteudo {
  display: grid;
  gap: 0.5rem;
}

.marca {
  font-family: var(--font-display);
  font-size: 1.3rem;
  text-transform: uppercase;
}

.desc {
  color: var(--ink-soft);
  font-size: 0.95rem;
}

.links {
  margin-top: 1rem;
  display: flex;
  gap: 1.5rem;
}

.links a {
  font-weight: 700;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
}

.creditos {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(20, 26, 18, 0.1);
  display: grid;
  gap: 0.25rem;
  color: var(--ink-soft);
  font-size: 0.85rem;
}

.creditos a {
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>
