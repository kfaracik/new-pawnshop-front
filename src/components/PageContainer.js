import React from "react";
import Header from "components/Header";
import styled from "styled-components";
import Footer from "components/Footer";
import PageLoader from "./PageLoader";
import { motion } from "framer-motion";
import { LayoutInner } from "styles/layout";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const AnimatedMainContent = styled(motion.main)`
  margin: 10px auto;
  width: 100%;
  min-height: 91vh;
`;

const MainContentInner = styled(LayoutInner)`
  min-height: inherit;
`;

export default function PageContainer({ children, loading = false }) {
  return (
    <Container>
      <a className="skip-link" href="#main-content">
        Przejdź do treści
      </a>
      <Header />
      <AnimatedMainContent
        id="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <MainContentInner>
          {loading ? <PageLoader /> : <>{children}</>}
        </MainContentInner>
      </AnimatedMainContent>
      <Footer />
    </Container>
  );
}
