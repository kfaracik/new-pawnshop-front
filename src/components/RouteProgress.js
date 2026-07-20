import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import colors from "styles/colors";

const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  z-index: 3000;
  width: ${(props) => props.$progress}%;
  opacity: ${(props) => (props.$active ? 1 : 0)};
  background: linear-gradient(90deg, ${colors.primaryDark}, ${colors.primaryLight});
  box-shadow: 0 0 8px rgba(201, 162, 39, 0.55);
  transition: width 0.25s ease, opacity 0.4s ease 0.15s;
  pointer-events: none;

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

export default function RouteProgress() {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const clear = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    const start = (url, { shallow } = {}) => {
      if (shallow || url === router.asPath) return;
      clear();
      setActive(true);
      setProgress(12);
      timerRef.current = setInterval(() => {
        setProgress((value) => (value < 82 ? value + (82 - value) * 0.18 : value));
      }, 180);
    };

    const finish = () => {
      clear();
      setProgress(100);
      setActive(false);
      window.setTimeout(() => setProgress(0), 500);
    };

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", finish);
    router.events.on("routeChangeError", finish);
    return () => {
      clear();
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", finish);
      router.events.off("routeChangeError", finish);
    };
  }, [router]);

  return <Bar aria-hidden="true" $active={active} $progress={progress} />;
}
