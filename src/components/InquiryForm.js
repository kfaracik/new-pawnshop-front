import React, { useState } from "react";
import styled from "styled-components";
import { buttonBaseStyle, buttonPrimaryStyle } from "components/Button";
import { submitInquiry } from "services/api/inquiryApi";
import colors from "styles/colors";

const REQUEST_TYPES = [
  { id: "valuation", label: "Wycena przedmiotu" },
  { id: "loan", label: "Pożyczka pod zastaw" },
  { id: "question", label: "Inne pytanie" },
];

const ITEM_CATEGORIES = [
  "Złoto i biżuteria",
  "Elektronika",
  "Zegarki",
  "Narzędzia",
  "Inne",
];

const Card = styled.div`
  background: ${colors.backgroundPaper};
  border: 1px solid #ece6d6;
  border-radius: 18px;
  padding: clamp(18px, 3vw, 28px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.07);
`;

const Intro = styled.div`
  margin-bottom: 18px;

  h2 {
    margin: 0 0 6px;
    font-size: clamp(1.25rem, 3vw, 1.6rem);
    font-weight: 800;
    letter-spacing: -0.01em;
    color: ${colors.textPrimary};
  }

  p {
    margin: 0;
    color: ${colors.textSecondary};
    font-size: 0.95rem;
    line-height: 1.5;
    max-width: 56ch;
  }
`;

const TypeRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const TypeChip = styled.button`
  ${buttonBaseStyle}
  min-height: 40px;
  padding: 0 16px;
  border-radius: 999px;
  border: 1px solid ${(props) => (props.$active ? colors.primary : "#e3ddcd")};
  background: ${(props) => (props.$active ? "#fff8e8" : "#fff")};
  color: ${(props) => (props.$active ? colors.primaryDark : colors.textSecondary)};
  font-size: 0.9rem;
  font-weight: ${(props) => (props.$active ? 700 : 600)};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 620px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Field = styled.label`
  display: grid;
  gap: 6px;
  min-width: 0;
  grid-column: ${(props) => (props.$full ? "1 / -1" : "auto")};
`;

const FieldLabel = styled.span`
  font-size: 0.83rem;
  font-weight: 600;
  color: ${colors.textSecondary};
`;

const inputStyles = `
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 12px 14px;
  border-radius: 11px;
  background: #faf9f6;
  color: #1b1712;
  font-size: 0.97rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
`;

const TextInput = styled.input`
  ${inputStyles}
  border: 1px solid ${(props) => (props.$invalid ? colors.error : "#e2ddcf")};

  &:focus {
    border-color: ${(props) => (props.$invalid ? colors.error : colors.primary)};
    background: #fff;
    box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.18);
  }
`;

const Select = styled.select`
  ${inputStyles}
  border: 1px solid #e2ddcf;
  cursor: pointer;

  &:focus {
    border-color: ${colors.primary};
    background: #fff;
  }
`;

const TextArea = styled.textarea`
  ${inputStyles}
  border: 1px solid ${(props) => (props.$invalid ? colors.error : "#e2ddcf")};
  min-height: 110px;
  resize: vertical;

  &:focus {
    border-color: ${(props) => (props.$invalid ? colors.error : colors.primary)};
    background: #fff;
    box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.18);
  }
`;

const FieldError = styled.span`
  font-size: 0.79rem;
  color: ${colors.error};
`;

const Submit = styled.button`
  ${buttonBaseStyle}
  ${buttonPrimaryStyle}
  margin-top: 18px;
  min-height: 50px;
  width: 100%;
  font-size: 1rem;
  font-weight: 700;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Privacy = styled.p`
  margin: 12px 0 0;
  font-size: 0.8rem;
  color: ${colors.textSecondary};
  line-height: 1.5;

  a {
    color: ${colors.primaryDark};
  }
`;

const Feedback = styled.div`
  margin-top: 14px;
  padding: 13px 15px;
  border-radius: 12px;
  font-size: 0.92rem;
  line-height: 1.5;
  border: 1px solid ${(props) => (props.$tone === "error" ? "#f0d4d4" : "#cfe9d6")};
  background: ${(props) => (props.$tone === "error" ? "#fff7f7" : "#f1faf4")};
  color: ${(props) => (props.$tone === "error" ? colors.error : "#1e7d43")};
`;

const Success = styled.div`
  display: grid;
  gap: 10px;
  justify-items: center;
  text-align: center;
  padding: 26px 10px;

  h3 {
    margin: 0;
    font-size: 1.25rem;
    color: ${colors.textPrimary};
  }

  p {
    margin: 0;
    max-width: 44ch;
    color: ${colors.textSecondary};
    line-height: 1.5;
  }
`;

