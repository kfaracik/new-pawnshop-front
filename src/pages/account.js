import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import {
  buttonBaseStyle,
  buttonPrimaryStyle,
  buttonSecondaryStyle,
} from "components/Button";
import PageContainer from "components/PageContainer";
import SeoHead from "components/SeoHead";
import { useUserData } from "services/api/useUserApi";
import AuthForm from "components/AuthForm";
import { FiList, FiUser, FiSettings, FiShield } from "react-icons/fi";
import { logoutUser } from "services/api/authApi";
import { createCheckoutSession } from "services/api/orderApi";
import {
  useProfile,
  updateProfile,
  changePassword,
  changeEmail,
  deleteAccount,
} from "services/api/profileApi";
import colors from "styles/colors";
import { useMyOrders } from "services/api/orderApi";

const AccountWrapper = styled.section`
  margin: 24px auto 40px;
  max-width: 820px;
`;

const PILL_TONES = {
  green: { bg: "#e7f6ec", fg: "#1e7d43" },
  amber: { bg: "#fff3d6", fg: "#8a6100" },
  red: { bg: "#fdecec", fg: "#b3261e" },
  gold: { bg: "#fff8e8", fg: "#8E7213" },
  gray: { bg: "#eef0f2", fg: "#4a4a4a" },
};

const orderStatusTone = (status) =>
  ({
    paid: "green",
    completed: "gold",
    pending_payment: "amber",
    canceled: "gray",
    failed: "red",
  })[status] || "gray";

