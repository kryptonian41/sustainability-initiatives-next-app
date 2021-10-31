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
    <div className="z-50 sticky top-0 bg-white">
      <Container className="relativeA">
        <Header />
      </Container>
    </div>
    <div>
      {children}
    </div>
    {/* <GoToTopButton /> */}
    <Footer />
  </div>
};

