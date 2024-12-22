import React from "react";
import Logo from "./Logo";
import SearchWithCategory from "./SearchWithCategory";
import Menu from "./Menu";

export default function Header() {
  return (
    <header
      style={{
        backgroundColor: "#111",
        padding: "10px 40px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Logo />
        <SearchWithCategory />
        <Menu />
      </div>
    </header>
  );
}
