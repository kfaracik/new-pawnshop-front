import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  createOrder,
  createCheckoutSession,
  confirmPayment,
} from "services/api/orderApi";
import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";
import {
  buttonBaseStyle,
  buttonPrimaryStyle,
  buttonSecondaryStyle,
} from "components/Button";
import PageContainer from "components/PageContainer";
import SeoHead from "components/SeoHead";
import { CartContext } from "context/CartContext";
import { useProducts } from "services/api/useProductApi";
import { useUserData } from "services/api/useUserApi";
import colors from "styles/colors";

const CHECKOUT_STEPS = [
  { id: 1, label: "Koszyk" },
  { id: 2, label: "Dane, dostawa i płatność" },
];

const DELIVERY_OPTIONS = [
  {
    id: "courier_standard",
    title: "Kurier standard",
    description: "Dostawa pod wskazany adres w 1-2 dni robocze.",
    eta: "1-2 dni robocze",
    price: 16.9,
  },
  {
    id: "parcel_locker",
    title: "Paczkomat / automat odbioru",
    description: "Wygodny odbiór z automatu po opłaceniu zamówienia.",
    eta: "24-48 godzin",
    price: 13.9,
  },
  {
    id: "store_pickup",
    title: "Odbiór osobisty",
    description: "Bezpłatny odbiór po potwierdzeniu dostępności przez sklep.",
    eta: "ustalenie indywidualne",
    price: 0,
  },
];

const PAYMENT_OPTIONS = [
  {
    id: "stripe_card",
    title: "Płatność online Stripe",
    description: "Karta, BLIK, Apple Pay i Google Pay. Bezpieczna płatność w środowisku testowym Stripe.",
    badge: "Domyślnie",
    disabled: false,
  },
  {
    id: "bank_transfer",
    title: "Przelew tradycyjny",
    description: "Awaryjna metoda ręczna, gdy płatność online nie jest dostępna.",
    badge: "Backup",
    disabled: false,
  },
];

const Layout = styled.section`
  margin: 20px 0 40px;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 16px;

  @media (min-width: 980px) {
    grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
    align-items: start;
  }
`;

const Card = styled.div`
  background: ${colors.backgroundPaper};
  border: 1px solid #e8e8e8;
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  padding: 16px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.01em;
  line-height: 1.2;
  color: ${colors.textPrimary};
`;

const EmptyState = styled.div`
  margin-top: 16px;
  padding: 28px 20px;
  border: 1px dashed #ddd4bb;
  border-radius: 14px;
  background: linear-gradient(180deg, #fffdf8 0%, #fff 100%);
  text-align: center;
  color: ${colors.textSecondary};
`;

const EmptyStateEyebrow = styled.span`
  display: inline-block;
  margin-bottom: 10px;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${colors.primaryDark};
`;

const EmptyStateTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  color: ${colors.textPrimary};
`;

const EmptyStateText = styled.p`
  margin: 10px auto 0;
  max-width: 440px;
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${colors.textSecondary};
`;

const EmptyStateActions = styled.div`
  margin-top: 18px;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const SecondaryButtonLink = styled(Link)`
  ${buttonBaseStyle}
  ${buttonSecondaryStyle}
  min-height: 44px;
  min-width: 220px;
  justify-content: center;
  text-decoration: none;
`;

const ItemsList = styled.div`
  display: grid;
  gap: 10px;
  margin-top: 14px;
`;

const ItemCard = styled.div`
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: 12px;
  border: 1px solid #efefef;
  border-radius: 12px;
  padding: 10px;
  background: #fff;

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

const ProductImageWrapper = styled.div`
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 9px;
  border: 1px solid #f0f0f0;
  overflow: hidden;

  img {
    object-fit: cover;
  }

  @media (max-width: 420px) {
    width: 100%;
    height: 180px;
  }
`;

const ProductName = styled.h3`
  margin: 0;
  font-size: 0.96rem;
  color: ${colors.textPrimary};
  line-height: 1.3;
`;

const ProductMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;

  @media (max-width: 420px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const QuantityControl = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;

  span {
    min-width: 36px;
    text-align: center;
    font-weight: 600;
    color: ${colors.textPrimary};
  }
`;

const QtyButton = styled.button`
  ${buttonBaseStyle}
  width: 34px;
  height: 34px;
  min-height: 34px;
  padding: 0;
  background: #f7f7f7;
  font-size: 1rem;
  color: ${colors.textPrimary};
  font-weight: 600;
  border-radius: 0;
  transform: none !important;

  &:hover {
    background: #ebebeb;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background: #f4f4f4;
  }
`;

const QuantityInput = styled.input`
  width: 52px;
  height: 34px;
  border: 0;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  text-align: center;
  font-weight: 700;
  color: ${colors.textPrimary};
  background: #fff;
  appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }
`;

const RemoveLineButton = styled.button`
  ${buttonBaseStyle}
  ${buttonSecondaryStyle}
  min-height: 32px;
  padding: 6px 10px;
  font-size: 0.82rem;
`;

const ItemPrice = styled.strong`
  color: ${colors.primaryDark};
  font-size: 1rem;
`;

