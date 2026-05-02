# Design System

This project now has a minimal design-system layer.

## Current scope

- `tokens.ts` holds shared primitives for color, spacing, radius, typography and shadows.
- `styles/colors.js` remains as a compatibility adapter for legacy JS files.
- `styles/muiTheme.js` consumes the shared tokens.

## Intended usage

- New shared UI primitives should read from `design-system/tokens.ts`.
- New feature code should avoid redefining raw hex values unless there is a strong reason.
- As migration progresses, legacy styled-components should move from ad-hoc values to token-driven styles.