const paymentStatusTone = (status) =>
  ({
    paid: "green",
    pending: "amber",
    unpaid: "gray",
    failed: "red",
    canceled: "gray",
    refunded: "gold",
  })[status] || "gray";

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
  margin-bottom: 16px;
  flex-wrap: wrap;

  h1 {
    margin: 0;
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 800;
    letter-spacing: -0.01em;
    line-height: 1.2;
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

const EmailLine = styled.p`
  margin: -6px 0 14px;
  font-size: 0.92rem;
  color: ${colors.textSecondary};

  strong {
    color: ${colors.textPrimary};
  }
`;

const TabBar = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  border-bottom: 1px solid #eee;
  margin-bottom: 18px;
`;

const Tab = styled.button`
  ${buttonBaseStyle}
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 40px;
  padding: 8px 14px;
  border: 0;
  border-bottom: 2px solid
    ${(props) => (props.$active ? colors.primary : "transparent")};
  border-radius: 8px 8px 0 0;
  background: ${(props) => (props.$active ? "#fff8e8" : "transparent")};
  color: ${(props) => (props.$active ? colors.primaryDark : colors.textSecondary)};
  font-size: 0.92rem;
  font-weight: ${(props) => (props.$active ? 700 : 500)};

  svg {
    width: 16px;
    height: 16px;
  }
`;

const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 560px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Field = styled.label`
  display: grid;
  gap: 6px;
  grid-column: ${(props) => (props.$full ? "1 / -1" : "auto")};
`;

const FieldLabel = styled.span`
  font-size: 0.82rem;
  font-weight: 600;
  color: ${colors.textSecondary};
`;

const TextInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #e2ddcf;
  border-radius: 10px;
  background: #faf9f6;
  color: ${colors.textPrimary};
  font-size: 0.98rem;
  outline: none;
  transition: border-color 0.15s, background 0.15s;

  &:focus {
    border-color: ${colors.primary};
    background: #fff;
  }
`;

const PrimaryButton = styled.button`
  ${buttonBaseStyle}
  ${buttonPrimaryStyle}
  min-height: 46px;
  font-weight: 700;
  border-radius: 999px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled.button`
  ${buttonBaseStyle}
  ${buttonSecondaryStyle}
  min-height: 44px;
  font-weight: 600;
  border-radius: 999px;
`;

const DangerButton = styled.button`
  ${buttonBaseStyle}
  min-height: 46px;
  padding: 0 20px;
  border: 1px solid #e4b4b0;
  border-radius: 999px;
  background: #fff;
  color: #b3261e;
  font-weight: 700;

  &:hover:not(:disabled) {
    background: #fdecec;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

const Actions = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Notice = styled.div`
  margin: 4px 0 14px;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 0.9rem;
  border: 1px solid
    ${(props) => (props.$tone === "error" ? "#f0d4d4" : "#cfe9d6")};
  background: ${(props) => (props.$tone === "error" ? "#fff7f7" : "#f0faf3")};
  color: ${(props) => (props.$tone === "error" ? "#b3261e" : "#1e7d43")};
`;

const SubSection = styled.section`
  padding: 18px 0;
  border-top: 1px solid #f0f0f0;

  &:first-of-type {
    border-top: 0;
    padding-top: 4px;
  }

  h2 {
    margin: 0 0 4px;
    font-size: 1.05rem;
    color: ${colors.textPrimary};
  }

  p.hint {
    margin: 0 0 14px;
    font-size: 0.88rem;
    color: ${colors.textSecondary};
  }
`;

const DangerZone = styled(SubSection)`
  border: 1px solid #f0d4d4;
  border-radius: 12px;
  background: #fffafa;
  padding: 18px;
  margin-top: 8px;

  h2 {
    color: #b3261e;
  }
`;

const CheckRow = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.88rem;
  color: ${colors.textSecondary};
  margin: 4px 0 14px;
`;

const EmptyState = styled.div`
  padding: 30px 20px;
  border: 1px dashed #ddd;
  border-radius: 12px;
  text-align: center;
  color: ${colors.textSecondary};

  p {
    margin: 8px 0 0;
    font-size: 0.95rem;
  }
`;

const OrderItem = styled.div`
  border: 1px solid #efefef;
  border-radius: 12px;
  padding: 14px;
  background: #fff;
  margin-bottom: 12px;
`;

const OrderTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
`;

const OrderDate = styled.div`
  font-size: 0.82rem;
  color: ${colors.textSecondary};

  strong {
    display: block;
    margin-top: 2px;
    font-size: 1.02rem;
    color: ${colors.textPrimary};
  }
`;

const OrderPills = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const StatusPill = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 11px;
  border-radius: 999px;
  font-size: 0.74rem;
  font-weight: 700;
  background: ${(props) => (PILL_TONES[props.$tone] || PILL_TONES.gray).bg};
  color: ${(props) => (PILL_TONES[props.$tone] || PILL_TONES.gray).fg};
`;

const OrderDetailGrid = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 8px 16px;
  font-size: 0.86rem;
  color: ${colors.textSecondary};

  strong {
    display: block;
    color: ${colors.textPrimary};
    font-weight: 600;
    margin-top: 1px;
  }
`;

const OrderProducts = styled.div`
  margin-top: 10px;
  font-size: 0.88rem;
  color: ${colors.textSecondary};
  display: grid;
  gap: 4px;
`;

const RepayRow = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
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
  stripe_card: "Płatność online Stripe",
};

const parseError = (error, fallback) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  fallback;

const emptyProfileForm = {
  name: "",
  phone: "",
  streetAddress: "",
  city: "",
  postalCode: "",
  country: "",
};

const TABS = [
  { id: "profile", label: "Profil", icon: FiUser },
  { id: "orders", label: "Zamówienia", icon: FiList },
  { id: "settings", label: "Ustawienia", icon: FiSettings },
  { id: "danger", label: "Prywatność", icon: FiShield },
];

const ProfileTab = ({ profile }) => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(emptyProfileForm);
  const [message, setMessage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setForm({
      name: profile.name || "",
      phone: profile.phone || "",
      streetAddress: profile.address?.streetAddress || "",
      city: profile.address?.city || "",
      postalCode: profile.address?.postalCode || "",
      country: profile.address?.country || "",
    });
  }, [profile]);

  const update = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));

  const onSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);
    setIsSaving(true);
    try {
      await updateProfile({
        name: form.name,
        phone: form.phone,
        address: {
          streetAddress: form.streetAddress,
          city: form.city,
          postalCode: form.postalCode,
          country: form.country,
        },
      });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setMessage({ tone: "success", text: "Dane zostały zapisane." });
    } catch (error) {
      setMessage({ tone: "error", text: parseError(error, "Nie udało się zapisać danych.") });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {message && <Notice $tone={message.tone}>{message.text}</Notice>}
      <p className="hint" style={{ color: colors.textSecondary, marginTop: 0 }}>
        Te dane podpowiemy przy składaniu zamówienia.
      </p>
      <FieldsGrid>
        <Field $full>
          <FieldLabel>Imię i nazwisko</FieldLabel>
          <TextInput value={form.name} onChange={update("name")} placeholder="np. Jan Kowalski" />
        </Field>
        <Field>
          <FieldLabel>Telefon</FieldLabel>
          <TextInput value={form.phone} onChange={update("phone")} placeholder="np. +48 600 100 200" />
        </Field>
        <Field>
          <FieldLabel>Kraj</FieldLabel>
          <TextInput value={form.country} onChange={update("country")} placeholder="Polska" />
        </Field>
        <Field $full>
          <FieldLabel>Adres (ulica i numer)</FieldLabel>
          <TextInput value={form.streetAddress} onChange={update("streetAddress")} placeholder="ul. Przykładowa 1" />
        </Field>
        <Field>
          <FieldLabel>Miasto</FieldLabel>
          <TextInput value={form.city} onChange={update("city")} placeholder="Warszawa" />
        </Field>
        <Field>
          <FieldLabel>Kod pocztowy</FieldLabel>
          <TextInput value={form.postalCode} onChange={update("postalCode")} placeholder="00-001" />
        </Field>
      </FieldsGrid>
      <Actions>
        <PrimaryButton type="submit" disabled={isSaving}>
          {isSaving ? "Zapisywanie…" : "Zapisz dane"}
        </PrimaryButton>
      </Actions>
    </form>
  );
};

