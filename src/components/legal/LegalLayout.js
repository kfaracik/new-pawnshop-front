import React from "react";
import styled from "styled-components";
import PageContainer from "components/PageContainer";
import colors from "styles/colors";

const Wrapper = styled.section`
  margin: 24px 0 40px;
`;

const Card = styled.article`
  background: ${colors.backgroundPaper};
  border: 1px solid #e8e8e8;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
`;

const Title = styled.h1`
  margin: 0 0 10px;
  font-size: clamp(1.35rem, 2.5vw, 1.9rem);
  color: ${colors.textPrimary};
`;

const Updated = styled.p`
  margin: 0 0 16px;
  font-size: 0.85rem;
  color: ${colors.textSecondary};
`;

const Content = styled.div`
  display: grid;
  gap: 14px;

  h2 {
    margin: 0;
    font-size: 1.03rem;
    color: ${colors.textPrimary};
  }

  p {
    margin: 6px 0 0;
    color: ${colors.textSecondary};
    line-height: 1.55;
    font-size: 0.95rem;
  }
`;

export default function LegalLayout({ title, updatedAt, children }) {
  return (
    <PageContainer>
      <Wrapper>
        <Card>
          <Title>{title}</Title>
          <Updated>Ostatnia aktualizacja: {updatedAt}</Updated>
          <Content>{children}</Content>
        </Card>
      </Wrapper>
    </PageContainer>
  );
}
