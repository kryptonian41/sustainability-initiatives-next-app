import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useDeviceMediaQuery } from "utils/hooks/useMediaQuery";
import HeaderLogo from "../../assets/svgs/logo.svg";
import SearchIcon from "../../assets/svgs/search-icon.svg";
import { Button } from "../Button";
import { MobileSubNav } from "./MobileSubNav";
import styles from "./styles.module.css";

interface Props { }

export const Header = () => {
  const matchesLaptop = useDeviceMediaQuery("laptop");
  return (
    <div className={styles.container}>
      <Link href="/">
        <div>
          <HeaderLogo className={clsx("cursor-pointer", styles.logo)} />
        </div>
      </Link>
      {matchesLaptop ? <DesktopSubNav /> : <MobileSubNav />}
    </div>
  );
};

const DesktopSubNav = () => {
  const scrollToFooter = useCallback(() => {
    const top = (document.querySelector("#footer") as HTMLElement).offsetTop;
    window.scroll({ behavior: "smooth", top });
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles["sub-nav"]}>
        <Button type="text" className="font-medium">
          <Link href="/downloads">DOWNLOADS</Link>
        </Button>
        <Button className="ml-4 font-medium">GET IN TOUCH</Button>
        <SearchIcon />
      </div>
      <div className={styles.nav}>
        <ul>
          <DesktopNavItem label="About US" href="/about" />

          <DesktopNavItem label="Initiatives" activeHref="/initiatives">
            <ul>
              <Link href="/initiatives/advocasy-and-outreach">
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
          <DesktopNavItem href="/support" label="Support" />
          <li>Blogs</li>
          <li onClick={scrollToFooter}>Contact</li>
        </ul>
      </div>
    </div>
  );
};

interface Props {
  label?: string;
  href?: string;
  activeHref?: string;
}

const DesktopNavItem: React.FC<Props> = ({
  href,
  label,
  children,
  activeHref,
}) => {
  const { pathname } = useRouter();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (pathname.includes(href) || pathname.includes(activeHref))
      setIsActive(true);
    else setIsActive(false);
  }, [pathname, href, activeHref]);

  const content = (
    <li
      className={clsx({
        [styles.active]: isActive,
      })}
    >
      {label}
      {children}
    </li>
  );

  if (!href) {
    return content;
  }

  return <Link href={href}>{content}</Link>;
};
