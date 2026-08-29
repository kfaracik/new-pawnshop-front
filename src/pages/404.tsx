import Link from "next/link";
import styled from "styled-components";
import PageContainer from "components/PageContainer";
import SeoHead from "components/SeoHead";
import { buttonBaseStyle, buttonPrimaryStyle, buttonSecondaryStyle } from "components/Button";
import colors from "styles/colors";

const Wrap = styled.section`
  min-height: 56vh;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 14px;
  text-align: center;
  padding: 48px 20px;
`;

const Code = styled.span`
  font-size: clamp(3.5rem, 12vw, 6rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
  color: ${colors.primaryDark};
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(1.4rem, 4vw, 1.9rem);
  color: ${colors.textPrimary};
`;

const Lead = styled.p`
  margin: 0;
  max-width: 46ch;
  color: ${colors.textSecondary};
  line-height: 1.5;
`;

const Actions = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;

const PrimaryLink = styled(Link)`
  ${buttonBaseStyle}
  ${buttonPrimaryStyle}
  min-width: 200px;
  justify-content: center;
  text-decoration: none;
`;

const SecondaryLink = styled(Link)`
  ${buttonBaseStyle}
  ${buttonSecondaryStyle}
  min-width: 200px;
  justify-content: center;
  text-decoration: none;
`;

export default function NotFoundPage() {
  return (
    <PageContainer>
      <SeoHead
        title="Nie znaleziono strony (404) | Nowy Lombard"
        description="Ta strona nie istnieje lub została przeniesiona."
        path="/404"
        noindex
      />
      <Wrap>
        <Code>404</Code>
        <Title>Nie znaleźliśmy tej strony</Title>
        <Lead>
          Strona mogła zostać przeniesiona lub usunięta. Wróć na stronę główną
          albo przejrzyj dostępne produkty.
        </Lead>
        <Actions>
          <PrimaryLink href="/products">Przeglądaj produkty</PrimaryLink>
          <SecondaryLink href="/">Strona główna</SecondaryLink>
        </Actions>
      </Wrap>
    </PageContainer>
  );
}
