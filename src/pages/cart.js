import React, { useContext, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createOrder } from "services/api/orderApi";
import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";
import {
  buttonBaseStyle,
  buttonPrimaryStyle,
  buttonSecondaryStyle,
} from "components/Button";
import PageContainer from "components/PageContainer";
import SeoHead from "components/SeoHead";
import Input from "components/Input";
import { CartContext } from "context/CartContext";
import { useProducts } from "services/api/useProductApi";
import colors from "styles/colors";

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
    title: "Karta / BLIK / Apple Pay",
    description: "Docelowy checkout Stripe. Interfejs przygotowany, integracja później.",
    badge: "Sandbox ready",
    isFuture: true,
  },
  {
    id: "bank_transfer",
    title: "Przelew tradycyjny",
    description: "Po złożeniu zamówienia wyświetlimy dalszy krok opłacenia zamówienia.",
    badge: "MVP",
    isFuture: false,
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
  font-size: clamp(1.3rem, 2vw, 1.7rem);
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

const SummaryCard = styled(Card)`
  @media (min-width: 980px) {
    position: sticky;
    top: 14px;
  }

  @media (max-width: 979px) {
    order: -1;
  }
`;

const SectionTitle = styled.h2`
  margin: 0 0 12px;
  font-size: 1.05rem;
  color: ${colors.textPrimary};
`;

const Form = styled.form`
  display: grid;
  gap: 10px;
`;

const CheckoutIntro = styled.p`
  margin: 8px 0 0;
  color: ${colors.textSecondary};
  font-size: 0.92rem;
  line-height: 1.5;
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
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const StepItem = styled.li`
  border-radius: 12px;
  border: 1px solid ${(props) => (props.$active ? colors.primary : "#e9dfc2")};
  background: ${(props) => (props.$active ? "#fff9eb" : "#fff")};
  padding: 12px;
  display: grid;
  gap: 4px;
`;

const StepLabel = styled.span`
  font-size: 0.76rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${colors.primaryDark};
`;

const StepTitle = styled.strong`
  color: ${colors.textPrimary};
  font-size: 0.96rem;
`;

const StepMeta = styled.span`
  color: ${colors.textSecondary};
  font-size: 0.82rem;
  line-height: 1.4;
`;

const TwoCols = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr;

  @media (min-width: 560px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const PrimaryButton = styled.button`
  ${buttonBaseStyle}
  ${buttonPrimaryStyle}
  margin-top: 6px;
  width: 100%;
  font-size: 0.98rem;
`;

const MobileOrderHint = styled.p`
  margin: 0 0 10px;
  font-size: 0.85rem;
  color: ${colors.textSecondary};

  @media (min-width: 980px) {
    display: none;
  }
`;

const Feedback = styled.p`
  margin: 4px 0 0;
  font-size: 0.88rem;
  color: ${colors.error};
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
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: ${colors.primary};
    transform: translateY(-1px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  }
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

const CheckoutBlock = styled.div`
  display: grid;
  gap: 10px;
  padding-top: 8px;
  border-top: 1px solid #efeadc;
`;

const Note = styled.p`
  margin: 0;
  color: ${colors.textSecondary};
  font-size: 0.84rem;
  line-height: 1.5;
`;

const TotalsList = styled.div`
  margin-top: 10px;
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

const CartPage = () => {
  const { cartProducts, setCartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState(DELIVERY_OPTIONS[0].id);
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_OPTIONS[1].id);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const productIds = useMemo(
    () => cartProducts.map(({ productId }) => productId),
    [cartProducts]
  );
  const { data: products = [], isLoading, isFetching, error } = useProducts(productIds);
  const isCartLoading = productIds.length > 0 && (isLoading || isFetching);

  const resolveAvailableQuantity = (product) => {
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
    if (Number.isFinite(fromStock)) {
      return Math.max(0, fromStock);
    }

    if (product?.availabilityStatus === "available") {
      return Infinity;
    }

    return 0;
  };

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
    [products, cartProducts]
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
      PAYMENT_OPTIONS[1],
    [paymentMethod]
  );
  const shippingTotal = selectedDelivery.price;
  const orderGrandTotal = cartTotal + shippingTotal;

  const missingCartProductIds = useMemo(() => {
    const loadedIds = new Set(products.map((product) => String(product._id)));

    return cartProducts
      .map((item) => String(item.productId))
      .filter((productId) => !loadedIds.has(productId));
  }, [products, cartProducts]);

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
      setFormError(
        "Część produktów nie jest już dostępna. Zostały usunięte z koszyka."
      );
      return;
    }

    const unavailableItems = cartItems.filter(
      (item) => item.availableQuantity < item.cartQuantity
    );

    if (unavailableItems.length > 0) {
      setFormError(
        "Co najmniej jeden produkt ma już zbyt małą dostępność. Popraw koszyk i spróbuj ponownie."
      );
      return;
    }

    try {
      setIsSubmitting(true);
      const productsPayload = cartItems.map((item) => ({
        productId: item._id,
        quantity: item.cartQuantity,
      }));

      await createOrder({
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
      });

      clearCart();
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
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
        setFormError(
          "Niektóre produkty są już niedostępne lub zarezerwowane. Zostały automatycznie usunięte z koszyka."
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

  if (error) return <div>Error loading products</div>;

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
          <h2>Zamówienie zostało przyjęte</h2>
          <p>
            Potwierdzenie wyślemy na podany adres e-mail. Docelowy krok płatności
            online będzie tu obsługiwany przez Stripe, a obecne zamówienie zapisuje już
            wybraną dostawę i metodę płatności.
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
      <Layout>
        <Card>
          <CheckoutHeader>
            <Title>{hasCheckoutItems ? "Finalizacja zamówienia" : "Koszyk"}</Title>
            {hasCheckoutItems ? (
              <CheckoutIntro>
                Sprawdź produkty, wybierz dostawę i metodę płatności, a następnie
                przejdź do potwierdzenia zamówienia.
              </CheckoutIntro>
            ) : (
              <CheckoutIntro>
                Gdy dodasz produkty, tutaj pojawi się pełny checkout z dostawą,
                płatnością i potwierdzeniem zamówienia.
              </CheckoutIntro>
            )}
          </CheckoutHeader>
          {hasCheckoutItems && (
            <Stepper aria-label="Etapy zamówienia">
              <StepItem $active>
                <StepLabel>Krok 1</StepLabel>
                <StepTitle>Koszyk</StepTitle>
                <StepMeta>Sprawdź produkty i dostępność przed przejściem dalej.</StepMeta>
              </StepItem>
              <StepItem $active>
                <StepLabel>Krok 2</StepLabel>
                <StepTitle>Dostawa i płatność</StepTitle>
                <StepMeta>Wybierz sposób odbioru oraz metodę opłacenia zamówienia.</StepMeta>
              </StepItem>
              <StepItem>
                <StepLabel>Krok 3</StepLabel>
                <StepTitle>Potwierdzenie</StepTitle>
                <StepMeta>Zapisz zamówienie i przygotuj dalszy krok płatności.</StepMeta>
              </StepItem>
            </Stepper>
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
                <PrimaryButton as={Link} href="/products">
                  Przeglądaj produkty
                </PrimaryButton>
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
                          >
                            -
                          </QtyButton>
                          <span>{item.cartQuantity}</span>
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
            </>
          )}
        </Card>

        {!!cartItems.length && (
          <SummaryCard>
            <SectionTitle>Dane zamówienia</SectionTitle>
            <MobileOrderHint>
              Uzupełnij dane, wybierz dostawę i przygotuj zamówienie do przyszłej płatności online.
            </MobileOrderHint>
            <Form onSubmit={handleSubmit}>
              <CheckoutBlock>
                <SectionTitle as="h3">Dane kontaktowe</SectionTitle>
                <Note>
                  Te dane wykorzystamy do potwierdzenia zamówienia i dalszej obsługi płatności.
                </Note>
              </CheckoutBlock>
              <Input
                type="text"
                placeholder="Imię i nazwisko"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Adres e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TwoCols>
                <Input
                  type="text"
                  placeholder="Miasto"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Kod pocztowy"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </TwoCols>
              <Input
                type="text"
                placeholder="Adres ulicy"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Kraj"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <CheckoutBlock>
                <SectionTitle as="h3">Metoda dostawy</SectionTitle>
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
                        <OptionBadge>
                          {option.price === 0 ? "Gratis" : `${option.price.toFixed(2)} zł`}
                        </OptionBadge>
                      </OptionTopRow>
                      <OptionDescription>{option.description}</OptionDescription>
                      <OptionMeta>
                        <span>Czas: {option.eta}</span>
                        <span>
                          {option.price === 0
                            ? "Bez dodatkowych kosztów"
                            : `Dostawa: ${option.price.toFixed(2)} zł`}
                        </span>
                      </OptionMeta>
                    </OptionCard>
                  ))}
                </OptionGrid>
              </CheckoutBlock>
              <CheckoutBlock>
                <SectionTitle as="h3">Metoda płatności</SectionTitle>
                <OptionGrid>
                  {PAYMENT_OPTIONS.map((option) => (
                    <OptionCard
                      key={option.id}
                      type="button"
                      $selected={option.id === paymentMethod}
                      onClick={() => setPaymentMethod(option.id)}
                      aria-pressed={option.id === paymentMethod}
                    >
                      <OptionTopRow>
                        <OptionTitle>{option.title}</OptionTitle>
                        <OptionBadge>{option.badge}</OptionBadge>
                      </OptionTopRow>
                      <OptionDescription>{option.description}</OptionDescription>
                    </OptionCard>
                  ))}
                </OptionGrid>
                <Note>
                  Wybrano: <strong>{selectedPayment.title}</strong>. Integracja Stripe nie jest
                  jeszcze aktywna, ale checkout zapisuje już metodę płatności w modelu zamówienia.
                </Note>
              </CheckoutBlock>
              <CheckoutBlock>
                <SectionTitle as="h3">Podsumowanie checkoutu</SectionTitle>
                <TotalsList>
                  <TotalsRow>
                    <span>Produkty</span>
                    <span>{cartTotal.toFixed(2)} zł</span>
                  </TotalsRow>
                  <TotalsRow>
                    <span>Dostawa</span>
                    <span>{shippingTotal === 0 ? "0,00 zł" : `${shippingTotal.toFixed(2)} zł`}</span>
                  </TotalsRow>
                  <TotalsRow>
                    <span>Płatność</span>
                    <span>{selectedPayment.title}</span>
                  </TotalsRow>
                  <TotalsRow $strong>
                    <span>Łącznie</span>
                    <span>{orderGrandTotal.toFixed(2)} zł</span>
                  </TotalsRow>
                </TotalsList>
                <Note>
                  W kolejnym etapie ten widok można bezpiecznie podłączyć do Stripe Checkout albo
                  Stripe Elements bez przebudowy UX. Dla opcji Stripe zapisujemy stan
                  `sandbox_ready`, ale bez tworzenia realnej sesji płatniczej.
                </Note>
              </CheckoutBlock>
              {formError && <Feedback>{formError}</Feedback>}
              <PrimaryButton type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Tworzenie zamówienia..."
                  : "Zapisz zamówienie i przygotuj płatność"}
              </PrimaryButton>
            </Form>
          </SummaryCard>
        )}
      </Layout>
    </PageContainer>
  );
};

export default CartPage;
