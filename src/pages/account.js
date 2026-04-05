import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import PageContainer from "components/PageContainer";
import { useUserData } from "services/api/useUserApi";
import AuthForm from "components/AuthForm";
import { FaRegSadTear, FaRegUserCircle } from "react-icons/fa";
import { clearAuthToken } from "utils/authToken";
import colors from "styles/colors";

const AccountWrapper = styled.section`
  margin: 24px auto 40px;
`;

const ProfileCard = styled.div`
  background: ${colors.backgroundPaper};
  border: 1px solid #e8e8e8;
  border-radius: 14px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 18px;
  flex-wrap: wrap;

  h1 {
    margin: 0;
    font-size: 1.45rem;
    color: ${colors.textPrimary};
  }

  button {
    font-size: 0.92rem;
    color: ${colors.primaryDark};
    background: none;
    border: 1px solid #dfd3aa;
    border-radius: 999px;
    padding: 8px 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(201, 162, 39, 0.1);
      border-color: ${colors.primary};
    }
  }
`;

const UserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid #efefef;
  border-radius: 10px;
  background: #fbfbfb;
  color: ${colors.textPrimary};
`;

const UserMeta = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  span {
    font-size: 0.82rem;
    color: ${colors.textSecondary};
  }

  strong {
    font-size: 1rem;
    color: ${colors.textPrimary};
    margin-top: 2px;
  }
`;

const EmptyState = styled.div`
  margin-top: 18px;
  padding: 22px;
  border: 1px dashed #ddd;
  border-radius: 12px;
  text-align: center;
  color: ${colors.textSecondary};

  p {
    margin: 8px 0 0;
    font-size: 0.95rem;
  }
`;

const AccountPage = () => {
  const { data, error, isLoading } = useUserData();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = useCallback(() => {
    clearAuthToken();
    queryClient.removeQueries({ queryKey: ["userData"] });
    router.replace("/account");
  }, [queryClient, router]);

  useEffect(() => {
    if (error?.response?.status === 401) {
      handleLogout();
    }
  }, [error, handleLogout]);

  if (!data) {
    return (
      <PageContainer loading={isLoading}>
        <AccountWrapper>
          <AuthForm />
        </AccountWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer loading={isLoading}>
      <AccountWrapper>
        <ProfileCard>
          <Header>
            <h1>Twoje konto</h1>
            <button onClick={handleLogout}>Wyloguj się</button>
          </Header>
          <UserRow>
            <FaRegUserCircle size={28} color={colors.primaryDark} />
            <UserMeta>
              <span>Adres e-mail</span>
              <strong>{data.email}</strong>
            </UserMeta>
          </UserRow>
          <EmptyState>
            <FaRegSadTear size={36} color={colors.grayDark} />
            <p>Brak historii zamówień.</p>
          </EmptyState>
        </ProfileCard>
      </AccountWrapper>
    </PageContainer>
  );
};

export default AccountPage;
