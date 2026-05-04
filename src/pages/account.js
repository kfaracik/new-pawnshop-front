import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import { buttonBaseStyle, buttonSecondaryStyle } from "components/Button";
import PageContainer from "components/PageContainer";
import SeoHead from "components/SeoHead";
import { useUserData } from "services/api/useUserApi";
import AuthForm from "components/AuthForm";
import { FaRegUserCircle } from "react-icons/fa";
import { FiList } from "react-icons/fi";
import { clearAuthToken } from "utils/authToken";
import colors from "styles/colors";
import { useMyOrders } from "services/api/orderApi";

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
    ${buttonBaseStyle}
    ${buttonSecondaryStyle}
    min-height: 40px;
    font-size: 0.92rem;
    font-weight: 600;
    border-radius: 999px;
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

const ORDER_STATUS_LABELS = {
  pending_payment: "Oczekuje na płatność",
  paid: "Opłacone",
  completed: "Zrealizowane",
  canceled: "Anulowane",
  failed: "Nieudane",
};

const PAYMENT_STATUS_LABELS = {
  unpaid: "Nieopłacone",
  pending: "W trakcie",
  paid: "Opłacone",
  failed: "Nieudane",
  canceled: "Anulowane",
  refunded: "Zwrócone",
};

const DELIVERY_LABELS = {
  courier_standard: "Kurier standard",
  parcel_locker: "Paczkomat / automat odbioru",
  store_pickup: "Odbiór osobisty",
};

const PAYMENT_METHOD_LABELS = {
  bank_transfer: "Przelew tradycyjny",
  stripe_card: "Stripe / karta / BLIK",
};

const OrderProducts = styled.div`
  margin-top: 8px;
  font-size: 0.88rem;
  color: ${colors.textSecondary};
  display: grid;
  gap: 4px;
`;

const AccountPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { data, error, isLoading } = useUserData();
  const { data: myOrders = [] } = useMyOrders();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  if (!isMounted) {
    return (
      <PageContainer loading>
        <SeoHead
          title="Konto użytkownika | Nowy Lombard"
          description="Logowanie i panel użytkownika."
          path="/account"
          noindex
        />
      </PageContainer>
    );
  }

  if (!data) {
    return (
      <PageContainer loading={isLoading}>
        <SeoHead
          title="Konto użytkownika | Nowy Lombard"
          description="Logowanie i panel użytkownika."
          path="/account"
          noindex
        />
        <AccountWrapper>
          <AuthForm />
        </AccountWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer loading={isLoading}>
      <SeoHead
        title="Twoje konto | Nowy Lombard"
        description="Panel użytkownika i historia zamówień."
        path="/account"
        noindex
      />
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
                  <FiList size={36} color={colors.grayDark} />
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
                        <strong>Status:</strong>{" "}
                        {ORDER_STATUS_LABELS[order.orderStatus] || order.orderStatus || "-"}
                      </span>
                      <span>
                        <strong>Płatność:</strong>{" "}
                        {PAYMENT_STATUS_LABELS[order.paymentStatus] || order.paymentStatus || "-"}
                      </span>
                      <span>
                        <strong>Suma:</strong> {Number(order.grandTotal || order.totalAmount || 0).toFixed(2)} PLN
                      </span>
                      <span>
                        <strong>Dostawa:</strong>{" "}
                        {DELIVERY_LABELS[order.deliveryMethod] || order.deliveryMethod || "-"}
                      </span>
                      <span>
                        <strong>Metoda płatności:</strong>{" "}
                        {PAYMENT_METHOD_LABELS[order.paymentMethod] || order.paymentMethod || "-"}
                      </span>
                    </OrderMeta>
                    <OrderProducts>
                      <span>
                        Dostawa: {Number(order.deliveryPrice || 0).toFixed(2)} PLN, ETA:{" "}
                        {order.deliveryEtaLabel || "-"}
                      </span>
                      {order.paymentSessionStatus && (
                        <span>Stan checkoutu: {order.paymentSessionStatus}</span>
                      )}
                    </OrderProducts>
                    <OrderProducts>
                      {(order.products || []).length > 0 ? (
                        (order.products || []).map((product, index) => (
                          <span key={`${order._id}-product-${index}`}>
                            {product.name} x{product.quantity}
                          </span>
                        ))
                      ) : (
                        <span>Brak pozycji produktów.</span>
                      )}
                    </OrderProducts>
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
