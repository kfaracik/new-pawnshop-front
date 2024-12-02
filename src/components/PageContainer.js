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
  width: 100%;
`;

const MainContent = styled.main`
  width: 100%;
  padding-bottom: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 85vh;
  background-color: #f8f9fa;
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
