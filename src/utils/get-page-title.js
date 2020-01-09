import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Superb口红定制平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
