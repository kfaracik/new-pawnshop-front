import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import SearchWithCategory from "./SearchWithCategory";
import Menu from "./Menu";
import { LayoutInner } from "styles/layout";
import colors from "styles/colors";

const HeaderRoot = styled.header`
  background: ${colors.backgroundDark};
  padding: 12px 0 14px;
  border-bottom: 1px solid ${colors.borderSubtle};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
`;

const HeaderRow = styled(LayoutInner)`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media screen and (min-width: 1024px) {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 20px;
  }
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  min-height: 52px;

  @media screen and (min-width: 1024px) {
    min-width: 0;
  }
`;

const MobileActions = styled.div`
  display: flex;
  align-items: center;

  @media screen and (min-width: 1024px) {
    display: none;
  }
`;

const DesktopActions = styled.div`
  display: none;

  @media screen and (min-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

const SearchRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media screen and (min-width: 1024px) {
    min-width: 0;
  }
`;

const Header = () => {
  return (
    <HeaderRoot>
      <HeaderRow>
        <TopRow>
          <Logo />
          <MobileActions>
            <Menu />
          </MobileActions>
        </TopRow>
        <SearchRow>
          <SearchWithCategory />
        </SearchRow>
        <DesktopActions>
          <Menu />
        </DesktopActions>
      </HeaderRow>
    </HeaderRoot>
  );
};

export default Header;
