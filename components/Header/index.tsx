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
  const { matches } = useMediaQuery(`(min-width: ${breakpoints.tablet}px)`)
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
  return <div className={styles.body}>
    <div className={styles["sub-nav"]}>
      <Button type="text" className="font-semibold">
        DOWNLOADS
      </Button>
      <Button className="ml-4">GET IN TOUCH</Button>
      <SearchIcon />
    </div>
    <div className={styles.nav}>
      <ul>
        <DesktopNavItem label="About US" href="/about" />

        <DesktopNavItem label="Initiatives" activeHref="/initiatives">
          <ul>
            <Link href="/initiatives/advocasy"><li>Advocasy</li></Link>
            <Link href="/initiatives/awareness"><li>Awareness</li></Link>
            <Link href="/initiatives/research"><li>Research</li></Link>
          </ul>
        </DesktopNavItem>
        <DesktopNavItem href="/associates" label="Associates" />
        <li>Support</li>
        <li>Blogs</li>
        <li>Contact</li>
      </ul>
    </div>
  </div>;
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
