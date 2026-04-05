import styled from "styled-components";

export const CONTENT_MAX_WIDTH = "1200px";
export const CONTENT_HORIZONTAL_PADDING = "clamp(16px, 3vw, 32px)";

export const LayoutInner = styled.div`
  width: min(${CONTENT_MAX_WIDTH}, calc(100% - (2 * ${CONTENT_HORIZONTAL_PADDING})));
  margin-inline: auto;
`;
