import React, { useState } from "react";
import styled from "styled-components";
import { buttonBaseStyle, buttonSecondaryStyle } from "components/Button";
import { submitInquiry } from "services/api/inquiryApi";
import colors from "styles/colors";

const Wrap = styled.div`
  margin-top: 14px;
  padding: 14px;
  border: 1px solid #ece6d6;
  border-radius: 12px;
  background: #fffdf7;
`;

const Lead = styled.p`
  margin: 0 0 10px;
  font-size: 0.9rem;
  line-height: 1.5;
  color: ${colors.textSecondary};
`;

const Row = styled.form`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1 1 200px;
  min-width: 0;
  box-sizing: border-box;
  min-height: 44px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid #e2ddcf;
  background: #fff;
  color: ${colors.textPrimary};
  font-size: 0.93rem;
  font-family: inherit;
  outline: none;

  &:focus {
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.18);
  }
`;

const Submit = styled.button`
  ${buttonBaseStyle}
  ${buttonSecondaryStyle}
  flex: 0 0 auto;
  min-height: 44px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Note = styled.p`
  margin: 8px 0 0;
  font-size: 0.82rem;
  line-height: 1.45;
  color: ${(props) => (props.$tone === "error" ? colors.error : "#1e7d43")};
`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Pawnshop stock is one-of-a-kind: when an item is gone, let the visitor
// register interest instead of losing them.
export default function NotifyAvailability({ productId, productTitle }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [note, setNote] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const value = email.trim();

    if (!EMAIL_RE.test(value)) {
      setStatus("error");
      setNote("Podaj prawidłowy adres e-mail.");
      return;
    }

    try {
      setStatus("sending");
      await submitInquiry({
        type: "availability",
        email: value,
        productId: productId ? String(productId) : "",
        productTitle: productTitle || "",
        source: "karta-produktu",
      });
      setStatus("ok");
      setNote("Dziękujemy — damy znać, gdy przedmiot znów będzie dostępny.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setNote(
        error?.response?.data?.message || "Nie udało się zapisać. Spróbuj ponownie."
      );
    }
  };

  if (status === "ok") {
    return (
      <Wrap>
        <Note role="status">{note}</Note>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Lead>
        Ten przedmiot jest chwilowo niedostępny. Zostaw e-mail — powiadomimy Cię,
        jeśli wróci do oferty lub pojawi się coś podobnego.
      </Lead>
      <Row onSubmit={handleSubmit} noValidate>
        <Input
          type="email"
          autoComplete="email"
          aria-label="Adres e-mail do powiadomienia o dostępności"
          placeholder="Twój e-mail"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") {
              setStatus("idle");
              setNote("");
            }
          }}
        />
        <Submit type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Zapisywanie…" : "Powiadom mnie"}
        </Submit>
      </Row>
      {note && status === "error" && (
        <Note $tone="error" role="alert">
          {note}
        </Note>
      )}
    </Wrap>
  );
}
