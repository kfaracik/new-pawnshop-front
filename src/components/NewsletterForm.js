import React, { useState } from "react";
import styled from "styled-components";
import { buttonBaseStyle } from "components/Button";
import { submitInquiry } from "services/api/inquiryApi";
import colors from "styles/colors";

const Wrap = styled.div`
  display: grid;
  gap: 8px;
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
  border: 1px solid #3a352b;
  background: #171512;
  color: #f0ece3;
  font-size: 0.92rem;
  font-family: inherit;
  outline: none;

  &::placeholder {
    color: #8f8f8f;
  }

  &:focus {
    border-color: ${colors.primary};
  }
`;

const Submit = styled.button`
  ${buttonBaseStyle}
  flex: 0 0 auto;
  min-height: 44px;
  padding: 0 18px;
  border: 0;
  border-radius: 10px;
  background: ${colors.primary};
  color: #12100a;
  font-weight: 700;
  font-size: 0.9rem;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Note = styled.p`
  margin: 0;
  font-size: 0.78rem;
  line-height: 1.5;
  color: ${(props) => (props.$tone === "error" ? "#e58274" : props.$tone === "ok" ? "#7fd3a3" : "#8f8f8f")};
`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterForm() {
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
      await submitInquiry({ type: "newsletter", email: value, source: "stopka" });
      setStatus("ok");
      setNote("Dziękujemy — zapisaliśmy Twój adres.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setNote(
        error?.response?.data?.message || "Nie udało się zapisać. Spróbuj ponownie."
      );
    }
  };

  return (
    <Wrap>
      <Row onSubmit={handleSubmit} noValidate>
        <label htmlFor="newsletter-email" className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>
          Adres e-mail do newslettera
        </label>
        <Input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="Twój e-mail"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status !== "idle") {
              setStatus("idle");
              setNote("");
            }
          }}
        />
        <Submit type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Zapisywanie…" : "Zapisz się"}
        </Submit>
      </Row>
      <Note $tone={status === "error" ? "error" : status === "ok" ? "ok" : undefined} role={note ? "status" : undefined}>
        {note || "Nowe okazje i wyprzedaże. Bez spamu, możesz zrezygnować w każdej chwili."}
      </Note>
    </Wrap>
  );
}
