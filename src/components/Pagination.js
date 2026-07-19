import React from "react";
import styled from "styled-components";
import colors from "styles/colors";

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
`;

const Item = styled.button`
  min-width: 40px;
  height: 40px;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid #ececec;
  background: #fff;
  color: #4a4a4a;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;

  &:hover:not(:disabled):not([aria-current="page"]) {
    background: #fff8e8;
    border-color: ${colors.primaryLight};
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  &[aria-current="page"] {
    background: ${colors.primary};
    border-color: ${colors.primary};
    color: #151515;
  }
`;

const Ellipsis = styled.span`
  min-width: 24px;
  text-align: center;
  color: #9a9a9a;
  font-weight: 600;
`;

const buildRange = (current, total) => {
  const delta = 1;
  const pages = [];
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  pages.push(1);
  if (left > 2) {
    pages.push("left-ellipsis");
  }
  for (let page = left; page <= right; page += 1) {
    pages.push(page);
  }
  if (right < total - 1) {
    pages.push("right-ellipsis");
  }
  if (total > 1) {
    pages.push(total);
  }
  return pages;
};

export default function Pagination({ page, count, onChange }) {
  const current = Math.min(Math.max(1, page || 1), count);

  if (!count || count < 2) {
    return null;
  }

  const goTo = (target) => {
    const next = Math.min(Math.max(1, target), count);
    if (next !== current) {
      onChange(next);
    }
  };

  return (
    <Nav aria-label="Paginacja">
      <Item
        type="button"
        onClick={() => goTo(current - 1)}
        disabled={current <= 1}
        aria-label="Poprzednia strona"
      >
        ‹
      </Item>
      {buildRange(current, count).map((entry) =>
        typeof entry === "number" ? (
          <Item
            key={entry}
            type="button"
            onClick={() => goTo(entry)}
            aria-current={entry === current ? "page" : undefined}
            aria-label={`Strona ${entry}`}
          >
            {entry}
          </Item>
        ) : (
          <Ellipsis key={entry} aria-hidden="true">
            …
          </Ellipsis>
        )
      )}
      <Item
        type="button"
        onClick={() => goTo(current + 1)}
        disabled={current >= count}
        aria-label="Następna strona"
      >
        ›
      </Item>
    </Nav>
  );
}