const OrdersTab = ({ orders }) => {
  const [payingId, setPayingId] = useState("");
  const [error, setError] = useState("");

  const repay = async (orderId) => {
    setError("");
    setPayingId(orderId);
    try {
      const { url } = await createCheckoutSession(orderId);
      if (url) {
        window.location.href = url;
        return;
      }
      setError("Nie udało się rozpocząć płatności. Spróbuj ponownie za chwilę.");
    } catch (requestError) {
      setError(parseError(requestError, "Nie udało się rozpocząć płatności."));
    } finally {
      setPayingId("");
    }
  };

  if (!orders.length) {
    return (
      <EmptyState>
        <FiList size={34} color={colors.grayDark} />
        <p>Brak historii zamówień.</p>
      </EmptyState>
    );
  }

  return (
    <>
      {error && <Notice $tone="error">{error}</Notice>}
      {orders.map((order) => {
        const canRepay =
          order.paymentMethod === "stripe_card" &&
          ["unpaid", "pending", "failed"].includes(order.paymentStatus) &&
          !["completed", "canceled"].includes(order.orderStatus);

        return (
          <OrderItem key={order._id}>
            <OrderTop>
              <OrderDate>
                Zamówienie
                <strong>
                  {new Date(order.createdAt).toLocaleDateString("pl-PL", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </strong>
              </OrderDate>
              <OrderPills>
                <StatusPill $tone={orderStatusTone(order.orderStatus)}>
                  {ORDER_STATUS_LABELS[order.orderStatus] || order.orderStatus || "-"}
                </StatusPill>
                <StatusPill $tone={paymentStatusTone(order.paymentStatus)}>
                  {PAYMENT_STATUS_LABELS[order.paymentStatus] || order.paymentStatus || "-"}
                </StatusPill>
              </OrderPills>
            </OrderTop>
            <OrderDetailGrid>
              <span>
                Suma
                <strong>
                  {Number(order.grandTotal || order.totalAmount || 0).toFixed(2)} zł
                </strong>
              </span>
              <span>
                Dostawa
                <strong>
                  {DELIVERY_LABELS[order.deliveryMethod] || order.deliveryMethod || "-"}
                </strong>
              </span>
              <span>
                Metoda płatności
                <strong>
                  {PAYMENT_METHOD_LABELS[order.paymentMethod] || order.paymentMethod || "-"}
                </strong>
              </span>
            </OrderDetailGrid>
            <OrderProducts>
              {(order.products || []).length > 0 ? (
                (order.products || []).map((product, index) => (
                  <span key={`${order._id}-product-${index}`}>
                    {product.name} × {product.quantity}
                  </span>
                ))
              ) : (
                <span>Brak pozycji produktów.</span>
              )}
            </OrderProducts>
            {canRepay && (
              <RepayRow>
                <PrimaryButton
                  type="button"
                  onClick={() => repay(order._id)}
                  disabled={payingId === order._id}
                >
                  {payingId === order._id ? "Przekierowanie…" : "Zapłać teraz"}
                </PrimaryButton>
              </RepayRow>
            )}
          </OrderItem>
        );
      })}
    </>
  );
};

const SettingsTab = ({ email, onEmailChanged, onLoggedOutEverywhere }) => {
  const queryClient = useQueryClient();
  const [emailForm, setEmailForm] = useState({ newEmail: "", currentPassword: "" });
  const [emailMsg, setEmailMsg] = useState(null);
  const [emailSaving, setEmailSaving] = useState(false);

  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "", confirm: "" });
  const [pwMsg, setPwMsg] = useState(null);
  const [pwSaving, setPwSaving] = useState(false);

  const submitEmail = async (event) => {
    event.preventDefault();
    setEmailMsg(null);
    setEmailSaving(true);
    try {
      await changeEmail(emailForm);
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setEmailForm({ newEmail: "", currentPassword: "" });
      setEmailMsg({ tone: "success", text: "Adres e-mail został zmieniony." });
      onEmailChanged?.();
    } catch (error) {
      setEmailMsg({ tone: "error", text: parseError(error, "Nie udało się zmienić adresu e-mail.") });
    } finally {
      setEmailSaving(false);
    }
  };

  const submitPassword = async (event) => {
    event.preventDefault();
    setPwMsg(null);
    if (pwForm.newPassword !== pwForm.confirm) {
      setPwMsg({ tone: "error", text: "Nowe hasła nie są takie same." });
      return;
    }
    setPwSaving(true);
    try {
      await changePassword({
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword,
      });
      setPwForm({ currentPassword: "", newPassword: "", confirm: "" });
      setPwMsg({ tone: "success", text: "Hasło zostało zmienione. Wylogowaliśmy pozostałe urządzenia." });
    } catch (error) {
      setPwMsg({ tone: "error", text: parseError(error, "Nie udało się zmienić hasła.") });
    } finally {
      setPwSaving(false);
    }
  };

  return (
    <>
      <SubSection>
        <h2>Adres e-mail</h2>
        <p className="hint">Obecny: <strong>{email}</strong></p>
        {emailMsg && <Notice $tone={emailMsg.tone}>{emailMsg.text}</Notice>}
        <form onSubmit={submitEmail}>
          <FieldsGrid>
            <Field>
              <FieldLabel>Nowy adres e-mail</FieldLabel>
              <TextInput
                type="email"
                required
                value={emailForm.newEmail}
                onChange={(e) => setEmailForm((f) => ({ ...f, newEmail: e.target.value }))}
              />
            </Field>
            <Field>
              <FieldLabel>Aktualne hasło</FieldLabel>
              <TextInput
                type="password"
                required
                value={emailForm.currentPassword}
                onChange={(e) => setEmailForm((f) => ({ ...f, currentPassword: e.target.value }))}
              />
            </Field>
          </FieldsGrid>
          <Actions>
            <PrimaryButton type="submit" disabled={emailSaving}>
              {emailSaving ? "Zapisywanie…" : "Zmień e-mail"}
            </PrimaryButton>
          </Actions>
        </form>
      </SubSection>

      <SubSection>
        <h2>Hasło</h2>
        <p className="hint">Zmiana hasła wyloguje pozostałe urządzenia.</p>
        {pwMsg && <Notice $tone={pwMsg.tone}>{pwMsg.text}</Notice>}
        <form onSubmit={submitPassword}>
          <FieldsGrid>
            <Field $full>
              <FieldLabel>Aktualne hasło</FieldLabel>
              <TextInput
                type="password"
                required
                value={pwForm.currentPassword}
                onChange={(e) => setPwForm((f) => ({ ...f, currentPassword: e.target.value }))}
              />
            </Field>
            <Field>
              <FieldLabel>Nowe hasło</FieldLabel>
              <TextInput
                type="password"
                required
                value={pwForm.newPassword}
                onChange={(e) => setPwForm((f) => ({ ...f, newPassword: e.target.value }))}
              />
            </Field>
            <Field>
              <FieldLabel>Powtórz nowe hasło</FieldLabel>
              <TextInput
                type="password"
                required
                value={pwForm.confirm}
                onChange={(e) => setPwForm((f) => ({ ...f, confirm: e.target.value }))}
              />
            </Field>
          </FieldsGrid>
          <Actions>
            <PrimaryButton type="submit" disabled={pwSaving}>
              {pwSaving ? "Zapisywanie…" : "Zmień hasło"}
            </PrimaryButton>
          </Actions>
        </form>
      </SubSection>

      <SubSection>
        <h2>Sesje</h2>
        <p className="hint">
          Wyloguj się ze wszystkich urządzeń, na których jesteś zalogowany.
        </p>
        <SecondaryButton type="button" onClick={onLoggedOutEverywhere}>
          Wyloguj ze wszystkich urządzeń
        </SecondaryButton>
      </SubSection>
    </>
  );
};

