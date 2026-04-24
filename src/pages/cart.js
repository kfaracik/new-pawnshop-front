import React, { useContext, useMemo, useState } from "react";
import { createOrder } from "services/api/orderApi";
import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";
import PageContainer from "components/PageContainer";
import Input from "components/Input";
import { CartContext } from "context/CartContext";
import { useProducts } from "services/api/useProductApi";
import colors from "styles/colors";

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
  padding: 22px 8px 6px;
  color: ${colors.textSecondary};
  text-align: center;
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
`;

const ProductImage = styled.img`
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 9px;
  border: 1px solid #f0f0f0;
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
  border: 0;
  width: 34px;
  height: 34px;
  background: #f7f7f7;
  cursor: pointer;
  font-size: 1rem;
  color: ${colors.textPrimary};
  transition: background-color 0.2s ease;

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

const TwoCols = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr;

  @media (min-width: 560px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const PrimaryButton = styled.button`
  margin-top: 6px;
  width: 100%;
  border: none;
  border-radius: 10px;
  background: ${colors.primary};
  color: ${colors.primaryContrastText};
  font-size: 0.98rem;
  font-weight: 700;
  padding: 12px 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${colors.primaryLight};
  }
`;

const Feedback = styled.p`
  margin: 4px 0 0;
  font-size: 0.88rem;
  color: ${colors.error};
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
  margin-top: 16px;
  border: 1px solid #e1d8b5;
  background: #fff;
  color: ${colors.primaryDark};
  border-radius: 10px;
  padding: 10px 14px;
  font-weight: 600;
  cursor: pointer;
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

  if (error) return <div>Error loading products</div>;

  if (isSuccess) {
    return (
      <PageContainer>
        <SuccessState>
          <h2>Dziękujemy za zamówienie</h2>
          <p>Potwierdzenie wyślemy na podany adres e-mail.</p>
          <CloseButton type="button" onClick={onCloseConfirmOrderPress}>
            Zamknij
          </CloseButton>
        </SuccessState>
      </PageContainer>
    );
  }

  return (
    <PageContainer loading={false}>
      <Layout>
        <Card>
          <Title>Koszyk</Title>
          {isCartLoading ? (
            <ItemsList>
              {Array.from({ length: Math.min(productIds.length || 3, 4) }).map((_, index) => (
                <SkeletonItem key={`cart-skeleton-${index}`} />
              ))}
            </ItemsList>
          ) : !cartItems.length ? (
            <EmptyState>Twój koszyk jest pusty.</EmptyState>
          ) : (
            <>
              <ItemsList>
                {cartItems.map((item) => (
                  <ItemCard key={item._id}>
                    <ProductImage
                      src={
                        item.images?.[0] ||
                        "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                      }
                      alt={item.title}
                    />
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
            <Form onSubmit={handleSubmit}>
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
              {formError && <Feedback>{formError}</Feedback>}
              <PrimaryButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Tworzenie zamówienia..." : "Przejdź do płatności"}
              </PrimaryButton>
            </Form>
          </SummaryCard>
        )}
      </Layout>
    </PageContainer>
  );
};

export default CartPage;
