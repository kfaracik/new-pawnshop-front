import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { buttonBaseStyle } from "components/Button";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import PageContainer from "components/PageContainer";
import SeoHead from "components/SeoHead";
import colors from "styles/colors";
import { useLocations } from "services/api/locationApi";

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
    ${(props) => (props.$active ? colors.primaryDark : "rgba(0, 0, 0, 0.12)")};
  color: ${(props) => (props.$active ? colors.primaryDark : colors.textPrimary)};
  background: ${(props) =>
    props.$active ? "rgba(201,162,39,0.12)" : colors.backgroundPaper};
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

const DetailsCard = styled(Card)`
  display: grid;
  gap: 14px;
`;

const DetailsText = styled.p`
  margin: 0;
  color: ${colors.textSecondary};
  line-height: 1.7;
`;

const DetailsList = styled.div`
  display: grid;
  gap: 10px;
`;

const DetailsItem = styled.div`
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  padding: 12px 14px;
  background: #fcfcfc;
  color: ${colors.textPrimary};
  line-height: 1.6;
`;

const EmptyState = styled(Card)`
  text-align: center;
  color: ${colors.textSecondary};
`;

const getLocationLabel = (location) =>
  location?.name || [location?.city, location?.addressLine1].filter(Boolean).join(" - ") || "Punkt";

const getLocationAddress = (location) =>
  [location?.addressLine1, location?.addressLine2, location?.postalCode, location?.city]
    .filter(Boolean)
    .join(", ");

export default function LocationsPage() {
  const { data: locations = [], isLoading, isError } = useLocations();
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    if (!selectedId && locations.length > 0) {
      setSelectedId(String(locations[0]._id));
    }
  }, [locations, selectedId]);

  const selected = useMemo(() => {
    return (
      locations.find((location) => String(location._id) === String(selectedId)) ||
      locations[0] ||
      null
    );
  }, [locations, selectedId]);

  return (
    <PageContainer loading={isLoading}>
      <SeoHead
        title="Lokalizacje | Nowy Lombard"
        description="Sprawdź adresy i dane kontaktowe punktów, w których dostępne są nasze produkty."
        path="/locations"
      />
      <PageSection>
        <Header>
          <Title>Nasze lokalizacje</Title>
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
        </Header>

        {isError ? (
          <EmptyState>Nie udało się załadować lokalizacji. Spróbuj ponownie za chwilę.</EmptyState>
        ) : !selected ? (
          <EmptyState>Aktualnie nie ma jeszcze opublikowanych lokalizacji.</EmptyState>
        ) : (
          <ContentGrid>
            <Card>
              <CardHeader>
                <CardTitle>Dane kontaktowe</CardTitle>
                <BranchPill>{getLocationLabel(selected)}</BranchPill>
              </CardHeader>
              <InfoList>
                <InfoRow>
                  <IconWrap>
                    <FaPhone />
                  </IconWrap>
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
                  <IconWrap>
                    <FaEnvelope />
                  </IconWrap>
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
                  <IconWrap>
                    <FaMapMarkerAlt />
                  </IconWrap>
                  <InfoLabel>Adres</InfoLabel>
                  <InfoValue>{getLocationAddress(selected) || "Brak adresu"}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <IconWrap>
                    <FaClock />
                  </IconWrap>
                  <InfoLabel>Informacje</InfoLabel>
                  <InfoValue>{selected.description || "Szczegóły dostępne po kontakcie z punktem."}</InfoValue>
                </InfoRow>
              </InfoList>
            </Card>

            <DetailsCard>
              <CardHeader>
                <CardTitle>Szczegóły lokalizacji</CardTitle>
                {selected.city && <BranchPill>{selected.city}</BranchPill>}
              </CardHeader>
              <DetailsText>
                Sprawdź dane wybranego punktu. Dostępność konkretnych produktów pokazujemy także
                bezpośrednio na kartach produktów i w ich szczegółach.
              </DetailsText>
              <DetailsList>
                {selected.addressLine1 && <DetailsItem>{selected.addressLine1}</DetailsItem>}
                {selected.addressLine2 && <DetailsItem>{selected.addressLine2}</DetailsItem>}
                {selected.postalCode && <DetailsItem>{selected.postalCode}</DetailsItem>}
                {selected.city && <DetailsItem>{selected.city}</DetailsItem>}
              </DetailsList>
            </DetailsCard>
          </ContentGrid>
        )}
      </PageSection>
    </PageContainer>
  );
}
