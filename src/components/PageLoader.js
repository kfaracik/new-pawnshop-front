import React from "react";
import styled from "styled-components";
import colors from "styles/colors";

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoaderDots = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(3, 16px);
  gap: 8px;
  align-items: center;
  justify-content: center;

  span {
    width: 16px;
    height: 16px;
    border-radius: 999px;
    background: ${colors.primary};
    animation: loaderPulse 900ms ease-in-out infinite;
  }

  span:nth-child(2) {
    background: ${colors.secondaryDark};
    animation-delay: 120ms;
  }

  span:nth-child(3) {
    animation-delay: 240ms;
  }

  @keyframes loaderPulse {
    0%,
    100% {
      opacity: 0.45;
      transform: translateY(0) scale(0.9);
    }

    50% {
      opacity: 1;
      transform: translateY(-6px) scale(1);
    }
  }
`;

const PageLoader = () => {
  return (
    <LoaderWrapper>
      <LoaderDots role="status" aria-label="Ładowanie">
        <span />
        <span />
        <span />
      </LoaderDots>
    </LoaderWrapper>
  );
};

export default PageLoader;
