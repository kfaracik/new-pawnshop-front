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
import { useMyOrders } from "services/api/orderApi";
import { useMyAuctionParticipations } from "services/api/auctionApi";

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

const OrdersSection = styled.section`
  margin-top: 16px;
  border: 1px solid #efefef;
  border-radius: 12px;
  overflow: hidden;
`;

const OrdersHeader = styled.div`
  background: #fafafa;
  border-bottom: 1px solid #efefef;
  padding: 10px 12px;
  font-weight: 700;
  color: ${colors.textPrimary};
`;

const OrdersBody = styled.div`
  padding: 10px 12px;
  display: grid;
  gap: 10px;
`;

const OrderItem = styled.div`
  border: 1px solid #efefef;
  border-radius: 10px;
  padding: 10px;
  background: #fff;
`;

const OrderMeta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 0.9rem;
  color: ${colors.textSecondary};

  strong {
    color: ${colors.textPrimary};
  }
`;

const AccountPage = () => {
  const { data, error, isLoading } = useUserData();
  const { data: myOrders = [] } = useMyOrders();
  const { data: myAuctionParticipations = [] } = useMyAuctionParticipations(!!data);
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = useCallback(() => {
    clearAuthToken();
    queryClient.removeQueries({ queryKey: ["userData"] });
    queryClient.removeQueries({ queryKey: ["myOrders"] });
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

          <OrdersSection>
            <OrdersHeader>Historia zamówień</OrdersHeader>
            <OrdersBody>
              {myOrders.length === 0 ? (
                <EmptyState>
                  <FaRegSadTear size={36} color={colors.grayDark} />
                  <p>Brak historii zamówień.</p>
                </EmptyState>
              ) : (
                myOrders.map((order) => (
                  <OrderItem key={order._id}>
                    <OrderMeta>
                      <span>
                        <strong>Data:</strong> {new Date(order.createdAt).toLocaleString()}
                      </span>
                      <span>
                        <strong>Status:</strong> {order.orderStatus || "pending_payment"}
                      </span>
                      <span>
                        <strong>Płatność:</strong> {order.paymentStatus || "unpaid"}
                      </span>
                      <span>
                        <strong>Suma:</strong> {Number(order.totalAmount || 0).toFixed(2)} PLN
                      </span>
                    </OrderMeta>
                  </OrderItem>
                ))
              )}
            </OrdersBody>
          </OrdersSection>

          <OrdersSection>
            <OrdersHeader>Moje licytacje</OrdersHeader>
            <OrdersBody>
              {myAuctionParticipations.length === 0 ? (
                <EmptyState>
                  <FaRegSadTear size={36} color={colors.grayDark} />
                  <p>Nie brałeś jeszcze udziału w żadnej licytacji.</p>
                </EmptyState>
              ) : (
                myAuctionParticipations.map((auction) => (
                  <OrderItem key={auction._id}>
                    <OrderMeta>
                      <span>
                        <strong>Produkt:</strong> {auction.productId?.title || "-"}
                      </span>
                      <span>
                        <strong>Status:</strong> {auction.status || "-"}
                      </span>
                      <span>
                        <strong>Twoja najwyższa oferta:</strong>{" "}
                        {Number(auction.myHighestBid || 0).toFixed(2)} PLN
                      </span>
                      <span>
                        <strong>Aktualna cena:</strong>{" "}
                        {Number(auction.currentPrice || 0).toFixed(2)} PLN
                      </span>
                    </OrderMeta>
                  </OrderItem>
                ))
              )}
            </OrdersBody>
          </OrdersSection>
        </ProfileCard>
      </AccountWrapper>
    </PageContainer>
  );
};

export default AccountPage;
