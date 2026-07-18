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
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 9px 16px;
`;

const HeaderRoot = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #ececec;
`;

const HeaderRow = styled(LayoutInner)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 12px;
  padding-bottom: 12px;

  @media screen and (min-width: 1024px) {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: clamp(14px, 2vw, 28px);
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
    min-height: auto;
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
      <AnnouncementBar>
        Bezpłatna wycena w 15 minut · Gotówka od ręki · 20 lat na rynku
      </AnnouncementBar>
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
