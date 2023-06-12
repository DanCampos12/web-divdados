export function getTemplate (isMobile: boolean) {
  return isMobile ? 'TemplateMobile' : 'TemplateDesktop'
}

export function normalizeText (text = '') {
  return text.normalize('NFD').replace(/[^a-zA-Z_ çs01-9]/g, '').toUpperCase()
}
