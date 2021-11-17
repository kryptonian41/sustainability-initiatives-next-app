import React from "react";
import { Button } from "../Button";
import Map from "./Map";
import Logo from "../../assets/svgs/footer-logo.svg";
import Twitter from "../../assets/svgs/footer-twitter.svg";
import YT from "../../assets/svgs/footer-yt.svg";
import FB from "../../assets/svgs/footer-fb.svg";
import Insta from "../../assets/svgs/footer-insta.svg";
import LinkedIn from "../../assets/svgs/footer-linkedin.svg";
import styles from "./styles.module.css";
import { Container } from "../Container";
import Link from "next/link";
import FooterBg from "assets/images/footer.png";

const Footer = () => {
  return (
    <div className={styles.root} id="footer">
      <img src={FooterBg.src} className={styles.bgImage} />
      <div className={styles.container}>
        <Container>
          <div className={styles.content}>
            <div className={styles.contentOne}>
              <Logo />
              <div>
                <p>
                  <Link href="/">Home</Link>
                </p>
                <p>
                  <Link href="/about">About Us</Link>
                </p>
                <p>
                  <Link href="/associates">Associates</Link>
                </p>
                {/* <p>Initiatives</p> */}
                <p>
                  <Link href="/downloads">Downloads</Link>
                </p>
                <p>
                  <Link href="/support">Support</Link>
                </p>
                <p>Blog</p>
                <div className={styles.socialLinks}>
                  <a
                    href="https://www.linkedin.com/company/sustainability-initiatives-pune/"
                    target="_blank"
                  >
                    <LinkedIn />
                  </a>
                  <a
                    href="https://www.facebook.com/sustainability.initiatives"
                    target="_blank"
                  >
                    <FB />
                  </a>
                  <a
                    href="https://www.instagram.com/sustainabilityinitiatives/"
                    target="_blank"
                  >
                    <Insta />
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.contentTwo}>
              <div className={styles.newsletter}>
                <div className={styles.heading}>
                  <h4>Subscribe To Our Newsletter</h4>
                  <p>Get Latest Insights and Updates</p>
                </div>
                <div className={styles.form}>
                  <input type="email" placeholder="Email"></input>
                  <Button>Subscribe</Button>
                </div>
              </div>
              <div className={styles.address}>
                <div>
                  <p style={{ fontWeight: "bolder" }}>Tel: 020-6626 8888</p>
                  <p>mail@sustainability-initiatives.org</p>
                  <p>
                    Correspondence address:
                    <br />
                    73/2 Bhakti Marg, Off Law
                    <br />
                    College Road, Pune 411 004,
                    <br />
                    Maharashtra, India
                  </p>
                </div>
                <div>
                  <Map />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.copyright}>
            <p>© Copyright 2020-21</p>
            <p>All rights reserved</p>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