const StockHint = styled.span`
  display: inline-block;
  margin-top: 6px;
  font-size: 0.8rem;
  color: ${colors.textSecondary};
`;

const TotalRow = styled.div`
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid #ededed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  color: ${colors.textPrimary};
`;

const SectionTitle = styled.h2`
  margin: 0 0 12px;
  font-size: 1.05rem;
  color: ${colors.textPrimary};
`;

const SectionHeader = styled.div`
  display: grid;
  gap: 4px;
`;

const SectionLead = styled.p`
  margin: 0;
  color: ${colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.45;
`;

const CheckoutHeader = styled.div`
  display: grid;
  gap: 8px;
  margin-bottom: 16px;
`;

const Stepper = styled.ol`
  list-style: none;
  display: grid;
  gap: 10px;
  margin: 0 0 16px;
  padding: 0;

  @media (min-width: 700px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const StepItem = styled.li`
  border-radius: 12px;
  border: 1px solid ${(props) => (props.$active ? colors.primary : "#e9dfc2")};
  background: ${(props) => (props.$active ? "#fff9eb" : "#fff")};
  padding: 12px;
  display: grid;
  gap: 8px;
  cursor: ${(props) => (props.$clickable ? "pointer" : "default")};
`;

const StepTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const StepTitle = styled.strong`
  color: ${colors.textPrimary};
  font-size: 0.96rem;
`;

const StepIndex = styled.span`
  font-size: 0.76rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${colors.primaryDark};
`;

const StepCheck = styled.span`
  width: 22px;
  height: 22px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${colors.primaryDark};
  color: #fff;
  font-size: 0.82rem;
  font-weight: 700;
`;

const PrimaryButton = styled.button`
  ${buttonBaseStyle}
  ${buttonPrimaryStyle}
  margin-top: 6px;
  width: 100%;
  font-size: 0.98rem;
`;

const EmptyStatePrimaryButton = styled(PrimaryButton)`
  min-width: 220px;
  width: auto;
  justify-content: center;
`;

const Feedback = styled.p`
  margin: 4px 0 0;
  font-size: 0.88rem;
  color: ${colors.error};
`;

const StepActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

const StepButton = styled.button`
  ${buttonBaseStyle}
  ${buttonSecondaryStyle}
  min-width: 140px;
`;

const Toast = styled.div`
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 1200;
  min-width: min(360px, calc(100vw - 32px));
  max-width: min(420px, calc(100vw - 32px));
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid ${(props) => (props.$variant === "error" ? "#f2b8b5" : "#d8c27a")};
  background: ${(props) => (props.$variant === "error" ? "#fff4f3" : "#fff8e6")};
  color: ${colors.textPrimary};
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  font-size: 0.92rem;
  line-height: 1.45;
`;

const OptionGrid = styled.div`
  display: grid;
  gap: 10px;
