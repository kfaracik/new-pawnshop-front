import React, { useState } from "react";
import PageContainer from "components/PageContainer";
import styled from "styled-components";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const LocationHeader = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;
`;

const LocationButton = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  text-transform: capitalize;
  transition: color 0.3s ease;
  &:hover {
    color: #e74c3c;
  }
  ${(props) =>
    props.active &&
    `
    font-weight: bold;
    color: #e74c3c;
  `}
`;

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  gap: 40px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  text-align: center;
  max-width: 600px;
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1rem;
  color: #555;
`;

const ContactIcon = styled.div`
  font-size: 1.5rem;
  color: #333;
`;

const FormMapWrapper = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: 1fr 1fr; /* Map and form side by side */
  width: 100%;
  max-width: 800px;
`;

const MapContainer = styled.div`
  height: 350px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  width: 100%;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  color: #333;
`;

const Textarea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  color: #333;
  resize: vertical;
`;

const Button = styled.button`
  padding: 12px;
  font-size: 1rem;
  color: white;
  background-color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #444;
  }
`;

export default function ContactPage() {
  const [selectedCity, setSelectedCity] = useState("czestochowa");

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  const handleMessageSend = (e) => {
    e.preventDefault();
    // TODO: add logic here to handle message submission
  };

  const getLocationData = (city) => {
    switch (city) {
      case "czestochowa":
        return {
          address: "Al. Najświętszej Maryi Panny 1, 42-200 Częstochowa",
          mapSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2563.438364987258!2d19.1246155!3d50.8125063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4710b54aa8fc5dbd%3A0x7ebed8eb0200a035!2sNowy%20Lombard%20NMP%206!5e0!3m2!1spl!2spl!4v1697265932990!5m2!1spl!2spl",
        };
      case "czestochowa-rakow":
        return {
          address: "ul. Brzozowa 16, 42-216 Częstochowa - Raków",
          mapSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2563.438364987258!2d19.1246155!3d50.7817892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4710b54aa8fc5dbd%3A0x7ebed8eb0200a035!2sNowy%20Lombard%20RAK%C3%93W!5e0!3m2!1spl!2spl!4v1697265932990!5m2!1spl!2spl",
        };
      case "katowice":
        return {
          address: "ul. Warszawska 13, 40-009 Katowice",
          mapSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2563.438364987258!2d19.0246155!3d50.258614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716cf2c02be991b%3A0x72d74599feffda2!2sNowy%20Lombard%20Katowice!5e0!3m2!1spl!2spl!4v1697265932990!5m2!1spl!2spl",
        };
      default:
        return {
          address: "",
          mapSrc: "",
        };
    }
  };

  const { address, mapSrc } = getLocationData(selectedCity);

  return (
    <PageContainer>
      <Title>Skontaktuj się z nami</Title>
      <LocationHeader>
        <LocationButton
          onClick={() => handleCityChange("czestochowa")}
          active={selectedCity === "czestochowa"}
        >
          Częstochowa NPM
        </LocationButton>
        <LocationButton
          onClick={() => handleCityChange("czestochowa-rakow")}
          active={selectedCity === "czestochowa-rakow"}
        >
          Częstochowa Raków
        </LocationButton>
        <LocationButton
          onClick={() => handleCityChange("katowice")}
          active={selectedCity === "katowice"}
        >
          Katowice
        </LocationButton>
      </LocationHeader>
      <ContactWrapper>
        <InfoSection>
          <ContactInfo>
            <ContactIcon>
              <FaPhone />
            </ContactIcon>
            <span>+48 515 671 666</span>
          </ContactInfo>
          <ContactInfo>
            <ContactIcon>
              <FaEnvelope />
            </ContactIcon>
            <span>kontakt@lombard.pl</span>
          </ContactInfo>
          <ContactInfo>
            <ContactIcon>
              <FaMapMarkerAlt />
            </ContactIcon>
            <span>{address}</span>
          </ContactInfo>
          <ContactInfo>
            <ContactIcon>
              <FaClock />
            </ContactIcon>
            <span>Godziny otwarcia: Pon-Pt 9:00-18:30, Sob 9:00-15:00</span>
          </ContactInfo>
        </InfoSection>
        <FormMapWrapper>
          <MapContainer>
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </MapContainer>
          <Form onSubmit={handleMessageSend}>
            <Input type="text" placeholder="Imię i nazwisko" required />
            <Input type="email" placeholder="Adres e-mail" required />
            <Input type="text" placeholder="Temat wiadomości" />
            <Textarea placeholder="Twoja wiadomość" rows="5" required />
            <Button type="submit">Wyślij wiadomość</Button>
          </Form>
        </FormMapWrapper>
      </ContactWrapper>
    </PageContainer>
  );
}
