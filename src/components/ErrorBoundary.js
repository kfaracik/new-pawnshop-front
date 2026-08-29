import React from "react";

// Top-level error boundary: if a component throws during render, show a
// friendly Polish fallback instead of a blank white screen. Class component
// because React error boundaries require lifecycle methods.
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (typeof console !== "undefined") {
      console.error("[ErrorBoundary]", error, info?.componentStack);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false });
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            padding: "40px 20px",
            textAlign: "center",
            fontFamily:
              "var(--app-font), -apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "1.6rem", color: "#1b1712" }}>
            Coś poszło nie tak
          </h1>
          <p style={{ margin: 0, color: "#6c6456", maxWidth: "42ch" }}>
            Wystąpił nieoczekiwany błąd. Odśwież stronę — jeśli problem będzie się
            powtarzał, spróbuj ponownie za chwilę.
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            style={{
              minHeight: "44px",
              padding: "0 22px",
              borderRadius: "12px",
              border: "0",
              background: "#c9a227",
              color: "#12100a",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
          >
            Odśwież stronę
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