`;

const OptionCard = styled.button`
  width: 100%;
  text-align: left;
  border: 1px solid ${(props) => (props.$selected ? colors.primary : "#e6e1d4")};
  background: ${(props) => (props.$selected ? "#fff8e8" : "#fff")};
  border-radius: 12px;
  padding: 14px;
  display: grid;
  gap: 6px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;

  &:hover:not(:disabled) {
    border-color: ${colors.primary};
    transform: translateY(-1px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  }
`;

const PaymentCard = styled(OptionCard)`
  grid-template-columns: 20px minmax(0, 1fr);
  align-items: start;
`;

const RadioDot = styled.span`
  width: 18px;
  height: 18px;
  margin-top: 2px;
  border-radius: 999px;
  border: 2px solid ${(props) => (props.$selected ? colors.primaryDark : "#d8d2c2")};
  background: ${(props) => (props.$selected ? colors.primaryDark : "#fff")};
  box-shadow: ${(props) =>
    props.$selected ? "inset 0 0 0 4px #fff" : "none"};
`;

const OptionTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const OptionTitle = styled.strong`
  color: ${colors.textPrimary};
  font-size: 0.95rem;
`;

const OptionBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  padding: 2px 8px;
  border-radius: 999px;
  background: #f5ead0;
  color: ${colors.primaryDark};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const OptionDescription = styled.span`
  color: ${colors.textSecondary};
  font-size: 0.88rem;
  line-height: 1.45;
`;

const OptionMeta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: ${colors.textPrimary};
  font-size: 0.84rem;
  font-weight: 600;
  flex-wrap: wrap;
`;

const CheckoutNotice = styled.div`
  border: 1px solid #d8c27a;
  border-radius: 12px;
  padding: 12px;
  background: #fff8e6;
  color: ${colors.textPrimary};
  font-size: 0.9rem;
  line-height: 1.45;

  strong {
    display: block;
    margin-bottom: 2px;
  }
`;

const TotalsList = styled.div`
  display: grid;
  gap: 8px;
`;

const TotalsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: ${colors.textPrimary};
  font-size: ${(props) => (props.$strong ? "1rem" : "0.9rem")};
  font-weight: ${(props) => (props.$strong ? 700 : 500)};
`;

const CompactOrderList = styled.div`
  display: grid;
  gap: 8px;
`;

const CompactOrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: ${colors.textPrimary};
  font-size: 0.9rem;

  span:first-child {
    color: ${colors.textSecondary};
  }

  strong {
    white-space: nowrap;
  }
`;

const SecureHint = styled.p`
  margin: 0;
  color: ${colors.textSecondary};
  font-size: 0.82rem;
  line-height: 1.45;
  text-align: center;
`;

const SuccessState = styled(Card)`
  max-width: 640px;
  margin: 24px auto 0;
  text-align: center;

  h2 {
    margin: 0 0 10px;
    color: ${colors.textPrimary};
  }

  p {
    margin: 0;
    color: ${colors.textSecondary};
  }
`;

const CloseButton = styled.button`
  ${buttonBaseStyle}
  ${buttonSecondaryStyle}
  margin-top: 16px;
`;

const SkeletonItem = styled.div`
  height: 92px;
  border-radius: 12px;
  border: 1px solid #efefef;
  background: linear-gradient(90deg, #f3f3f3 25%, #ececec 37%, #f3f3f3 63%);
  background-size: 400% 100%;
  animation: skeletonShimmer 1.2s ease-in-out infinite;

  @keyframes skeletonShimmer {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: 0 0;
    }
  }
`;

const CheckoutForm = styled.form`
  display: grid;
  gap: 16px;
  align-items: start;
  grid-template-columns: minmax(0, 1fr);

  @media (min-width: 980px) {
    grid-template-columns: minmax(0, 1.55fr) minmax(320px, 0.9fr);
  }
`;

const CheckoutMain = styled.div`
  display: grid;
  gap: 16px;
  min-width: 0;
`;

const CheckoutSide = styled(Card)`
  display: grid;
  gap: 14px;

  @media (min-width: 980px) {
    position: sticky;
    top: 14px;
  }
`;

const Panel = styled.div`
  background: ${colors.backgroundPaper};
  border: 1px solid ${(props) => (props.$active ? colors.primary : "#e8e8e8")};
  border-radius: 14px;
  box-shadow: ${(props) =>
    props.$active ? "0 10px 26px rgba(201, 162, 39, 0.12)" : "0 6px 16px rgba(0,0,0,0.04)"};
  opacity: ${(props) => (props.$locked ? 0.55 : 1)};
  transition: border-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  overflow: hidden;
`;

const PanelHead = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  cursor: ${(props) => (props.$clickable ? "pointer" : "default")};
`;

const PanelNum = styled.span`
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  background: ${(props) =>
    props.$done ? colors.primaryDark : props.$active ? colors.primary : "#ececec"};
  color: ${(props) => (props.$active || props.$done ? "#fff" : colors.textSecondary)};
`;

const PanelTitleWrap = styled.div`
  flex: 1;
  min-width: 0;
`;

const PanelTitle = styled.div`
  font-size: 1.02rem;
  font-weight: 700;
  color: ${colors.textPrimary};
`;

const PanelSummary = styled.div`
  margin-top: 2px;
  font-size: 0.85rem;
  color: ${colors.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PanelEdit = styled.button`
  ${buttonBaseStyle}
  min-height: auto;
  padding: 6px 12px;
  border: 1px solid #e6e0cf;
  border-radius: 999px;
  background: #fff;
  color: ${colors.primaryDark};
  font-size: 0.82rem;
  font-weight: 600;
  flex-shrink: 0;

  &:hover {
    border-color: ${colors.primary};
    background: #fff8e8;
  }
`;

const PanelBody = styled.div`
  padding: 4px 18px 20px;
  display: grid;
  gap: 14px;
`;

const PanelActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 2px;
`;

const FieldsGrid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr;

  @media (min-width: 560px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Field = styled.label`
  display: grid;
  gap: 6px;
  min-width: 0;
  grid-column: ${(props) => (props.$full ? "1 / -1" : "auto")};
`;

const FieldLabel = styled.span`
  font-size: 0.82rem;
  font-weight: 600;
  color: ${colors.textSecondary};
`;

const TextInput = styled.input`
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 12px 14px;
  border: 1px solid #e0e0e0;
  border-radius: 11px;
  background: #fff;
  color: ${colors.textPrimary};
  font-size: 0.95rem;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &::placeholder {
    color: #b0aca2;
  }

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.2);
  }
`;

const SideDivider = styled.div`
  height: 1px;
  background: #efeadc;
`;

const OptionCheck = styled.span`
  width: 22px;
  height: 22px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${colors.primaryDark};
  color: #fff;
  font-size: 0.76rem;
  font-weight: 700;
