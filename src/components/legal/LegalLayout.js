import React from "react";
import styled from "styled-components";
import PageContainer from "components/PageContainer";
import SeoHead from "components/SeoHead";
import colors from "styles/colors";
import { COMPANY_DATA_INCOMPLETE } from "lib/companyInfo";

const Wrapper = styled.section`
  margin: 24px 0 48px;
`;

const Card = styled.article`
  background: ${colors.backgroundPaper};
  border: 1px solid #e8e8e8;
  border-radius: 16px;
  padding: clamp(18px, 3vw, 34px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  max-width: 900px;
  margin: 0 auto;
`;

const Eyebrow = styled.div`
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: ${colors.primaryDark};
  margin-bottom: 8px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(1.5rem, 3vw, 2.1rem);
  font-weight: 800;
  letter-spacing: -0.01em;
  color: ${colors.textPrimary};
`;

const Updated = styled.p`
  margin: 8px 0 0;
  font-size: 0.85rem;
  color: ${colors.textSecondary};
`;

const DraftNotice = styled.div`
  margin: 20px 0 0;
  padding: 12px 16px;
  border: 1px solid #eadfae;
  border-radius: 12px;
  background: #fffaf0;
  color: #7a5b00;
  font-size: 0.88rem;
  line-height: 1.5;

  strong {
    color: #5c4400;
  }
`;

const Lead = styled.div`
  margin: 22px 0 0;
  color: ${colors.textSecondary};
  line-height: 1.65;
  font-size: 0.97rem;

  p {
    margin: 0 0 10px;
  }
`;

const Toc = styled.nav`
  margin: 24px 0 8px;
  padding: 16px 18px;
  border: 1px solid #ececec;
  border-radius: 12px;
  background: #faf9f6;

  strong {
    display: block;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: ${colors.textSecondary};
    margin-bottom: 10px;
  }

  ol {
    margin: 0;
    padding-left: 20px;
    display: grid;
    gap: 6px;
  }

  a {
    color: ${colors.textPrimary};
    text-decoration: none;
    font-size: 0.92rem;
    line-height: 1.4;

    &:hover {
      color: ${colors.primaryDark};
      text-decoration: underline;
    }
  }
`;

const Sections = styled.div`
  margin-top: 20px;
  display: grid;
  gap: 26px;

  h2 {
    margin: 0 0 10px;
    font-size: 1.1rem;
    font-weight: 700;
    color: ${colors.textPrimary};
    scroll-margin-top: 90px;
  }

  p {
    margin: 0 0 10px;
    color: ${colors.textSecondary};
    line-height: 1.65;
    font-size: 0.95rem;
  }

  ul,
  ol {
    margin: 0 0 10px;
    padding-left: 22px;
    display: grid;
    gap: 6px;
    color: ${colors.textSecondary};
    line-height: 1.6;
    font-size: 0.95rem;
  }

  li {
    padding-left: 2px;
  }

  strong {
    color: ${colors.textPrimary};
    font-weight: 600;
  }

  a {
    color: ${colors.primaryDark};
    text-decoration: underline;
  }

  address {
    font-style: normal;
    color: ${colors.textSecondary};
    line-height: 1.6;
  }
`;

const Section = styled.section`
  border-top: 1px solid #f0eee7;
  padding-top: 22px;

  &:first-child {
    border-top: 0;
    padding-top: 0;
  }
`;

export default function LegalLayout({
  title,
  description,
  eyebrow = "Informacje prawne",
  updatedAt,
  lead,
  sections,
  path,
}) {
  const items = Array.isArray(sections) ? sections : [];
  return (
    <PageContainer>
      <SeoHead
        title={`${title} | Nowy Lombard`}
        description={description || `${title} sklepu internetowego Nowy Lombard.`}
        path={path}
        noindex={COMPANY_DATA_INCOMPLETE}
      />
      <Wrapper>
        <Card>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Title>{title}</Title>
          {updatedAt && <Updated>Ostatnia aktualizacja: {updatedAt}</Updated>}

          {COMPANY_DATA_INCOMPLETE && (
            <DraftNotice>
              <strong>Dokument w przygotowaniu.</strong> Treść ma charakter wzorcowy
              i wymaga uzupełnienia danych przedsiębiorcy oraz finalnej weryfikacji
              prawnej przed publikacją produkcyjną.
            </DraftNotice>
          )}

          {lead && <Lead>{lead}</Lead>}

          {items.length > 0 && (
            <Toc aria-label="Spis treści">
              <strong>Spis treści</strong>
              <ol>
                {items.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{section.title}</a>
                  </li>
                ))}
              </ol>
            </Toc>
          )}

          <Sections>
            {items.map((section, index) => (
              <Section key={section.id} id={section.id}>
                <h2>
                  §{index + 1}. {section.title}
                </h2>
                {section.content}
              </Section>
            ))}
          </Sections>
        </Card>
      </Wrapper>
    </PageContainer>
  );
}
