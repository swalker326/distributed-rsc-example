# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a pnpm monorepo containing React Server Components (RSC) examples using Parcel. The workspace includes:

- **client/**: Client-driven app with embedded React Server Components
- **cloudflare-server/**: Server-driven app built for Cloudflare Workers

## Common Commands

### Client Example
```bash
cd client
pnpm start    # Start development server
pnpm build    # Build for production
```

### Cloudflare Server Example
```bash
cd cloudflare-server
pnpm clean    # Clean dist directory
pnpm watch    # Watch and build (run in first terminal)
pnpm start    # Start with wrangler (run in second terminal)
pnpm build    # Build for production
```

### Workspace-level
```bash
pnpm install  # Install dependencies for all packages
```

## Architecture

### Client Example Architecture
- **Client-driven with embedded RSCs**: Traditional client-rendered React app that loads server components via fetch
- **client/client/**: Contains client-side React components (`index.tsx`, `App.tsx`)
- **client/server/**: Contains server components and Express server (`RSC.tsx`, `server.tsx`)
- Uses `fetchRSC` from `@parcel/rsc/client` to load server components
- Server renders RSC payload (not HTML) for client consumption

### Cloudflare Server Example Architecture
- **Server-driven RSC app**: Full-page server rendering with client hydration
- **src/server.tsx**: Main Cloudflare Worker entry point
- **src/Page.tsx**: Server component marked with `"use server-entry"` directive
- **src/client.tsx**: Client entry point for hydration
- Uses `wrangler.jsonc` for Cloudflare Workers configuration with Node.js compatibility

## Key Technologies

- **Parcel**: Bundler with built-in RSC support (`@parcel/rsc`, `@parcel/runtime-rsc`)
- **React 19**: With `react-server-dom-parcel` for RSC payload handling
- **Express** (client example): Traditional Node.js server
- **Cloudflare Workers** (server example): Edge runtime with wrangler for deployment

## Development Workflow

### For Client Example
Single terminal: `cd client && pnpm start`

### For Cloudflare Server Example
Two terminals required:
1. Terminal 1: `cd cloudflare-server && pnpm watch`
2. Terminal 2: `cd cloudflare-server && pnpm start`

This is necessary because Parcel doesn't have built-in Cloudflare Workers dev server support.

## Parcel Configuration

Both examples use Parcel's `targets` configuration in package.json:
- **react-client**: For client-side bundles
- **react-server**: For server component bundles
- Code splitting creates shared bundles for common dependencies between entries