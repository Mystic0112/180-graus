# Pendências do cliente · 180 GRAUS

Atualizado: links, imagem OG e 4 das 6 fotos já entraram. Falta o que está abaixo.

## 1. Fotos que faltam (2 slots na seção "O que você vai viver")
- **Louvor** (banda/música, todo mundo junto)
- **Animação** (brincadeira/energia)
- **Onde entram:** salvar em `src/assets/fotos/` (ex: `louvor.webp`, `animacao.webp`),
  importar em `src/components/ExperienceSection.vue` e adicionar `src` + `alt` nos dois
  itens marcados com `TODO` no array `vivencias`.
- **Formato ideal:** WebP ou JPG, ~1200px no lado maior, proporção livre (o slot corta em
  1:1). O tratamento P&B é automático.

## 2. Vídeo de fundo do hero (loop, sem som)
- **Onde entra:** salvar o arquivo em `public/video/hero.mp4` e apontar em `src/config.js`,
  constante `HERO_VIDEO_URL` (1 linha: `'video/hero.mp4'`).
- **Formato ideal:** MP4 H.264, **até ~10 MB** (comprimir bem: é fundo ambiente, pode perder
  qualidade sem dó). Pode ser vertical 9:16 gravado no celular.
- Enquanto não chega, o hero usa o fundo verde estático (que também segue como fallback).

## 3. Valor da inscrição (opcional)
- Hoje o FAQ responde "a gente te passa tudo pelo WhatsApp". Se quiserem exibir o valor,
  editar `src/components/FaqSection.vue`.

## Resolvido
- Link do WhatsApp: `https://w.app/180graus` (`src/config.js`)
- Link do Instagram: `https://www.instagram.com/p/Dc56mJNR-ln/` (`src/config.js`)
- Fotos de Adoração, Pregação, Oração e Novas amizades
- Imagem OG (`public/og.jpg`) e URLs absolutas de produção nas tags
  (`https://mystic0112.github.io/180-graus/`)
