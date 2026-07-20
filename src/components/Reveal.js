import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const RevealBox = styled.div`
  ${(props) =>
    props.$armed &&
    `
    opacity: ${props.$visible ? 1 : 0};
    transform: translateY(${props.$visible ? "0" : "24px"});
    transition:
      opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${props.$delay}ms,
      transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${props.$delay}ms;
  `}

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    transition: none;
  }
`;

export default function Reveal({ children, delay = 0, ...rest }) {
  const ref = useRef(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (
      reduced ||
      typeof IntersectionObserver === "undefined" ||
      !window.innerHeight
    ) {
      return undefined;
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      return undefined;
    }

    // Arm (hide) only once the observer proves it is alive: the spec
    // guarantees an initial callback after observe(), so a broken IO
    // implementation simply leaves the content visible.
    let pending = 0;
    const scroller = document.getElementById("__next");

    const cleanup = () => {
      observer.disconnect();
      if (pending) clearTimeout(pending);
      if (scroller) scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
    };

    const reveal = () => {
      setVisible(true);
      cleanup();
    };

    // Scroll fallback: some embedded webviews deliver the initial IO
    // callback but drop scroll-driven ones — never leave content hidden.
    // Timer-based throttle on purpose: rAF can be frozen (hidden tabs,
    // battery-saver webviews) while timers keep firing.
    const checkInView = () => {
      pending = 0;
      if (el.getBoundingClientRect().top < window.innerHeight * 0.96) {
        reveal();
      }
    };
    const onScroll = () => {
      if (!pending) pending = window.setTimeout(checkInView, 120);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal();
          } else {
            setArmed(true);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    if (scroller) scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return cleanup;
  }, []);

  return (
    <RevealBox ref={ref} $armed={armed} $visible={visible} $delay={delay} {...rest}>
      {children}
    </RevealBox>
  );
}