`;

const CartPage = () => {
  const {
    cartProducts,
    setCartProducts,
    addProduct,
    removeProduct,
    removeProductLine,
    setProductQuantity,
    clearCart,
  } = useContext(CartContext);
  const { data: userData } = useUserData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState(DELIVERY_OPTIONS[0].id);
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_OPTIONS[0].id);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const [checkoutSection, setCheckoutSection] = useState(1);
  const [isConfirmingPayment, setIsConfirmingPayment] = useState(false);
  const [pendingStripeOrder, setPendingStripeOrder] = useState(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    if (userData?.email && !email) {
      setEmail(userData.email);
    }
  }, [email, userData?.email]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const { payment, orderId, session_id: sessionId } = router.query;
    if (!payment) {
      return;
    }

    const clearPaymentQuery = () => {
      router.replace("/cart", undefined, { shallow: true });
    };

    if (payment === "canceled") {
      setFormError(
        "Płatność została anulowana. Zamówienie czeka na opłacenie — możesz spróbować ponownie."
      );
      clearPaymentQuery();
      return;
    }

    if (payment === "success" && orderId) {
      let active = true;
      setIsConfirmingPayment(true);
      confirmPayment(String(orderId), sessionId ? String(sessionId) : undefined)
        .then((result) => {
          if (!active) return;
          if (result?.paid) {
            setPendingStripeOrder(null);
            clearCart();
            queryClient.invalidateQueries({ queryKey: ["myOrders"] });
            setCreatedOrder(result.order || { _id: orderId });
            setIsSuccess(true);
          } else {
            setFormError(
              "Nie potwierdziliśmy jeszcze płatności. Jeśli pobrano środki, status zaktualizuje się wkrótce."
            );
          }
        })
        .catch(() => {
          if (!active) return;
          setFormError(
            "Nie udało się potwierdzić płatności. Skontaktuj się z nami, jeśli środki zostały pobrane."
          );
        })
        .finally(() => {
          if (active) {
            setIsConfirmingPayment(false);
          }
          clearPaymentQuery();
        });

      return () => {
        active = false;
      };
    }
  }, [router.isReady, router.query, clearCart, queryClient, router]);

  const showToast = useCallback((message, variant = "warning") => {
    setToast({ message, variant });
    if (typeof window !== "undefined") {
      window.clearTimeout(showToast.timeoutId);
      showToast.timeoutId = window.setTimeout(() => {
        setToast(null);
      }, 4500);
    }
  }, []);

  const productIds = useMemo(
    () => cartProducts.map(({ productId }) => productId),
    [cartProducts]
  );
  const { data: products = [], isLoading, isFetching, error } = useProducts(productIds);
  const isCartLoading = productIds.length > 0 && (isLoading || isFetching);

  const resolveAvailableQuantity = useCallback((product) => {
    const fromQuantity = Number(product?.quantity);
    if (Number.isFinite(fromQuantity)) {
      return Math.max(0, fromQuantity);
    }

    const fromAvailableQuantity = Number(product?.availableQuantity);
    if (Number.isFinite(fromAvailableQuantity)) {
      return Math.max(0, fromAvailableQuantity);
    }

    const fromProperty = Number(product?.properties?.quantity);
    if (Number.isFinite(fromProperty)) {
      return Math.max(0, fromProperty);
    }

    const fromStock = Number(product?.stock);
    if (Number.isFinite(fromStock) && fromStock > 0) {
      return Math.max(0, fromStock);
    }

    if (product?.availabilityStatus === "available") {
      return Infinity;
    }

    return 0;
  }, []);

  const cartItems = useMemo(
    () =>
      products
        .map((product) => {
          const productInCart = cartProducts.find(
            (item) => String(item.productId) === String(product._id)
          );
          if (!productInCart) return null;

          const cartQuantity = Number(productInCart.quantity || 0);
          const availableQuantity = resolveAvailableQuantity(product);

          return {
            ...product,
            cartQuantity,
            availableQuantity,
            total: product.price * cartQuantity,
          };
        })
        .filter(Boolean),
    [products, cartProducts, resolveAvailableQuantity]
  );

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.total, 0),
    [cartItems]
  );
  const selectedDelivery = useMemo(
    () =>
      DELIVERY_OPTIONS.find((option) => option.id === deliveryMethod) ||
      DELIVERY_OPTIONS[0],
    [deliveryMethod]
  );
  const selectedPayment = useMemo(
    () =>
      PAYMENT_OPTIONS.find((option) => option.id === paymentMethod) ||
      PAYMENT_OPTIONS[0],
    [paymentMethod]
  );
  const shippingTotal = selectedDelivery.price;
  const orderGrandTotal = cartTotal + shippingTotal;
  const contactFieldsValid =
    Boolean(name && email && city && postalCode && streetAddress && country);
  const stepOneComplete = cartItems.length > 0 && !isCartLoading;
  const stepTwoComplete = stepOneComplete && contactFieldsValid;

  const missingCartProductIds = useMemo(() => {
    const loadedIds = new Set(products.map((product) => String(product._id)));

    return cartProducts
      .map((item) => String(item.productId))
      .filter((productId) => !loadedIds.has(productId));
  }, [products, cartProducts]);

  useEffect(() => {
    if (isCartLoading || productIds.length === 0) {
      return;
    }

    const availabilityByProductId = new Map(
      products.map((product) => [
        String(product._id),
        resolveAvailableQuantity(product),
      ])
    );
    let removedCount = 0;
    let clampedCount = 0;
    let changed = false;
    const nextCart = [];

    for (const item of cartProducts) {
      const productId = String(item.productId);
      const availableQuantity = availabilityByProductId.get(productId);

      if (availableQuantity === undefined || availableQuantity <= 0) {
        changed = true;
        removedCount += 1;
        continue;
      }

      const currentQuantity = Math.max(1, Math.floor(Number(item.quantity || 1)));
      const nextQuantity = Number.isFinite(availableQuantity)
        ? Math.min(currentQuantity, availableQuantity)
        : currentQuantity;

      if (nextQuantity !== currentQuantity) {
        changed = true;
        clampedCount += 1;
      }

      nextCart.push({
        productId,
        quantity: nextQuantity,
      });
    }

    if (changed) {
      setCartProducts(nextCart);
    }

    if (removedCount > 0 || clampedCount > 0) {
      showToast(
        removedCount > 0
          ? "Koszyk został zaktualizowany: usunęliśmy produkty, które nie są już dostępne."
          : "Koszyk został zaktualizowany do aktualnej dostępności produktów.",
        "warning"
      );
    }
  }, [
    isCartLoading,
    cartProducts,
    productIds.length,
    products,
    resolveAvailableQuantity,
    setCartProducts,
    showToast,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!name || !email || !city || !postalCode || !streetAddress || !country) {
      setFormError("Uzupełnij wszystkie pola zamówienia.");
      return;
    }

    if (!cartItems.length) {
      setFormError("Koszyk jest pusty.");
      return;
    }

    if (missingCartProductIds.length > 0) {
      setCartProducts((prev) =>
        prev.filter(
          (item) => !missingCartProductIds.includes(String(item.productId))
        )
      );
      showToast(
        "Część produktów nie jest już dostępna. Zostały automatycznie usunięte z koszyka.",
        "warning"
      );
      return;
    }

    const unavailableItems = cartItems.filter(
      (item) => item.availableQuantity < item.cartQuantity
    );

    if (unavailableItems.length > 0) {
      showToast(
        "Co najmniej jeden produkt ma już zbyt małą dostępność. Popraw koszyk i spróbuj ponownie.",
        "warning"
      );
      return;
    }

    try {
      setIsSubmitting(true);
      const productsPayload = cartItems.map((item) => ({
        productId: item._id,
        quantity: item.cartQuantity,
      }));

      const orderPayload = {
        name,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        products: productsPayload,
        deliveryMethod,
        deliveryPrice: shippingTotal,
        paymentMethod,
      };

      if (paymentMethod === "stripe_card") {
        const signature = JSON.stringify({ productsPayload, deliveryMethod });
        let stripeOrder =
          pendingStripeOrder?.signature === signature ? pendingStripeOrder.order : null;

        if (!stripeOrder) {
          stripeOrder = await createOrder(orderPayload);
          setPendingStripeOrder({ order: stripeOrder, signature });
        }

        try {
          const { url, alreadyPaid } = await createCheckoutSession(stripeOrder._id);
          if (url) {
            window.location.href = url;
            return;
          }
          if (alreadyPaid) {
            setPendingStripeOrder(null);
            clearCart();
            queryClient.invalidateQueries({ queryKey: ["myOrders"] });
            setCreatedOrder(stripeOrder);
            setIsSuccess(true);
            return;
          }
          throw new Error("no_session_url");
        } catch (sessionErr) {
          setPendingStripeOrder(null);
          setFormError(
            "Zamówienie zostało zapisane, ale nie udało się rozpocząć płatności online. Spróbuj ponownie za chwilę."
          );
          return;
        }
      }

      const order = await createOrder(orderPayload);
      clearCart();
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
      setCreatedOrder(order);
      setIsSuccess(true);
    } catch (err) {
      const unavailableProductIds = Array.isArray(
        err?.response?.data?.unavailableProductIds
      )
        ? err.response.data.unavailableProductIds.map((id) => String(id))
        : [];

      if (err?.response?.status === 409 && unavailableProductIds.length > 0) {
        setCartProducts((prev) =>
          prev.filter(
            (item) => !unavailableProductIds.includes(String(item.productId))
          )
        );
        showToast(
          "Niektóre produkty są już niedostępne lub zarezerwowane. Zostały automatycznie usunięte z koszyka.",
          "warning"
        );
        return;
      }

      setFormError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Nie udało się utworzyć zamówienia."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const onCloseConfirmOrderPress = () => setIsSuccess(false);
  const hasCheckoutItems = cartItems.length > 0 || isCartLoading;

  const goToStep = (step) => {
    if (step === 1) {
      setActiveStep(1);
      return;
    }

    if (step === 2) {
      if (!stepOneComplete) {
        showToast("Najpierw dodaj produkt do koszyka.", "warning");
        return;
      }
      setCheckoutSection(1);
      setActiveStep(2);
      return;
    }

    setActiveStep(2);
  };

  const advanceFromContact = () => {
    if (!contactFieldsValid) {
      setFormError("Uzupełnij wszystkie dane odbiorcy, aby przejść dalej.");
      return;
    }
    setFormError("");
    setCheckoutSection(2);
  };

  const contactSummary = [name, streetAddress, [postalCode, city].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(" · ");

  if (error) return <div>Error loading products</div>;

  if (isConfirmingPayment) {
    return (
      <PageContainer>
        <SeoHead
          title="Koszyk | Nowy Lombard"
          description="Koszyk i finalizacja zamówienia."
          path="/cart"
          noindex
        />
        <SuccessState>
          <h2>Potwierdzamy płatność…</h2>
          <p>Chwila cierpliwości, weryfikujemy status transakcji.</p>
        </SuccessState>
      </PageContainer>
    );
  }

  if (isSuccess) {
    return (
      <PageContainer>
        <SeoHead
          title="Koszyk | Nowy Lombard"
          description="Koszyk i finalizacja zamówienia."
          path="/cart"
          noindex
        />
        <SuccessState>
          <h2>Zamówienie zapisane</h2>
          <p>
            Potwierdzenie wyślemy na podany adres e-mail. Numer zamówienia:{" "}
            <strong>{createdOrder?._id || "w trakcie nadawania"}</strong>.
          </p>
          <p>
            Wybrana płatność:{" "}
            <strong>
              {PAYMENT_OPTIONS.find((option) => option.id === createdOrder?.paymentMethod)?.title ||
                "Płatność online Stripe"}
            </strong>
            {createdOrder?.paid
              ? ". Płatność została potwierdzona — dziękujemy!"
              : ". Zamówienie oczekuje na potwierdzenie płatności."}
          </p>
          <CloseButton type="button" onClick={onCloseConfirmOrderPress}>
            Zamknij
          </CloseButton>
        </SuccessState>
      </PageContainer>
    );
  }

  return (
    <PageContainer loading={false}>
      <SeoHead
        title="Koszyk | Nowy Lombard"
        description="Koszyk i finalizacja zamówienia."
        path="/cart"
        noindex
      />
      {hasCheckoutItems && (
        <CheckoutHeader>
          <Title>Finalizacja zamówienia</Title>
          <Stepper aria-label="Etapy zamówienia">
            {CHECKOUT_STEPS.map((step) => {
              const isCompleted =
                (step.id === 1 && stepOneComplete) ||
                (step.id === 2 && stepTwoComplete);
              const isClickable =
                step.id === 1 || (step.id === 2 && stepOneComplete);

              return (
                <StepItem
                  key={step.id}
                  $active={activeStep === step.id}
                  $clickable={isClickable}
                  onClick={() => isClickable && goToStep(step.id)}
                >
                  <StepTop>
                    <StepIndex>Krok {step.id}</StepIndex>
                    {isCompleted && <StepCheck>✓</StepCheck>}
                  </StepTop>
                  <StepTitle>{step.label}</StepTitle>
                </StepItem>
              );
            })}
          </Stepper>
        </CheckoutHeader>
      )}

      {activeStep === 2 && cartItems.length > 0 ? (
        <CheckoutForm onSubmit={(e) => e.preventDefault()}>
          <CheckoutMain>
            <Panel $active={checkoutSection === 1}>
              <PanelHead
                $clickable={checkoutSection > 1}
                onClick={() => checkoutSection > 1 && setCheckoutSection(1)}
              >
                <PanelNum $active={checkoutSection === 1} $done={checkoutSection > 1}>
                  {checkoutSection > 1 ? "✓" : "1"}
                </PanelNum>
                <PanelTitleWrap>
                  <PanelTitle>Dane odbiorcy</PanelTitle>
                  {checkoutSection > 1 && contactSummary && (
                    <PanelSummary>{contactSummary}</PanelSummary>
                  )}
                </PanelTitleWrap>
                {checkoutSection > 1 && (
                  <PanelEdit
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCheckoutSection(1);
                    }}
                  >
                    Edytuj
                  </PanelEdit>
                )}
              </PanelHead>
              {checkoutSection === 1 && (
                <PanelBody>
                  <FieldsGrid>
                    <Field $full>
                      <FieldLabel>Imię i nazwisko</FieldLabel>
                      <TextInput
                        type="text"
                        autoComplete="name"
                        placeholder="np. Jan Kowalski"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Field>
                    <Field $full>
                      <FieldLabel>Adres e-mail</FieldLabel>
                      <TextInput
                        type="email"
                        autoComplete="email"
                        placeholder="np. jan@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Field>
                    <Field>
                      <FieldLabel>Miasto</FieldLabel>
                      <TextInput
                        type="text"
                        autoComplete="address-level2"
                        placeholder="np. Częstochowa"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </Field>
                    <Field>
                      <FieldLabel>Kod pocztowy</FieldLabel>
                      <TextInput
                        type="text"
                        autoComplete="postal-code"
                        placeholder="np. 42-200"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </Field>
                    <Field $full>
                      <FieldLabel>Ulica i numer</FieldLabel>
                      <TextInput
                        type="text"
                        autoComplete="street-address"
                        placeholder="np. Al. NMP 1/2"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                      />
                    </Field>
                    <Field $full>
                      <FieldLabel>Kraj</FieldLabel>
                      <TextInput
                        type="text"
                        autoComplete="country-name"
                        placeholder="np. Polska"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </Field>
                  </FieldsGrid>
                  {formError && <Feedback>{formError}</Feedback>}
                  <PrimaryButton type="button" onClick={advanceFromContact}>
                    Dalej: dostawa
                  </PrimaryButton>
                  <StepButton type="button" onClick={() => goToStep(1)}>
                    Wróć do koszyka
                  </StepButton>
                </PanelBody>
              )}
            </Panel>

            <Panel $active={checkoutSection === 2} $locked={checkoutSection < 2}>
              <PanelHead
                $clickable={checkoutSection > 2}
                onClick={() => checkoutSection > 2 && setCheckoutSection(2)}
              >
                <PanelNum $active={checkoutSection === 2} $done={checkoutSection > 2}>
                  {checkoutSection > 2 ? "✓" : "2"}
                </PanelNum>
                <PanelTitleWrap>
                  <PanelTitle>Dostawa</PanelTitle>
                  {checkoutSection > 2 && (
                    <PanelSummary>
                      {selectedDelivery.title} ·{" "}
                      {selectedDelivery.price === 0
                        ? "Gratis"
                        : `${selectedDelivery.price.toFixed(2)} zł`}
                    </PanelSummary>
                  )}
                </PanelTitleWrap>
                {checkoutSection > 2 && (
                  <PanelEdit
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCheckoutSection(2);
                    }}
                  >
                    Edytuj
                  </PanelEdit>
                )}
              </PanelHead>
              {checkoutSection === 2 && (
                <PanelBody>
                  <OptionGrid>
                    {DELIVERY_OPTIONS.map((option) => (
                      <OptionCard
                        key={option.id}
                        type="button"
                        $selected={option.id === deliveryMethod}
                        onClick={() => setDeliveryMethod(option.id)}
                        aria-pressed={option.id === deliveryMethod}
                      >
                        <OptionTopRow>
                          <OptionTitle>{option.title}</OptionTitle>
                          {option.id === deliveryMethod ? (
                            <OptionCheck aria-hidden="true">✓</OptionCheck>
                          ) : (
                            <OptionBadge>
                              {option.price === 0 ? "Gratis" : `${option.price.toFixed(2)} zł`}
                            </OptionBadge>
                          )}
                        </OptionTopRow>
                        <OptionDescription>{option.description}</OptionDescription>
                        <OptionMeta>
                          <span>{option.eta}</span>
                        </OptionMeta>
                      </OptionCard>
                    ))}
                  </OptionGrid>
                  <PrimaryButton type="button" onClick={() => setCheckoutSection(3)}>
                    Dalej: płatność
                  </PrimaryButton>
                  <StepButton type="button" onClick={() => setCheckoutSection(1)}>
                    Wróć
                  </StepButton>
                </PanelBody>
              )}
            </Panel>

            <Panel $active={checkoutSection === 3} $locked={checkoutSection < 3}>
              <PanelHead>
                <PanelNum $active={checkoutSection === 3}>3</PanelNum>
                <PanelTitleWrap>
                  <PanelTitle>Płatność</PanelTitle>
                </PanelTitleWrap>
              </PanelHead>
              {checkoutSection === 3 && (
                <PanelBody>
                  <OptionGrid>
                    {PAYMENT_OPTIONS.map((option) => (
                      <PaymentCard
                        key={option.id}
                        type="button"
                        $selected={option.id === paymentMethod}
                        disabled={option.disabled}
                        onClick={() => {
                          if (!option.disabled) {
                            setPaymentMethod(option.id);
                          }
                        }}
                        aria-pressed={option.id === paymentMethod}
                      >
                        <RadioDot $selected={option.id === paymentMethod} />
                        <div>
                          <OptionTopRow>
                            <OptionTitle>{option.title}</OptionTitle>
                            <OptionBadge>{option.badge}</OptionBadge>
                          </OptionTopRow>
                          <OptionDescription>{option.description}</OptionDescription>
                        </div>
                      </PaymentCard>
                    ))}
                  </OptionGrid>
                  {paymentMethod === "stripe_card" && (
                    <CheckoutNotice>
                      <strong>Płatność online (tryb testowy)</strong>
                      Karta testowa 4242 4242 4242 4242, dowolna przyszła data i CVC.
                    </CheckoutNotice>
                  )}
                  {formError && <Feedback>{formError}</Feedback>}
                  <PrimaryButton
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !stepTwoComplete}
                  >
                    {isSubmitting
                      ? "Przetwarzanie..."
                      : paymentMethod === "stripe_card"
                        ? `Zapłać ${orderGrandTotal.toFixed(2)} zł`
                        : "Złóż zamówienie"}
                  </PrimaryButton>
                  <StepButton type="button" onClick={() => setCheckoutSection(2)}>
                    Wróć
                  </StepButton>
                  <SecureHint>
                    Płatność online obsługuje Stripe. Dane weryfikujemy po stronie serwera.
                  </SecureHint>
                </PanelBody>
              )}
            </Panel>
          </CheckoutMain>

          <CheckoutSide>
            <SectionTitle as="h2">Podsumowanie</SectionTitle>
            <CompactOrderList>
              {cartItems.map((item) => (
                <CompactOrderItem key={`summary-${item._id}`}>
                  <span>
                    {item.title} × {item.cartQuantity}
                  </span>
                  <strong>{item.total.toFixed(2)} zł</strong>
                </CompactOrderItem>
              ))}
            </CompactOrderList>
            <SideDivider />
            <TotalsList>
              <TotalsRow>
                <span>Produkty</span>
                <span>{cartTotal.toFixed(2)} zł</span>
              </TotalsRow>
              <TotalsRow>
                <span>Dostawa</span>
                <span>{shippingTotal === 0 ? "Gratis" : `${shippingTotal.toFixed(2)} zł`}</span>
              </TotalsRow>
            </TotalsList>
            <SideDivider />
            <TotalsList>
              <TotalsRow $strong>
                <span>Do zapłaty</span>
                <span>{orderGrandTotal.toFixed(2)} zł</span>
              </TotalsRow>
            </TotalsList>
          </CheckoutSide>
        </CheckoutForm>
      ) : (
        <Layout>
          <Card>
            {!hasCheckoutItems && (
              <CheckoutHeader>
                <Title>Koszyk</Title>
              </CheckoutHeader>
            )}
            {isCartLoading ? (
              <ItemsList>
                {Array.from({ length: Math.min(productIds.length || 3, 4) }).map((_, index) => (
                  <SkeletonItem key={`cart-skeleton-${index}`} />
                ))}
              </ItemsList>
            ) : !cartItems.length ? (
              <EmptyState>
                <EmptyStateEyebrow>Pusty koszyk</EmptyStateEyebrow>
                <EmptyStateTitle>Nie masz jeszcze żadnych produktów</EmptyStateTitle>
                <EmptyStateText>
                  Dodaj produkty do koszyka, aby przejść do wyboru dostawy, metody
                  płatności i potwierdzenia zamówienia.
                </EmptyStateText>
                <EmptyStateActions>
                  <EmptyStatePrimaryButton as={Link} href="/products">
                    Przeglądaj produkty
                  </EmptyStatePrimaryButton>
                  <SecondaryButtonLink href="/">Wróć na stronę główną</SecondaryButtonLink>
                </EmptyStateActions>
              </EmptyState>
            ) : (
              <>
                <ItemsList>
                  {cartItems.map((item) => (
                    <ItemCard key={item._id}>
                      <ProductImageWrapper>
                        <Image
                          src={
                            item.images?.[0] ||
                            "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                          }
                          alt={item.title}
                          fill
                          sizes="(max-width: 420px) 100vw, 72px"
                          loader={({ src }) => src}
                          unoptimized
                        />
                      </ProductImageWrapper>
                      <div>
                        <ProductName>{item.title}</ProductName>
                        <ProductMeta>
                          <QuantityControl>
                            <QtyButton
                              type="button"
                              aria-label={`Zmniejsz ilość produktu ${item.title}`}
                              onClick={() => removeProduct(item._id)}
                              disabled={item.cartQuantity <= 1}
                            >
                              -
                            </QtyButton>
                            <QuantityInput
                              type="number"
                              inputMode="numeric"
                              min="1"
                              max={
                                Number.isFinite(item.availableQuantity)
                                  ? item.availableQuantity
                                  : undefined
                              }
                              value={item.cartQuantity}
                              aria-label={`Ilość produktu ${item.title}`}
                              onChange={(event) => {
                                if (event.target.value === "") {
                                  return;
                                }

                                setProductQuantity(
                                  item._id,
                                  Number(event.target.value),
                                  item.availableQuantity
                                );
                              }}
                            />
                            <QtyButton
                              type="button"
                              aria-label={`Zwiększ ilość produktu ${item.title}`}
                              onClick={() =>
                                addProduct(item._id, item.availableQuantity)
                              }
                              disabled={item.cartQuantity >= item.availableQuantity}
                            >
                              +
                            </QtyButton>
                          </QuantityControl>
                          <RemoveLineButton
                            type="button"
                            onClick={() => removeProductLine(item._id)}
                            aria-label={`Usuń produkt ${item.title} z koszyka`}
                          >
                            Usuń
                          </RemoveLineButton>
                          <ItemPrice>{item.total.toFixed(2)} zł</ItemPrice>
                        </ProductMeta>
                        {Number.isFinite(item.availableQuantity) && (
                          <StockHint>Dostępne: {item.availableQuantity} szt.</StockHint>
                        )}
                      </div>
                    </ItemCard>
                  ))}
                </ItemsList>
                <TotalRow>
                  <span>Razem</span>
                  <span>{cartTotal.toFixed(2)} zł</span>
                </TotalRow>
                <StepActions>
                  <span />
                  <PrimaryButton type="button" onClick={() => goToStep(2)}>
                    Przejdź do dostawy i płatności
                  </PrimaryButton>
                </StepActions>
              </>
            )}
          </Card>
        </Layout>
      )}
      {toast && <Toast $variant={toast.variant}>{toast.message}</Toast>}
    </PageContainer>
  );
};

export default CartPage;
