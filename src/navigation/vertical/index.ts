// ** Type import
import { VerticalNavItemsType } from '@/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/dashboard',
      icon: 'mdi:home-outline',
    },
    {
      title: 'Youtube Scrapper',
      path: '/youtube-scrapper',
      icon: 'mdi:email-outline',
    }
  ]
}

export default navigation