const ResetButton = styled.button`
  ${buttonBaseStyle}
  margin-top: 4px;
  min-height: 42px;
  padding: 0 18px;
  border: 1px solid #e3ddcd;
  border-radius: 999px;
  background: #fff;
  color: ${colors.primaryDark};
  font-weight: 600;
`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function InquiryForm({
  defaultType = "valuation",
  title = "Bezpłatna wycena — opisz przedmiot",
  lead = "Odpowiadamy zwykle tego samego dnia. Wycena jest darmowa i niezobowiązująca.",
  source = "",
}) {
  const [type, setType] = useState(defaultType);
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    itemCategory: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [formError, setFormError] = useState("");

  const setField = (field) => (event) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
  };

  const validate = () => {
    const next = {};
    if (!values.phone.trim() && !values.email.trim()) {
      next.phone = "Podaj telefon lub e-mail, żebyśmy mogli odpowiedzieć.";
    }
    if (values.email.trim() && !EMAIL_RE.test(values.email.trim())) {
      next.email = "Podaj prawidłowy adres e-mail.";
    }
    if (type !== "loan" && !values.message.trim()) {
      next.message = "Opisz krótko, czego dotyczy zgłoszenie.";
    }
    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      setStatus("sending");
      await submitInquiry({
        type,
        name: values.name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        itemCategory: values.itemCategory,
        message: values.message.trim(),
        source,
      });
      setStatus("sent");
    } catch (error) {
      setStatus("idle");
      setFormError(
        error?.response?.data?.message ||
          "Nie udało się wysłać zgłoszenia. Spróbuj ponownie lub zadzwoń do nas."
      );
    }
  };

  if (status === "sent") {
    return (
      <Card>
        <Success>
          <h3>Dziękujemy — zgłoszenie przyjęte</h3>
          <p>
            Odezwiemy się na podany kontakt, zwykle jeszcze tego samego dnia
            roboczego. Jeśli sprawa jest pilna, zadzwoń bezpośrednio do oddziału.
          </p>
          <ResetButton
            type="button"
            onClick={() => {
              setValues({ name: "", phone: "", email: "", itemCategory: "", message: "" });
              setStatus("idle");
            }}
          >
            Wyślij kolejne zgłoszenie
          </ResetButton>
        </Success>
      </Card>
    );
  }

  return (
    <Card>
      <Intro>
        <h2>{title}</h2>
        <p>{lead}</p>
      </Intro>

      <TypeRow role="group" aria-label="Rodzaj zgłoszenia">
        {REQUEST_TYPES.map((option) => (
          <TypeChip
            key={option.id}
            type="button"
            $active={type === option.id}
            aria-pressed={type === option.id}
            onClick={() => setType(option.id)}
          >
            {option.label}
          </TypeChip>
        ))}
      </TypeRow>

      <form onSubmit={handleSubmit} noValidate>
        <Grid>
          <Field>
            <FieldLabel>Imię (opcjonalnie)</FieldLabel>
            <TextInput
              type="text"
              name="name"
              autoComplete="name"
              placeholder="np. Anna"
              value={values.name}
              onChange={setField("name")}
            />
          </Field>
          <Field>
            <FieldLabel>Telefon</FieldLabel>
            <TextInput
              type="tel"
              name="phone"
              autoComplete="tel"
              inputMode="tel"
              placeholder="np. 515 671 666"
              value={values.phone}
              $invalid={Boolean(errors.phone)}
              aria-invalid={Boolean(errors.phone)}
              onChange={setField("phone")}
            />
            {errors.phone && <FieldError role="alert">{errors.phone}</FieldError>}
          </Field>
          <Field>
            <FieldLabel>E-mail</FieldLabel>
            <TextInput
              type="email"
              name="email"
              autoComplete="email"
              placeholder="np. anna@example.com"
              value={values.email}
              $invalid={Boolean(errors.email)}
              aria-invalid={Boolean(errors.email)}
              onChange={setField("email")}
            />
            {errors.email && <FieldError role="alert">{errors.email}</FieldError>}
          </Field>
          <Field>
            <FieldLabel>Czego dotyczy</FieldLabel>
            <Select value={values.itemCategory} onChange={setField("itemCategory")}>
              <option value="">Wybierz kategorię</option>
              {ITEM_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </Field>
          <Field $full>
            <FieldLabel>Opis przedmiotu / wiadomość</FieldLabel>
            <TextArea
              name="message"
              placeholder="np. Pierścionek złoty, próba 585, około 3 gramy, stan bardzo dobry."
              value={values.message}
              $invalid={Boolean(errors.message)}
              aria-invalid={Boolean(errors.message)}
              onChange={setField("message")}
            />
            {errors.message && <FieldError role="alert">{errors.message}</FieldError>}
          </Field>
        </Grid>

        <Submit type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Wysyłanie…" : "Wyślij zgłoszenie"}
        </Submit>

        {formError && (
          <Feedback $tone="error" role="alert">
            {formError}
          </Feedback>
        )}

        <Privacy>
          Wysyłając zgłoszenie zgadzasz się na kontakt w tej sprawie. Dane
          przetwarzamy zgodnie z <a href="/legal/privacy">Polityką prywatności</a>.
        </Privacy>
      </form>
    </Card>
  );
}
