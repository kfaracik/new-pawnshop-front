import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { buttonBaseStyle } from "components/Button";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import PageContainer from "components/PageContainer";
import SeoHead from "components/SeoHead";
import colors from "styles/colors";

const LOCATIONS = {
  czestochowa: {
    label: "Częstochowa NPM",
    address: "Al. Najświętszej Maryi Panny 1, 42-200 Częstochowa",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2563.438364987258!2d19.1246155!3d50.8125063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4710b54aa8fc5dbd%3A0x7ebed8eb0200a035!2sNowy%20Lombard%20NMP%206!5e0!3m2!1spl!2spl!4v1697265932990!5m2!1spl!2spl",
  },
  rakow: {
    label: "Częstochowa Raków",
    address: "ul. Brzozowa 16, 42-216 Częstochowa - Raków",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2563.438364987258!2d19.1246155!3d50.7817892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4710b54aa8fc5dbd%3A0x7ebed8eb0200a035!2sNowy%20Lombard%20RAK%C3%93W!5e0!3m2!1spl!2spl!4v1697265932990!5m2!1spl!2spl",
  },
  katowice: {
    label: "Katowice",
    address: "ul. Warszawska 13, 40-009 Katowice",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2563.438364987258!2d19.0246155!3d50.258614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716cf2c02be991b%3A0x72d74599feffda2!2sNowy%20Lombard%20Katowice!5e0!3m2!1spl!2spl!4v1697265932990!5m2!1spl!2spl",
  },
};

const PageSection = styled.section`
  margin: 24px 0 40px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(1.6rem, 2.8vw, 2.2rem);
  color: ${colors.textPrimary};
  line-height: 1.2;
`;

const Tabs = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 18px 0 10px;

  @media (max-width: 520px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;

const TabButton = styled.button`
  ${buttonBaseStyle}
  border: 1px solid
    ${(props) => (props.active ? colors.primaryDark : "rgba(0, 0, 0, 0.12)")};
  color: ${(props) => (props.active ? colors.primaryDark : colors.textPrimary)};
  background: ${(props) =>
    props.active ? "rgba(201,162,39,0.12)" : colors.backgroundPaper};
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 600;

  &:hover {
    border-color: ${colors.primary};
  }

  @media (max-width: 520px) {
    width: 100%;
    justify-self: stretch;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 16px;

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
    gap: 20px;
  }
`;

const Card = styled.div`
  background: ${colors.backgroundPaper};
  border: 1px solid #e9e9e9;
  border-radius: 14px;
  padding: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
`;

const CardTitle = styled.h2`
  margin: 0;
  font-size: 1.02rem;
  color: ${colors.textPrimary};
`;

const BranchPill = styled.span`
  display: inline-flex;
  align-items: center;
  border: 1px solid #e3d6a7;
  background: rgba(201, 162, 39, 0.1);
  color: ${colors.primaryDark};
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 0.78rem;
  font-weight: 600;
`;

const InfoList = styled.div`
  display: grid;
  gap: 8px;
`;

const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 24px 95px minmax(0, 1fr);
  gap: 8px;
  align-items: start;
  color: ${colors.textPrimary};
  line-height: 1.35;
  padding: 8px 0;
  border-bottom: 1px solid #f4f4f4;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 600px) {
    grid-template-columns: 24px minmax(0, 1fr);
  }
`;

const IconWrap = styled.span`
  width: 22px;
  margin-top: 2px;
  color: ${colors.primaryDark};
  display: inline-flex;
  justify-content: center;
`;

const InfoLabel = styled.span`
  font-size: 0.83rem;
  color: ${colors.textSecondary};
  font-weight: 600;

  @media (max-width: 600px) {
    display: none;
  }
`;

const InfoValue = styled.span`
  font-size: 0.93rem;
  color: ${colors.textPrimary};
`;

const ContactLink = styled.a`
  color: ${colors.primaryDark};
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const MapCard = styled(Card)`
  padding: 10px;
`;

const MapFrame = styled.iframe`
  width: 100%;
  height: 320px;
  border: 0;
  border-radius: 10px;

  @media (min-width: 900px) {
    height: 100%;
    min-height: 360px;
  }
`;

export default function ContactPage() {
  const [selectedKey, setSelectedKey] = useState("czestochowa");
  const selected = useMemo(() => LOCATIONS[selectedKey], [selectedKey]);

  return (
    <PageContainer>
      <SeoHead
        title="Kontakt | Nowy Lombard"
        description="Dane kontaktowe i lokalizacje oddziałów Nowego Lombardu. Sprawdź adres, telefon i godziny otwarcia."
        path="/contact"
      />
      <PageSection>
        <Header>
          <Title>Skontaktuj się z nami</Title>
          <Tabs>
            {Object.entries(LOCATIONS).map(([key, item]) => (
              <TabButton
                key={key}
                type="button"
                active={selectedKey === key}
                onClick={() => setSelectedKey(key)}
              >
                {item.label}
              </TabButton>
            ))}
          </Tabs>
        </Header>

        <ContentGrid>
          <Card>
            <CardHeader>
              <CardTitle>Dane kontaktowe</CardTitle>
              <BranchPill>{selected.label}</BranchPill>
            </CardHeader>
            <InfoList>
              <InfoRow>
                <IconWrap>
                  <FaPhone />
                </IconWrap>
                <InfoLabel>Telefon</InfoLabel>
                <InfoValue>
                  <ContactLink href="tel:+48515671666">+48 515 671 666</ContactLink>
                </InfoValue>
              </InfoRow>
              <InfoRow>
                <IconWrap>
                  <FaEnvelope />
                </IconWrap>
                <InfoLabel>E-mail</InfoLabel>
                <InfoValue>
                  <ContactLink href="mailto:kontakt@lombard.pl">
                    kontakt@lombard.pl
                  </ContactLink>
                </InfoValue>
              </InfoRow>
              <InfoRow>
                <IconWrap>
                  <FaMapMarkerAlt />
                </IconWrap>
                <InfoLabel>Adres</InfoLabel>
                <InfoValue>{selected.address}</InfoValue>
              </InfoRow>
              <InfoRow>
                <IconWrap>
                  <FaClock />
                </IconWrap>
                <InfoLabel>Godziny</InfoLabel>
                <InfoValue>Pon-Pt 9:00-18:30, Sob 9:00-15:00</InfoValue>
              </InfoRow>
            </InfoList>
          </Card>

          <MapCard>
            <MapFrame
              src={selected.mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              title={`Mapa lokalizacji: ${selected.label}`}
            />
          </MapCard>
        </ContentGrid>
      </PageSection>
    </PageContainer>
  );
}
