import { Container } from "components/Container";
import Footer from "components/Footer";
// import { GoToTopButton } from "components/GoToTopButton";
import { Header } from "components/Header";
import React from "react";

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
    {/* <GoToTopButton /> */}
    <Footer />
  </div>
};

