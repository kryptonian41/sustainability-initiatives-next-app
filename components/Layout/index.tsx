import { Container } from "components/Container";
import Footer from "components/Footer";
import { Header } from "components/Header";
import React from "react";
import styles from "./styles.module.css";

interface Props {
  children: React.ReactNode;
}

export const BaseLayout = ({ children }: Props) => {
  return <div className="relative z-0">
    <Container className="z-50 relative">
      <Header />
    </Container>
    <div>

      {children}
    </div>
    <Footer />
  </div>
};

