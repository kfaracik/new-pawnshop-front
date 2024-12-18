import React from "react";
import Header from "components/Header";
import styled from "styled-components";
import Footer from "components/Footer";
import PageLoader from "./PageLoader";
import { motion } from "framer-motion";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const AnimatedMainContent = styled(motion.main)`
  margin: 10px 40px;
  min-height: 91vh;
`;

export default function PageContainer({ children, loading = false }) {
  return (
    <Container>
      <Header />
      <AnimatedMainContent
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {loading ? <PageLoader /> : <>{children}</>}
      </AnimatedMainContent>
      <Footer />
    </Container>
  );
}
