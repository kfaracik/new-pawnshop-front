import React from "react";
import styled from "styled-components";
import { MutatingDots } from "react-loader-spinner";
import colors from "styles/colors";

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const PageLoader = () => {
  return (
    <LoaderWrapper>
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color={colors.primary}
        secondaryColor={colors.secondaryDark}
        radius="12.5"
        ariaLabel="mutating-dots-loading"
      />
    </LoaderWrapper>
  );
};

export default PageLoader;
