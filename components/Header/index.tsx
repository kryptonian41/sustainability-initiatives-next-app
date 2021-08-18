import { Button } from "../Button";
import React from "react";
import HeaderLogo from "../../assets/svgs/logo.svg";
import SearchIcon from "../../assets/svgs/search-icon.svg";
import styles from "./styles.module.css";
import Link from "next/link";

interface Props {}

export const Header = (props: Props) => {
  return (
    <div className={styles.container}>
      <HeaderLogo />
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
                <li>Subnav Item</li>
                <li>Subnav Item</li>
                <li>Subnav Item</li>
                <li>Subnav Item</li>
              </ul>
            </li>
            <li>Associates</li>
            <li>Support</li>
            <li>Blogs</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
