import { Container } from "components/Container";
import Footer from "components/Footer";
import { Header } from "components/Header";
import React from "react";
import styles from "./styles.module.css";

interface Props {
  children: React.ReactNode;
}

export const BaseLayout = ({ children }: Props) => {
  return <div>
    <Container>
      <Header />
    </Container>
    {children}
    <Footer />
  </div>
};

