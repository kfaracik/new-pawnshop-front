import Center from "@/components/Center";
import PageContainer from "@/components/PageContainer";
import styled from "styled-components";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const Title = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
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
  gap: 20px;
  text-align: center;
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.1rem;
  color: #555;
`;

const ContactIcon = styled.div`
  font-size: 1.5rem;
  color: #333333;
`;

const FormMapWrapper = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  max-width: 800px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  resize: vertical;
`;

const Button = styled.button`
  padding: 12px;
  font-size: 1rem;
  color: white;
  background-color: #333333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #444444;
  }
`;

export default function ContactPage() {
  return (
    <PageContainer>
      <Center>
        <Title>Skontaktuj się z nami</Title>
        <ContactWrapper>
          <InfoSection>
            <ContactInfo>
              <ContactIcon>
                <FaPhone />
              </ContactIcon>
              <span>+48 123 456 789</span>
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
              <span>Al. Najświętszej Maryi Panny 1, 42-200 Częstochowa</span>
            </ContactInfo>
            <ContactInfo>
              <ContactIcon>
                <FaClock />
              </ContactIcon>
              <span>Godziny otwarcia: Pon-Pt 9:00-18:30, Sob 9:00-15:00</span>
            </ContactInfo>
          </InfoSection>

          <FormMapWrapper>
            <Form>
              <Input type="text" placeholder="Imię i nazwisko" required />
              <Input type="email" placeholder="Adres e-mail" required />
              <Input type="text" placeholder="Temat wiadomości" />
              <Textarea placeholder="Twoja wiadomość" rows="5" required />
              <Button type="submit">Wyślij wiadomość</Button>
            </Form>

            <MapContainer>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2563.438364987258!2d19.1246155!3d50.8125063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4710b54aa8fc5dbd%3A0x7ebed8eb0200a035!2sNowy%20Lombard%20NMP%206!5e0!3m2!1spl!2spl!4v1697265932990!5m2!1spl!2spl"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </MapContainer>
          </FormMapWrapper>
        </ContactWrapper>
      </Center>
    </PageContainer>
  );
}
