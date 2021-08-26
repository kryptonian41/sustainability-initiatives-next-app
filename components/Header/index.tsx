import { Button } from "../Button";
import React from "react";
import HeaderLogo from "../../assets/svgs/logo.svg";
import SearchIcon from "../../assets/svgs/search-icon.svg";
import styles from "./styles.module.css";
import Link from "next/link";

interface Props { }

export const Header = (props: Props) => {
  return (
    <div className={styles.container}>
      <Link href="/">
        <div>
          <HeaderLogo className="cursor-pointer" />
        </div>
      </Link>
      <div className={styles.body}>
        <div className={styles["sub-nav"]}>
          <Button type="text" className="font-semibold">
            DOWNLOADS
          </Button>
          <Button className="ml-4">GET IN TOUCH</Button>
          <SearchIcon />
        </div>
        <div className={styles.nav}>
          <ul>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              Initiatives
              <ul>
                <Link href="/initiatives/1"><li>Advocasy</li></Link>
                <Link href="/initiatives/2"><li>Research</li></Link>
                <Link href="/initiatives/3"><li>Awareness</li></Link>
              </ul>
            </li>
            <Link href="/associates"><li>Associates</li></Link>
            <li>Support</li>
            <li>Blogs</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
