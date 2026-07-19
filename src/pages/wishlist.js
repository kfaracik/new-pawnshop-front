import React, { useContext } from "react";
import Link from "next/link";
import styled from "styled-components";
import { FiHeart } from "react-icons/fi";
import SeoHead from "components/SeoHead";
import PageContainer from "components/PageContainer";
import { ProductItem } from "components/ProductItem";
import { PageHead, PageTitle, PageMeta } from "components/PageHeading";
import { WishlistContext } from "context/WishlistContext";
import { useProducts } from "services/api/useProductApi";
import { buttonBaseStyle, buttonPrimaryStyle } from "components/Button";
import colors from "styles/colors";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

const EmptyState = styled.div`
  display: grid;
  justify-items: center;
  gap: 14px;
  text-align: center;
  padding: 56px 20px;
  border: 1px solid #ececec;
  border-radius: 18px;
  background: ${colors.backgroundPaper};

  svg {
    color: #e0245e;
  }

  h2 {
    margin: 0;
    font-size: 1.25rem;
  }

  p {
    margin: 0;
    color: ${colors.textSecondary};
    max-width: 420px;
  }
`;

const BrowseLink = styled(Link)`
  ${buttonBaseStyle}
  ${buttonPrimaryStyle}
  margin-top: 6px;
`;

export default function WishlistPage() {
  const { wishlist } = useContext(WishlistContext);
  const { data, isLoading } = useProducts(wishlist);

  const products = Array.isArray(data) ? data : [];
  const ordered = wishlist
    .map((id) => products.find((product) => String(product._id) === String(id)))
    .filter(Boolean);

  return (
    <PageContainer>
      <SeoHead
        title="Ulubione | Nowy Lombard"
        description="Twoje zapisane produkty w Nowym Lombardzie."
        path="/wishlist"
        noindex
      />
      <PageHead>
        <PageTitle>Ulubione</PageTitle>
        {wishlist.length > 0 && <PageMeta>{wishlist.length} produktów</PageMeta>}
      </PageHead>

      {wishlist.length === 0 ? (
        <EmptyState>
          <FiHeart size={56} />
          <h2>Twoja lista ulubionych jest pusta</h2>
          <p>
            Dodawaj produkty do ulubionych, klikając ikonę serca na kartach
            produktów — wrócisz do nich w każdej chwili.
          </p>
          <BrowseLink href="/products">Przeglądaj produkty</BrowseLink>
        </EmptyState>
      ) : isLoading ? (
        <PageMeta>Ładowanie ulubionych…</PageMeta>
      ) : (
        <Grid>
          {ordered.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </Grid>
      )}
    </PageContainer>
  );
}
