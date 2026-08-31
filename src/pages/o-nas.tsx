import Link from "next/link";
import styled from "styled-components";
import PageContainer from "components/PageContainer";
import SeoHead from "components/SeoHead";
import { buttonBaseStyle, buttonPrimaryStyle, buttonSecondaryStyle } from "components/Button";
import colors from "styles/colors";

const Wrap = styled.section`
  margin: 24px 0 48px;
`;

const Hero = styled.header`
  max-width: 720px;
  margin: 0 auto 34px;
  text-align: center;
`;

const Eyebrow = styled.span`
  display: inline-block;
  margin-bottom: 10px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: ${colors.primaryDark};
`;

const Title = styled.h1`
  margin: 0 0 12px;
  font-size: clamp(1.7rem, 4.5vw, 2.4rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: ${colors.textPrimary};
  text-wrap: balance;
`;

const Lead = styled.p`
  margin: 0;
  color: ${colors.textSecondary};
  font-size: 1.02rem;
  line-height: 1.6;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  max-width: 720px;
  margin: 0 auto 38px;

  @media (max-width: 560px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Stat = styled.div`
  padding: 18px 16px;
  border-radius: 14px;
  border: 1px solid #ece6d6;
  background: ${colors.backgroundPaper};
  text-align: center;

  strong {
    display: block;
    font-size: 1.5rem;
    font-weight: 800;
    color: ${colors.primaryDark};
    line-height: 1.1;
  }

  span {
    display: block;
    margin-top: 4px;
    font-size: 0.87rem;
    color: ${colors.textSecondary};
  }
`;

const Section = styled.section`
  max-width: 760px;
  margin: 0 auto 30px;

  h2 {
    margin: 0 0 10px;
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    font-weight: 800;
    letter-spacing: -0.01em;
    color: ${colors.textPrimary};
  }

  p {
    margin: 0 0 12px;
    color: ${colors.textSecondary};
    line-height: 1.65;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

const Values = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;

  li {
    display: grid;
    grid-template-columns: 22px minmax(0, 1fr);
    gap: 12px;
    align-items: start;
    color: ${colors.textSecondary};
    line-height: 1.6;
  }

  strong {
    color: ${colors.textPrimary};
  }

  svg {
    margin-top: 3px;
    color: ${colors.primaryDark};
  }
`;

const Cta = styled.div`
  max-width: 760px;
  margin: 36px auto 0;
  padding: 24px;
  border-radius: 18px;
  border: 1px solid #ece6d6;
  background: #fffdf7;
  text-align: center;

  h2 {
    margin: 0 0 8px;
    font-size: 1.25rem;
    color: ${colors.textPrimary};
  }

  p {
    margin: 0 0 16px;
    color: ${colors.textSecondary};
    line-height: 1.55;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
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

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export default function AboutPage() {
  return (
    <PageContainer>
      <SeoHead
        title="O nas — lombard z tradycją od 2004 roku | Nowy Lombard"
        description="Nowy Lombard działa od 2004 roku. Bezpłatna wycena, gotówka od ręki i jasne zasady — poznaj nas i nasze oddziały w Częstochowie i Katowicach."
        path="/o-nas"
      />
      <Wrap>
        <Hero>
          <Eyebrow>Poznaj nas</Eyebrow>
          <Title>Lombard, który stawia na jasne zasady</Title>
          <Lead>
            Działamy od 2004 roku — od szybkiej pożyczki na nieprzewidziany
            wydatek po skup wartościowej biżuterii. Wiemy, że do lombardu zwykle
            przychodzi się w konkretnej potrzebie, dlatego stawiamy na spokojną
            rozmowę i uczciwą wycenę.
          </Lead>
        </Hero>

        <Stats>
          <Stat>
            <strong>od 2004</strong>
            <span>roku na rynku</span>
          </Stat>
          <Stat>
            <strong>3</strong>
            <span>oddziały w Częstochowie i Katowicach</span>
          </Stat>
          <Stat>
            <strong>15 min</strong>
            <span>tyle zwykle trwa wycena</span>
          </Stat>
        </Stats>

        <Section>
          <h2>Jak pracujemy</h2>
          <p>
            Zaczynamy od wyceny — bezpłatnej i niezobowiązującej. Oglądamy
            przedmiot, sprawdzamy stan, a przy metalach szlachetnych również
            próbę. Potem podajemy kwotę i tłumaczymy, z czego wynika. Decyzja
            zawsze należy do Ciebie i nie musisz jej podejmować od razu.
          </p>
          <p>
            Jeśli zdecydujesz się na pożyczkę pod zastaw, warunki spisujemy w
            umowie, którą dostajesz do przeczytania przed podpisaniem. Nie ma
            ukrytych opłat ani zapisów drobnym drukiem — wszystko, co istotne,
            mówimy wprost przy stole.
          </p>
        </Section>

        <Section>
          <h2>Co nas wyróżnia</h2>
          <Values>
            <li>
              <Check />
              <span>
                <strong>Wycena bez zobowiązań.</strong> Możesz ją zamówić online
                albo przyjść do oddziału. Nie płacisz za nią i nie musisz z niej
                skorzystać.
              </span>
            </li>
            <li>
              <Check />
              <span>
                <strong>Gotówka od ręki.</strong> Po ustaleniu warunków
                wypłacamy pieniądze od razu, bez czekania na przelew.
              </span>
            </li>
            <li>
              <Check />
              <span>
                <strong>Sprawdzone przedmioty w sklepie.</strong> Każdy produkt w
                naszej ofercie przechodzi weryfikację, a jego stan opisujemy
                uczciwie w karcie produktu.
              </span>
            </li>
            <li>
              <Check />
              <span>
                <strong>Dyskrecja.</strong> Sprawy finansowe są prywatne.
                Traktujemy je poważnie i nie zadajemy zbędnych pytań.
              </span>
            </li>
          </Values>
        </Section>

        <Section>
          <h2>Gdzie nas znajdziesz</h2>
          <p>
            Mamy trzy oddziały — dwa w Częstochowie (Aleja NMP oraz Raków) i
            jeden w Katowicach. Dokładne adresy, numery telefonów i godziny
            otwarcia znajdziesz na stronie{" "}
            <Link href="/contact">Kontakt</Link>, razem z mapą dojazdu.
          </p>
        </Section>

        <Cta>
          <h2>Masz przedmiot do wyceny?</h2>
          <p>
            Opisz go w formularzu — oszacujemy wartość i oddzwonimy. Bez opłat i
            bez zobowiązań.
          </p>
          <Actions>
            <PrimaryLink href="/#wycena">Zamów bezpłatną wycenę</PrimaryLink>
            <SecondaryLink href="/faq">Zobacz najczęstsze pytania</SecondaryLink>
          </Actions>
        </Cta>
      </Wrap>
    </PageContainer>
  );
}
