import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import PageContainer from "components/PageContainer";
import SeoHead from "components/SeoHead";
import colors from "styles/colors";

type FaqItem = { q: string; a: string };

// Kept as data so the same source feeds both the page and the FAQPage schema.
const FAQ: FaqItem[] = [
  {
    q: "Jak działa pożyczka pod zastaw?",
    a: "Przynosisz przedmiot do jednego z naszych oddziałów, my go bezpłatnie wyceniamy i proponujemy kwotę pożyczki. Po podpisaniu umowy otrzymujesz gotówkę od ręki, a przedmiot zostaje u nas jako zabezpieczenie. Możesz go wykupić w ustalonym terminie, odzyskując swoją własność.",
  },
  {
    q: "Co mogę zastawić lub sprzedać?",
    a: "Najczęściej przyjmujemy złoto i biżuterię, zegarki, elektronikę (telefony, laptopy, konsole) oraz narzędzia. Jeśli nie masz pewności, czy przyjmiemy dany przedmiot — napisz do nas przez formularz wyceny albo zadzwoń. Odpowiemy, zanim przyjedziesz.",
  },
  {
    q: "Ile kosztuje wycena?",
    a: "Wycena jest całkowicie bezpłatna i niezobowiązująca. Możesz ją zamówić online przez formularz, a my oszacujemy wartość na podstawie opisu i zdjęć, albo przyjść do oddziału — wycena na miejscu zajmuje zwykle około 15 minut.",
  },
  {
    q: "Jakie dokumenty są potrzebne?",
    a: "Do zawarcia umowy potrzebny jest ważny dokument tożsamości ze zdjęciem (dowód osobisty lub paszport) oraz ukończone 18 lat. Przy droższych przedmiotach pomocne są dowód zakupu, karta gwarancyjna lub certyfikat — nie są jednak obowiązkowe.",
  },
  {
    q: "Co się stanie, jeśli nie wykupię przedmiotu w terminie?",
    a: "Warunki i terminy zawsze ustalamy indywidualnie i zapisujemy w umowie, którą dostajesz przed podpisaniem — nic nie dzieje się automatycznie ani bez Twojej wiedzy. Jeśli zbliża się termin, skontaktuj się z nami: w wielu przypadkach da się go przedłużyć.",
  },
  {
    q: "Czy kupujecie przedmioty na własność?",
    a: "Tak. Jeśli nie chcesz pożyczki, możemy odkupić przedmiot od razu — wtedy dostajesz gotówkę i sprawa jest zamknięta, bez terminów i wykupu. Kwotę zawsze podajemy przed decyzją, wybór należy do Ciebie.",
  },
  {
    q: "Czy przedmioty w sklepie są sprawdzone?",
    a: "Tak. Każdy przedmiot trafiający do oferty przechodzi weryfikację i wycenę przez naszych pracowników — sprawdzamy stan techniczny, a w przypadku metali szlachetnych również próbę. Stan i istotne cechy opisujemy w karcie produktu.",
  },
  {
    q: "Czy mogę zamówić przez internet i odebrać w sklepie?",
    a: "Tak. Podczas składania zamówienia wybierz opcję odbioru osobistego — poinformujemy Cię, kiedy przedmiot będzie gotowy do odbioru w wybranym oddziale. Dostępna jest też wysyłka kurierem oraz do paczkomatu.",
  },
  {
    q: "Czy mogę zwrócić kupiony przedmiot?",
    a: "Przy zakupach przez internet masz prawo odstąpić od umowy w ciągu 14 dni od otrzymania przesyłki, bez podawania przyczyny. Szczegółowe zasady i wyjątki opisuje nasz Regulamin.",
  },
  {
    q: "Czy oferta w sklepie internetowym jest aktualna?",
    a: "Tak — nasze przedmioty są w większości unikatowe, dostępne w jednym egzemplarzu, dlatego stan magazynowy aktualizujemy na bieżąco. Jeśli coś zniknie z oferty, możesz zostawić swój e-mail na karcie produktu, a my damy znać, gdyby pojawiło się ponownie lub trafiło coś podobnego.",
  },
];

const Wrap = styled.section`
  margin: 24px 0 48px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 26px;
`;

const Title = styled.h1`
  margin: 0 0 8px;
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${colors.textPrimary};
`;

const Lead = styled.p`
  margin: 0 auto;
  max-width: 56ch;
  color: ${colors.textSecondary};
  line-height: 1.55;
`;

const List = styled.div`
  display: grid;
  gap: 10px;
  max-width: 780px;
  margin: 0 auto;
`;

const Item = styled.div`
  border: 1px solid #ece6d6;
  border-radius: 14px;
  background: ${colors.backgroundPaper};
  overflow: hidden;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    border-color: #e0d5b4;
  }
`;

const Question = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 16px 18px;
  border: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  line-height: 1.4;

  &:hover {
    color: ${colors.primaryDark};
  }
`;

const Chevron = styled.span<{ $open: boolean }>`
  flex: 0 0 auto;
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${colors.primaryDark};
  transform: rotate(${(props) => (props.$open ? "180deg" : "0deg")});
  transition: transform 0.2s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Answer = styled.div`
  padding: 0 18px 18px;
  color: ${colors.textSecondary};
  font-size: 0.95rem;
  line-height: 1.6;
`;

const Cta = styled.div`
  margin: 30px auto 0;
  max-width: 780px;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #ece6d6;
  background: #fffdf7;
  text-align: center;

  h2 {
    margin: 0 0 6px;
    font-size: 1.15rem;
    color: ${colors.textPrimary};
  }

  p {
    margin: 0 0 14px;
    color: ${colors.textSecondary};
    line-height: 1.5;
  }

  a {
    color: ${colors.primaryDark};
    font-weight: 700;
  }
`;

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <PageContainer>
      <SeoHead
        title="Najczęstsze pytania (FAQ) | Nowy Lombard"
        description="Jak działa pożyczka pod zastaw, co można zastawić, jakie dokumenty są potrzebne i jak wygląda wycena — odpowiedzi na najczęstsze pytania."
        path="/faq"
        schema={schema}
      />
      <Wrap>
        <Header>
          <Title>Najczęstsze pytania</Title>
          <Lead>
            Zebraliśmy odpowiedzi na pytania, które słyszymy najczęściej. Jeśli
            nie znajdziesz swojego — napisz do nas, chętnie wyjaśnimy.
          </Lead>
        </Header>

        <List>
          {FAQ.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Item key={item.q}>
                <Question
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  {item.q}
                  <Chevron $open={isOpen} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </Chevron>
                </Question>
                {isOpen && (
                  <Answer id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`}>
                    {item.a}
                  </Answer>
                )}
              </Item>
            );
          })}
        </List>

        <Cta>
          <h2>Nie ma tu Twojego pytania?</h2>
          <p>
            Napisz przez <Link href="/contact">formularz kontaktowy</Link> albo
            zadzwoń — odpowiadamy zwykle tego samego dnia roboczego.
          </p>
        </Cta>
      </Wrap>
    </PageContainer>
  );
}
