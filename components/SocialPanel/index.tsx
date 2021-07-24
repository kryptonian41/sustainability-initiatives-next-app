import React from 'react'
import styles from './styles.module.css'
import YoutubeIcon from '../../assets/svgs/social-icons/youtube.svg'
import FacebookIcon from '../../assets/svgs/social-icons/facebook.svg'
import TwitterIcon from '../../assets/svgs/social-icons/twitter.svg'
import Instagramicon from '../../assets/svgs/social-icons/instagram.svg'
import { useThemeContext } from '../../components/ThemeProvider'

export interface SocialItem {
  icon: SvgrComponent,
  url: string,
  label?: string
}

interface Props {
  items: SocialItem[],
  backgroundColor: string,
  iconColor: string
}

export const defaultItems: SocialItem[] = [
  {
    icon: TwitterIcon,
    url: ''
  },
  {
    icon: YoutubeIcon,
    url: ''
  },
  {
    icon: FacebookIcon,
    url: ''
  },
  {
    icon: Instagramicon,
    url: ''
  },
]

export const SocialPanel: React.FC<Props> = ({ items = defaultItems, iconColor = '#000', backgroundColor }) => {
  const { colors } = useThemeContext()
  const bgColor = backgroundColor || colors.primary
  return (
    <div className={styles.container}>
      {items && items.map(item =>
        <a className={styles.item} href={item.url} target="_blank" style={{ backgroundColor: bgColor }} key={item.url}>
          <item.icon style={{ fill: iconColor }} />
        </a>
      )}
    </div>
  )
}
