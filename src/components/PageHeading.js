import styled from "styled-components";
import colors from "styles/colors";

export const PageHead = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
  margin: 8px 0 20px;
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.01em;
  line-height: 1.2;
  color: ${colors.textPrimary};
`;

export const PageMeta = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${colors.primaryDark};
`;

export const PageSubtitle = styled.p`
  margin: 6px 0 0;
  width: 100%;
  font-size: 0.95rem;
  line-height: 1.5;
  color: ${colors.textSecondary};
`;
