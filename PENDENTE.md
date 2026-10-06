# Pendências do cliente · 180 GRAUS

Tudo essencial já entrou. Sobra só o opcional abaixo.

## 1. Valor da inscrição (opcional)
- A inscrição é pelo Google Forms e o FAQ não mostra valor. Se quiserem exibir,
  editar `src/components/FaqSection.vue`.

## Resolvido
- Inscrição: Google Forms em todos os "Quero participar" (`INSCRICAO_URL` em `src/config.js`)
- WhatsApp: `https://wa.me/qr/5T2HYV3V23X6N1` (menu mobile e rodapé)
- Instagram: `https://www.instagram.com/p/Dc56mJNR-ln/`
- As 6 fotos de "O que você vai viver" (`src/assets/fotos/`)
- Imagem OG (`public/og.jpg`) e URLs absolutas de produção nas tags
  (`https://mystic0112.github.io/180-graus/`)
- Vídeo: o fundo do hero foi descartado; o convite do organizador virou a seção
  "Posso provar." logo depois da virada (`src/components/VideoSection.vue`), com prévia
  de 17s (toca com som quando o navegador deixa) e player do vídeo completo com som. Arquivos em `public/video/`
  (URLs em `src/config.js`, constante `VIDEO`)
