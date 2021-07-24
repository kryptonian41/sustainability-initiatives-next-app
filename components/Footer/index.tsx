import Layout from "../Layout";
import React from "react";
import { Button } from "../Button";
import Map from "./Map";
import Logo from "../../assets/svgs/footer-logo.svg";
import Twitter from "../../assets/svgs/footer-twitter.svg";
import YT from "../../assets/svgs/footer-yt.svg";
import FB from "../../assets/svgs/footer-fb.svg";
import Insta from "../../assets/svgs/footer-insta.svg";
import styles from "./styles.module.css";

const Footer = () => {
  return (
    <div className={styles.bg}>
      <img src="static/media/assets/images/footer.png" />
      <div className={styles.container}>
        <Layout>
          <div className={styles.content}>
            <div className={styles.contentOne}>
              <Logo />
              <div>
                <p>Home</p>
                <p>About Us</p>
                <p>Associates</p>
                <p>Initiatives</p>
                <p>Downloads</p>
                <p>Support</p>
                <p>Blog</p>
                <div className={styles.socialLinks}>
                  <Twitter />
                  <YT />
                  <FB />
                  <Insta />
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
        </Layout>
      </div>
    </div>
  );
};

export default Footer;