const DangerTab = ({ onDeleted }) => {
  const [password, setPassword] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [message, setMessage] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setMessage(null);
    setIsDeleting(true);
    try {
      await deleteAccount({ currentPassword: password });
      onDeleted?.();
    } catch (error) {
      setMessage({ tone: "error", text: parseError(error, "Nie udało się usunąć konta.") });
      setIsDeleting(false);
    }
  };

  return (
    <DangerZone>
      <h2>Usunięcie konta</h2>
      <p className="hint">
        Trwałe usunięcie konta i danych logowania (zgodnie z RODO). Operacji nie
        można cofnąć. Zamówienia pozostają w systemie na potrzeby rozliczeń i
        obowiązków podatkowych.
      </p>
      {message && <Notice $tone={message.tone}>{message.text}</Notice>}
      <form onSubmit={submit}>
        <FieldsGrid>
          <Field $full>
            <FieldLabel>Potwierdź hasłem</FieldLabel>
            <TextInput
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
        </FieldsGrid>
        <CheckRow>
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          Rozumiem, że usunięcie konta jest nieodwracalne.
        </CheckRow>
        <DangerButton type="submit" disabled={!confirmed || !password || isDeleting}>
          {isDeleting ? "Usuwanie…" : "Usuń konto na stałe"}
        </DangerButton>
      </form>
    </DangerZone>
  );
};

const AccountPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const { data, error, isLoading } = useUserData();
  const isAuthed = Boolean(data);
  const { data: myOrders = [] } = useMyOrders(isAuthed);
  const { data: profile } = useProfile(isAuthed);
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const clearSession = useCallback(() => {
    queryClient.removeQueries({ queryKey: ["userData"] });
    queryClient.removeQueries({ queryKey: ["myOrders"] });
    queryClient.removeQueries({ queryKey: ["profile"] });
    router.replace("/account");
  }, [queryClient, router]);

  const handleLogout = useCallback(async () => {
    await logoutUser();
    clearSession();
  }, [clearSession]);

  const handleDeleted = useCallback(() => {
    clearSession();
    router.replace("/?deleted=1");
  }, [clearSession, router]);

  useEffect(() => {
    if (data && error?.response?.status === 401) {
      clearSession();
    }
  }, [data, error, clearSession]);

  useEffect(() => {
    const onLogout = () => clearSession();
    window.addEventListener("auth:logout", onLogout);
    return () => window.removeEventListener("auth:logout", onLogout);
  }, [clearSession]);

  const orders = useMemo(
    () => (Array.isArray(myOrders) ? myOrders : []),
    [myOrders]
  );

  if (!isMounted) {
    return (
      <PageContainer loading>
        <SeoHead title="Konto użytkownika | Nowy Lombard" description="Panel użytkownika." path="/account" noindex />
      </PageContainer>
    );
  }

  if (!isAuthed) {
    return (
      <PageContainer loading={isLoading}>
        <SeoHead title="Konto użytkownika | Nowy Lombard" description="Logowanie i panel użytkownika." path="/account" noindex />
        <AccountWrapper>
          <AuthForm />
        </AccountWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer loading={isLoading}>
      <SeoHead title="Twoje konto | Nowy Lombard" description="Panel użytkownika, dane i historia zamówień." path="/account" noindex />
      <AccountWrapper>
        <ProfileCard>
          <Header>
            <h1>Twoje konto</h1>
            <button onClick={handleLogout}>Wyloguj się</button>
          </Header>
          <EmailLine>
            Zalogowano jako <strong>{data.email}</strong>
          </EmailLine>

          <TabBar role="tablist">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <Tab
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  $active={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon />
                  {tab.label}
                </Tab>
              );
            })}
          </TabBar>

          {activeTab === "profile" && <ProfileTab profile={profile} />}
          {activeTab === "orders" && <OrdersTab orders={orders} />}
          {activeTab === "settings" && (
            <SettingsTab
              email={data.email}
              onLoggedOutEverywhere={handleLogout}
            />
          )}
          {activeTab === "danger" && <DangerTab onDeleted={handleDeleted} />}
        </ProfileCard>
      </AccountWrapper>
    </PageContainer>
  );
};

export default AccountPage;
