import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Footer from "@/components/Footer";
import PageLoader from "./PageLoader";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MainContent = styled.main`
  flex-grow: 1;
  width: 100%;
  padding-bottom: 80px;
`;

const FooterWrapper = styled.footer`
  position: relative;
  text-align: center;
  width: 100%;
`;

export default function PageContainer({ children, loading }) {
  return (
    <Container>
      <Header />
      <MainContent>
        {loading ? <PageLoader /> : <Center>{children}</Center>}
      </MainContent>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </Container>
  );
}
