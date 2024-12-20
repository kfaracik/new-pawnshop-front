import React from "react";
import Logo from "./Logo";
import SearchWithCategory from "./SearchWithCategory";
import Menu from "./Menu";

export default function Header() {
  return (
    <header
      style={{ backgroundColor: "#111", color: "#fff", padding: "10px 30px" }}
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
