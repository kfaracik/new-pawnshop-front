import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Header from "components/Header";
import Center from "components/Center";
import Button from "components/Button";
import Table from "components/Table";
import Input from "components/Input";
import { CartContext } from "components/CartContext";
import { fetchProductById, useProduct } from "services/api/useProductApi";
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
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
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

  &:hover {
    background-color: #e0e0e0;
  }

  &:active {
    background-color: #ccc;
  }
`;

const CartPage = () => {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const productData = await Promise.all(
        cartProducts.map(async ({ productId }) => {
          const product = await fetchProductById(productId);
          return product;
        })
      );
      setProducts(productData);
    };

    if (cartProducts.length > 0) {
      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  const handlePayment = async () => {
    // TODO: Payment logic here
    setIsSuccess(true);
    // TODO: Order logic here
  };

  const calculateTotal = () =>
    cartProducts.reduce((total, { productId, quantity }) => {
      const product = products.find((p) => p._id === productId);
      return total + (product ? product.price * quantity : 0);
    }, 0);

  const onCloseConfirmOrderPress = () => {
    // TODO: update state
  };

  if (isSuccess) {
    return (
      <PageContainer>
        <Center>
          <Box>
            <Title>Dziękujemy za Twoje zamówienie!</Title>
            <p>Powiadomimy Cię, gdy Twoje zamówienie będzie w drodze.</p>
            <Button onPress={onCloseConfirmOrderPress} primary>
              Zamknij
            </Button>
          </Box>
        </Center>
      </PageContainer>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <Title>Twój Koszyk</Title>
            {!cartProducts.length ? (
              <EmptyCartMessage>Twój koszyk jest pusty.</EmptyCartMessage>
            ) : (
              <Table>
                <thead>
                  <tr>
                    <th>Produkt</th>
                    <th>Ilość</th>
                    <th>Cena</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => {
                    const productInCart = cartProducts.find(
                      (item) => item.productId === product._id
                    );
                    return (
                      <ProductRow key={product._id}>
                        <td>
                          <ProductImage>
                            <img src={product.images[0]} alt={product.title} />
                          </ProductImage>
                          {product.title}
                        </td>
                        <td>
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
                        <td>
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
                  placeholder="Adres"
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
      </Center>
    </>
  );
};

export default CartPage;
