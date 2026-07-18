import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import SearchWithCategory from "./SearchWithCategory";
import Menu from "./Menu";
import { LayoutInner } from "styles/layout";
import colors from "styles/colors";

const AnnouncementBar = styled.div`
  background: ${colors.black};
  color: ${colors.primaryLight};
  text-align: center;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 8px 16px;
`;

const HeaderRoot = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid #ececec;
`;

const HeaderRow = styled(LayoutInner)`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  column-gap: 16px;
  row-gap: 12px;
  padding-top: 12px;
  padding-bottom: 12px;

  @media screen and (min-width: 1024px) {
    grid-template-columns: auto minmax(0, 1fr) auto;
    column-gap: clamp(16px, 2.4vw, 32px);
    row-gap: 0;
  }
`;

const LogoCell = styled.div`
  grid-column: 1;
  grid-row: 1;
  min-width: 0;
`;

const ActionsCell = styled.div`
  grid-column: 2;
  grid-row: 1;
  justify-self: end;
  min-width: 0;

  @media screen and (min-width: 1024px) {
    grid-column: 3;
  }
`;

const SearchCell = styled.div`
  grid-column: 1 / -1;
  grid-row: 2;
  min-width: 0;

  @media screen and (min-width: 1024px) {
    grid-column: 2;
    grid-row: 1;
  }
`;

const Header = () => {
  return (
    <HeaderRoot>
      <AnnouncementBar>
        Bezpłatna wycena w 15 minut · Gotówka od ręki · 20 lat na rynku
      </AnnouncementBar>
      <HeaderRow>
        <LogoCell>
          <Logo />
        </LogoCell>
        <SearchCell>
          <SearchWithCategory />
        </SearchCell>
        <ActionsCell>
          <Menu />
        </ActionsCell>
      </HeaderRow>
    </HeaderRoot>
  );
};

export default Header;
