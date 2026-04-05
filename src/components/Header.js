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
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  min-height: 52px;
`;

const SearchRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Header = () => {
  return (
    <HeaderRoot>
      <HeaderRow>
        <TopRow>
          <Logo />
          <Menu />
        </TopRow>
        <SearchRow>
          <SearchWithCategory />
        </SearchRow>
      </HeaderRow>
    </HeaderRoot>
  );
};

export default Header;
