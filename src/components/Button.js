import React from "react";
import styled, { css } from "styled-components";
import colors from "styles/colors";

export const buttonBaseStyle = css`
  appearance: none;
  border: 1px solid transparent;
  min-height: 44px;
  padding: 0 16px;
  border-radius: 10px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  line-height: 1;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;

  svg {
    height: 18px;
    margin-right: 0;
  }

  &:hover {
    transform: translateY(-1px);
  }

  &:disabled,
  &[aria-disabled="true"] {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const buttonPrimaryStyle = css`
  background-color: ${colors.primary};
  border-color: ${colors.primaryDark};
  color: ${colors.primaryContrastText};

  &:hover {
    background-color: ${colors.primaryLight};
    border-color: ${colors.primary};
    box-shadow: 0 10px 24px rgba(201, 162, 39, 0.22);
  }
`;

export const buttonSecondaryStyle = css`
  background-color: #fff;
  border-color: #ddd2b0;
  color: ${colors.primaryDark};

  &:hover {
    background-color: #fff8e8;
    border-color: ${colors.primary};
  }
`;

export const buttonDarkStyle = css`
  background-color: #171717;
  border-color: #2f2f2f;
  color: ${colors.textInverse};

  &:hover {
    background-color: #222;
    border-color: #414141;
  }
`;

export const buttonGhostStyle = css`
  background-color: transparent;
  border-color: transparent;
  color: ${colors.primaryDark};

  &:hover {
    background-color: rgba(201, 162, 39, 0.1);
    color: ${colors.primary};
  }
`;

export const buttonPillStyle = css`
  border-radius: 999px;
`;

export const ButtonStyle = css`
  ${buttonBaseStyle}

  ${(props) =>
    props.block &&
    css`
      display: inline-flex;
      width: 100%;
    `}
  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      border-color: #e4e4e4;
      color: ${colors.textPrimary};
    `}
  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `}
  ${(props) =>
    props.black &&
    !props.outline &&
    css`
      ${buttonDarkStyle}
    `}
  ${(props) =>
    props.black &&
    props.outline &&
    css`
      background-color: transparent;
      color: ${colors.textPrimary};
      border: 1px solid #303030;
    `}
  ${(props) =>
    props.primary &&
    !props.outline &&
    css`
      ${buttonPrimaryStyle}
    `}
  ${(props) =>
    props.primary &&
    props.outline &&
    css`
      ${buttonSecondaryStyle}
    `}
  ${(props) =>
    props.size === "l" &&
    css`
      min-height: 50px;
      padding: 0 20px;
      font-size: 1rem;
      svg {
        height: 20px;
      }
    `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
