import React, { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import {
  buttonBaseStyle,
  buttonGhostStyle,
  buttonPrimaryStyle,
} from "components/Button";
import { registerUser, loginUser } from "services/api/authApi";
import { useQueryClient } from "@tanstack/react-query";
import colors from "styles/colors";

const Card = styled.div`
  width: min(100%, 460px);
  margin: 16px auto;
  background: ${colors.backgroundPaper};
  border: 1px solid #e8e8e8;
  border-radius: 14px;
  padding: 22px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
`;

const Header = styled.div`
  margin-bottom: 14px;

  h2 {
    margin: 0;
    font-size: 1.45rem;
    color: ${colors.textPrimary};
  }

  p {
    margin: 6px 0 0;
    color: ${colors.textSecondary};
    font-size: 0.95rem;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 0.9rem;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 1rem;
  background: #fff;
  color: ${colors.textPrimary};
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;

  &:focus {
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.16);
  }
`;

const StyledButton = styled.button`
  ${buttonBaseStyle}
  ${buttonPrimaryStyle}
  width: 100%;
  margin-top: 0.25rem;
  margin-bottom: 0.85rem;
  font-size: 1rem;
`;

const ToggleButton = styled.button`
  ${buttonBaseStyle}
  ${buttonGhostStyle}
  min-height: 38px;
  justify-content: center;
  padding: 0;
  font-size: 0.92rem;
  font-weight: 600;
  text-decoration: underline;
  margin-top: 0.5rem;
`;

const FormFeedback = styled.p`
  width: 100%;
  margin: -2px 0 0.9rem;
  font-size: 0.88rem;
  color: ${colors.error};
  text-align: left;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const requestData = { email, password };

    try {
      if (isLogin) {
        await loginUser(requestData);
      } else {
        await registerUser(requestData);
      }

      await queryClient.invalidateQueries({ queryKey: ["userData"] });
      router.replace("/account");
    } catch (error) {
      setErrorMessage(error.message || "Wystąpił nieoczekiwany błąd.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <Header>
        <h2>{isLogin ? "Zaloguj się" : "Załóż konto"}</h2>
        <p>
          {isLogin
            ? "Uzyskaj dostęp do swojego konta."
            : "Rejestracja zajmie tylko chwilę."}
        </p>
      </Header>
      <Form onSubmit={handleSubmit}>
        <StyledInput
          type="email"
          autoComplete="email"
          placeholder="Adres e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <StyledInput
          type="password"
          autoComplete={isLogin ? "current-password" : "new-password"}
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMessage && <FormFeedback>{errorMessage}</FormFeedback>}
        <StyledButton type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Proszę czekać..."
            : isLogin
              ? "Zaloguj się"
              : "Zarejestruj się"}
        </StyledButton>
        <ToggleButton
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setErrorMessage("");
          }}
        >
          {isLogin ? "Nie masz konta? Zarejestruj się" : "Masz konto? Zaloguj się"}
        </ToggleButton>
      </Form>
    </Card>
  );
};

export default AuthForm;
