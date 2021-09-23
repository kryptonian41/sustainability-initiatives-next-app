import React from 'react'
import styles from './styles.module.css'
import YoutubeIcon from '../../assets/svgs/social-icons/youtube.svg'
import FacebookIcon from '../../assets/svgs/social-icons/facebook.svg'
import TwitterIcon from '../../assets/svgs/social-icons/twitter.svg'
import Instagramicon from '../../assets/svgs/social-icons/instagram.svg'
import { useThemeContext } from '../../components/ThemeProvider'

export interface SocialItem {
  icon: any,
  url: string,
  label?: string
}

interface Props {
  items?: SocialItem[],
  backgroundColor?: string,
  iconColor?: string
}

// TODO: Update the urls for all the social handles
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
        <SocialPanelIcon icon={item.icon} url={item.url} iconColor={iconColor} bgColor={bgColor} />
      )}
    </div>
  )
}

interface SocialPanelIconProps {
  icon: any,
  url?: string,
  bgColor?: string,
  iconColor?: string
}

export const SocialPanelIcon: React.FC<SocialPanelIconProps> = ({ icon: Icon, url, bgColor, iconColor }) => {

  if (!url) {
    return <span className={styles.item} style={{ backgroundColor: bgColor }}>
      <Icon style={{ fill: iconColor }} />
    </span>
  }

  return <a className={styles.item} href={url} target="_blank" style={{ backgroundColor: bgColor }}>
    <Icon style={{ fill: iconColor }} />
  </a>
}