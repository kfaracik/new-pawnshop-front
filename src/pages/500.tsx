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

export default function ServerErrorPage() {
  return (
    <PageContainer>
      <SeoHead
        title="Błąd serwera (500) | Nowy Lombard"
        description="Wystąpił nieoczekiwany błąd po stronie serwera."
        path="/500"
        noindex
      />
      <Wrap>
        <Code>500</Code>
        <Title>Coś poszło nie tak</Title>
        <Lead>
          Wystąpił nieoczekiwany błąd po naszej stronie. Spróbuj ponownie za
          chwilę — pracujemy nad tym.
        </Lead>
        <Actions>
          <PrimaryLink href="/">Strona główna</PrimaryLink>
          <SecondaryLink href="/products">Przeglądaj produkty</SecondaryLink>
        </Actions>
      </Wrap>
    </PageContainer>
  );
}
