import React from "react";
import Logo from "./Logo";
import SearchWithCategory from "./SearchWithCategory";
import Menu from "./Menu";

const Header = () => {
  return (
    <header
      style={{
        backgroundColor: "#111",
        padding: "10px 20px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <Logo />
        <SearchWithCategory />
        <Menu />
      </div>
    </header>
  );
};

export default Header;
