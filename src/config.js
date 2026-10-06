// Links de conversão. Trocar aqui reflete no site inteiro.
export const INSCRICAO_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeqdnAY3EqqTS7C-xbAWFHWhFllaJCaSPyUwm50JOPRVeNsCA/viewform'
export const WHATSAPP_URL = 'https://wa.me/qr/5T2HYV3V23X6N1'
export const INSTAGRAM_URL = 'https://www.instagram.com/p/Dc56mJNR-ln/'

// Convite em vídeo do organizador (arquivos em public/video/)
const videoBase = `${import.meta.env.BASE_URL}video/`
export const VIDEO = {
  teaser: `${videoBase}teaser.mp4`, // primeiros 17s, com áudio, toca uma vez
  poster: `${videoBase}poster.jpg`, // frame do logo SHALOM
  completo: `${videoBase}convite-completo.mp4`, // com áudio
  duracao: '1min43', // do vídeo completo, exibida no botão
}

// Dados do evento
export const EVENTO = {
  nome: '180 GRAUS',
  slogan: 'A virada de chave que você está buscando, está em Deus',
  data: '17 e 18 de outubro',
  local: 'Colégio CEV',
  publico: 'A partir de 14 anos',
}
