import React, { useContext, useState } from "react";
import styled from "styled-components";
import Button from "components/Button";
import Table from "components/Table";
import Input from "components/Input";
import { CartContext } from "context/CartContext";
import { useProducts } from "services/api/useProductApi";
import PageContainer from "components/PageContainer";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
  transition: all 0.3s ease;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`;

const Box = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 40px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: fit-content;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 25px;
  color: #333;
  text-align: center;
`;

const EmptyCartMessage = styled.p`
  font-size: 18px;
  color: #888;
  text-align: center;
`;

const ProductRow = styled.tr`
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f7f7f7;
  }
`;

const ProductImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: transform 0.3s ease;

  button {
    padding: 10px;
    border-radius: 8px;
    background-color: #f4f4f4;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ddd;
    }

    &:active {
      background-color: #ccc;
    }
  }
`;

const TotalPrice = styled.div`
  text-align: right;
  font-size: 22px;
  font-weight: bold;
  color: #444;
  margin-top: 30px;
  transition: color 0.3s ease;

  &:hover {
    color: #222;
  }
`;

const OrderForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  transition: all 0.3s ease;
`;

const InputGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const FullWidthButton = styled(Button)`
  width: 100%;
  padding: 15px;
  font-size: 16px;
  transition: background-color 0.3s ease;
  background: #ee7668;
  text-align: center;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #e74c3c;
  }

  &:active {
    background-color: #ccc;
  }
`;

const CartPage = () => {
  const { cartProducts, addProduct, removeProduct } = useContext(CartContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const productIds = cartProducts.map(({ productId }) => productId);
  const { data: products = [], isLoading, error } = useProducts(productIds);

  const calculateTotal = () =>
    cartProducts.reduce((total, { productId, quantity }) => {
      const product = products.find((p) => p._id === productId);
      return total + (product ? product.price * quantity : 0);
    }, 0);

  const handlePayment = async () => {
    if (!name || !email || !city || !postalCode || !streetAddress || !country) {
      alert("Proszę wypełnić wszystkie pola.");
      return;
    }
    // TODO: Payment logic here
    setIsSuccess(true);
    // TODO: Order logic here
  };

  const onCloseConfirmOrderPress = () => {
    setIsSuccess(false);
    // TODO: update state eg. clearCart();
  };

  if (error) return <div>Error loading products</div>;

  if (isSuccess) {
    return (
      <PageContainer>
        <Box>
          <Title>Dziękujemy za Twoje zamówienie!</Title>
          <p>Powiadomimy Cię, gdy Twoje zamówienie będzie w drodze.</p>
          <Button onPress={onCloseConfirmOrderPress} primary>
            Zamknij
          </Button>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer loading={isLoading}>
      <ColumnsWrapper>
        <Box>
          <Title>Twój Koszyk</Title>
          {!cartProducts.length ? (
            <EmptyCartMessage>Twój koszyk jest pusty.</EmptyCartMessage>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Produkt</th>
                  <th style={{ textAlign: "center" }}>Ilość</th>
                  <th style={{ textAlign: "center" }}>Cena</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const productInCart = cartProducts.find(
                    (item) => item.productId === product._id
                  );
                  return (
                    <ProductRow key={product._id} style={{ padding: "5px" }}>
                      <td style={{ textAlign: "center" }}>
                        <ProductImage>
                          <img
                            src={
                              product.images[0] ||
                              "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                            }
                            alt={product.title}
                          />
                        </ProductImage>
                        {product.title}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <QuantityWrapper>
                          <Button onClick={() => removeProduct(product._id)}>
                            -
                          </Button>
                          <span>{productInCart?.quantity}</span>
                          <Button onClick={() => addProduct(product._id)}>
                            +
                          </Button>
                        </QuantityWrapper>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {(product.price * productInCart?.quantity).toFixed(2)}{" "}
                        zł
                      </td>
                    </ProductRow>
                  );
                })}
              </tbody>
            </Table>
          )}
          {cartProducts.length > 0 && (
            <TotalPrice>Razem: {calculateTotal().toFixed(2)} zł</TotalPrice>
          )}
        </Box>
        {!!cartProducts.length && (
          <Box>
            <Title>Szczegóły zamówienia</Title>
            <OrderForm>
              <Input
                type="text"
                placeholder="Imię"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputGroup>
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
              </InputGroup>
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
              <FullWidthButton onClick={handlePayment}>
                Przejdź do płatności
              </FullWidthButton>
            </OrderForm>
          </Box>
        )}
      </ColumnsWrapper>
    </PageContainer>
  );
};

export default CartPage;
