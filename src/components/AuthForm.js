import React, { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { registerUser, loginUser } from "services/api/authApi";

const StyledInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  outline: none;

  &:focus {
    border-color: #e74c3c;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  background-color: #ee7668;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const ToggleButton = styled.button`
  background: none;
  color: #e74c3c;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  text-decoration: underline;
  margin-top: 0.5rem;

  &:hover {
    opacity: 0.7;
  }
`;

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = { email, password };

    try {
      const response = isLogin
        ? await loginUser(requestData)
        : await registerUser(requestData);

      document.cookie = `token=${response.token}; path=/`;
      alert(response.message);
      router.push("/");
    } catch (error) {
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <StyledInput
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <StyledInput
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <StyledButton type="submit">
        {isLogin ? "Login" : "Register"}
      </StyledButton>
      <ToggleButton onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Go to Register" : "Go to Login"}
      </ToggleButton>
    </form>
  );
};

export default AuthForm;
