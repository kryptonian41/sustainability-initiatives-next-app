import { Button } from "../Button";
import React, { useEffect, useState } from "react";
import HeaderLogo from "../../assets/svgs/logo.svg";
import SearchIcon from "../../assets/svgs/search-icon.svg";
import styles from "./styles.module.css";
import Link from "next/link";
import { useMediaQuery } from "utils/hooks/useMediaQuery";
import { useThemeContext } from "components/ThemeProvider";
import { MobileSubNav } from "./MobileSubNav";
import clsx from "clsx";
import { useRouter } from 'next/router'


interface Props { }

export const Header = (props: Props) => {
  const { breakpoints } = useThemeContext()
  const { matches } = useMediaQuery(`(min-width: ${breakpoints.laptop}px)`)
  return (
    <div className={styles.container}>
      <Link href="/">
        <div>
          <HeaderLogo className={clsx("cursor-pointer", styles.logo)} />
        </div>
      </Link>
      {matches ? <DesktopSubNav /> : <MobileSubNav />}
    </div>
  );
};

const DesktopSubNav = () => {
  return (
    <div className={styles.body}>
      <div className={styles["sub-nav"]}>
        <Button type="text" className="font-medium">
          DOWNLOADS
        </Button>
        <Button className="ml-4 font-medium">GET IN TOUCH</Button>
        <SearchIcon />
      </div>
      <div className={styles.nav}>
        <ul>
          <DesktopNavItem label="About US" href="/about" />

          <DesktopNavItem label="Initiatives" activeHref="/initiatives">
            <ul>
              <Link href="/initiatives/advocacy-and-outreach">
                <li>Advocacy and Outreach</li>
              </Link>
              <Link href="/initiatives/capacity-building">
                <li>Capacity Building</li>
              </Link>
              <Link href="/initiatives/research-and-publication">
                <li>Research and Publication</li>
              </Link>
              <Link href="/initiatives/other-activities">
                <li>Other Activities</li>
              </Link>
            </ul>
          </DesktopNavItem>
          <DesktopNavItem href="/associates" label="Associates" />
          <li>Support</li>
          <li>Blogs</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
  );
}

interface Props {
  label?: string,
  href?: string,
  activeHref?: string
}

const DesktopNavItem: React.FC<Props> = ({ href, label, children, activeHref }) => {
  const { pathname } = useRouter()
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (pathname.includes(href) || pathname.includes(activeHref)) setIsActive(true)
    else setIsActive(false)
  }, [pathname, href, activeHref])

  const content = <li className={clsx({
    [styles.active]: isActive
  })}>
    {label}
    {children}
  </li>

  if (!href) {
    return content
  }

  return <Link href={href}>
    {content}
  </Link>
}
