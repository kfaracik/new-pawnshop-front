import React from "react";
import Header from "components/Header";
import styled from "styled-components";
import Center from "components/Center";
import Footer from "components/Footer";
import PageLoader from "./PageLoader";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  margin: 10px 40px;
  min-height: 91vh;
`;

export default function PageContainer({ children, loading = false }) {
  return (
    <Container>
      <Header />
      <MainContent>
        {loading ? <PageLoader /> : <Center>{children}</Center>}
      </MainContent>
      <Footer />
    </Container>
  );
}
