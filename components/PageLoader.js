import styled from "styled-components";
import { MutatingDots } from "react-loader-spinner";

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
        color="#e74c3c"
        secondaryColor="#111"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
      />
    </LoaderWrapper>
  );
};

export default PageLoader;
