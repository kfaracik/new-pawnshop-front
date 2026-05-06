import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import PageContainer from "components/PageContainer";
import SeoHead from "components/SeoHead";
import colors from "styles/colors";
import { useLocations } from "services/api/locationApi";
import { getLocationAddress, getLocationLabel, getLocationMapUrl } from "lib/locations";

const PageSection = styled.section`
  margin: 24px 0 40px;
  display: grid;
  gap: 18px;
`;

const Header = styled.header`
  display: grid;
  gap: 8px;
`;

const Eyebrow = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${colors.primaryDark};
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  color: ${colors.textPrimary};
  line-height: 1.15;
`;

const Tabs = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const TabButton = styled.button`
  border: 1px solid ${(props) => (props.$active ? colors.primaryDark : "#dfdfdf")};
  background: ${(props) => (props.$active ? "#fff7e7" : "#fff")};
  color: ${colors.textPrimary};
  border-radius: 999px;
  padding: 10px 14px;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
`;

const ContentGrid = styled.div`
  display: grid;
  gap: 18px;

  @media (min-width: 980px) {
    grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  }
`;

const Card = styled.div`
  background: ${colors.backgroundPaper};
  border: 1px solid #e9e9e9;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
`;

const CardTitle = styled.h2`
  margin: 0 0 14px;
  font-size: 1.05rem;
  color: ${colors.textPrimary};
`;

const InfoList = styled.div`
  display: grid;
  gap: 10px;
`;

const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 22px 88px minmax(0, 1fr);
  gap: 10px;
  align-items: start;
  padding: 8px 0;
  border-bottom: 1px solid #f3f3f3;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 640px) {
    grid-template-columns: 22px minmax(0, 1fr);
  }
`;

const InfoLabel = styled.span`
  color: ${colors.textSecondary};
  font-size: 0.86rem;
  font-weight: 600;

  @media (max-width: 640px) {
    display: none;
  }
`;

const InfoValue = styled.div`
  color: ${colors.textPrimary};
  font-size: 0.95rem;
  line-height: 1.55;
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
  display: grid;
  gap: 14px;
`;

const MapFrame = styled.iframe`
  width: 100%;
  min-height: 420px;
  border: 0;
  border-radius: 12px;
  background: #f8f8f8;
`;

const MapMeta = styled.div`
  display: grid;
  gap: 8px;
  color: ${colors.textSecondary};
  line-height: 1.6;
`;

const EmptyState = styled(Card)`
  color: ${colors.textSecondary};
  text-align: center;
`;

export default function LocationsPage() {
  const router = useRouter();
  const { data: locations = [], isLoading, isError } = useLocations();
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    const requestedId = typeof router.query.location === "string" ? router.query.location : "";
    if (requestedId && locations.some((location) => String(location._id) === requestedId)) {
      setSelectedId(requestedId);
      return;
    }

    if (!selectedId && locations.length > 0) {
      setSelectedId(String(locations[0]._id));
    }
  }, [locations, router.query.location, selectedId]);

  const selected = useMemo(
    () =>
      locations.find((location) => String(location._id) === String(selectedId)) ||
      locations[0] ||
      null,
    [locations, selectedId]
  );

  const address = getLocationAddress(selected);
  const mapUrl = getLocationMapUrl(selected);

  return (
    <PageContainer loading={isLoading}>
      <SeoHead
        title="Lokalizacje | Nowy Lombard"
        description="Sprawdź adresy i dane kontaktowe punktów Nowego Lombardu."
        path="/locations"
      />
      <PageSection>
        <Header>
          <Eyebrow>Nasze lokalizacje</Eyebrow>
          <Title>Skontaktuj się z nami</Title>
        </Header>

        {locations.length > 0 && (
          <Tabs>
            {locations.map((location) => (
              <TabButton
                key={location._id}
                type="button"
                $active={String(selected?._id) === String(location._id)}
                onClick={() => setSelectedId(String(location._id))}
              >
                {getLocationLabel(location)}
              </TabButton>
            ))}
          </Tabs>
        )}

        {isError ? (
          <EmptyState>Nie udało się załadować lokalizacji. Spróbuj ponownie za chwilę.</EmptyState>
        ) : !selected ? (
          <EmptyState>Aktualnie nie ma jeszcze opublikowanych lokalizacji.</EmptyState>
        ) : (
          <ContentGrid>
            <Card>
              <CardTitle>Dane kontaktowe</CardTitle>
              <InfoList>
                <InfoRow>
                  <FaPhone color={colors.primaryDark} />
                  <InfoLabel>Telefon</InfoLabel>
                  <InfoValue>
                    {selected.phone ? (
                      <ContactLink href={`tel:${selected.phone}`}>{selected.phone}</ContactLink>
                    ) : (
                      "Brak numeru telefonu"
                    )}
                  </InfoValue>
                </InfoRow>
                <InfoRow>
                  <FaEnvelope color={colors.primaryDark} />
                  <InfoLabel>E-mail</InfoLabel>
                  <InfoValue>
                    {selected.email ? (
                      <ContactLink href={`mailto:${selected.email}`}>{selected.email}</ContactLink>
                    ) : (
                      "Brak adresu e-mail"
                    )}
                  </InfoValue>
                </InfoRow>
                <InfoRow>
                  <FaMapMarkerAlt color={colors.primaryDark} />
                  <InfoLabel>Adres</InfoLabel>
                  <InfoValue>{address || "Brak adresu"}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <FaClock color={colors.primaryDark} />
                  <InfoLabel>Godziny</InfoLabel>
                  <InfoValue>{selected.description || "Godziny otwarcia podamy po kontakcie z punktem."}</InfoValue>
                </InfoRow>
              </InfoList>
            </Card>

            <MapCard>
              <CardTitle>{getLocationLabel(selected)}</CardTitle>
              {mapUrl ? (
                <MapFrame
                  src={mapUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Mapa punktu ${getLocationLabel(selected)}`}
                />
              ) : (
                <EmptyState>Brak danych adresowych do wyświetlenia mapy.</EmptyState>
              )}
              <MapMeta>
                <div>{address || "Brak adresu"}</div>
                {selected.city && <div>{selected.city}</div>}
              </MapMeta>
            </MapCard>
          </ContentGrid>
        )}
      </PageSection>
    </PageContainer>
  );
}
