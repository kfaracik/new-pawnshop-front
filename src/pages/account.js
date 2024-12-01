import React, { useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import PageContainer from "components/PageContainer";
import { useUserData } from "services/api/useUserApi";
import AuthForm from "components/AuthForm";
import { FaRegSadTear } from "react-icons/fa";
import { clearAuthToken } from "utils/cookies";

const ProfileWrapper = styled.div`
  text-align: center;
  margin-top: 3rem;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 2rem;
    font-weight: bold;
    color: #212529;
  }

  button {
    font-size: 1rem;
    color: #6c757d;
    background: none;
    border: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const DetailsWrapper = styled.div`
  margin-top: 1.5rem;
  margin-top: 50px;
  padding: 1.5rem;
  background-color: #adb5bd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const IconWrapper = styled.div`
  font-size: 3.5rem;
  color: #495057;
  margin: 1.5rem 0;
`;

const StyledParagraph = styled.p`
  font-size: 1.25rem;
  color: #495057;
  font-weight: 500;
  width: 40vh;
`;

const AccountPage = () => {
  const { data, error, isLoading } = useUserData();
  const router = useRouter();

  const handleLogout = () => {
    clearAuthToken();
    router.reload();
  };

  useEffect(() => {
    if (error?.response?.status === 401) {
      handleLogout();
    }
  }, [error]);

  if (!data) {
    return (
      <PageContainer loading={isLoading}>
        <AuthForm />
      </PageContainer>
    );
  }

  return (
    <PageContainer loading={isLoading}>
      <ProfileWrapper>
        <Header>
          <h1>User Profile </h1>
          <button onClick={handleLogout}>Logout</button>
        </Header>
        <p>Email: {data.email}</p>
        <DetailsWrapper>
          <IconWrapper>
            <FaRegSadTear />
          </IconWrapper>
          <StyledParagraph>No order history</StyledParagraph>
        </DetailsWrapper>
      </ProfileWrapper>
    </PageContainer>
  );
};

export default AccountPage;
