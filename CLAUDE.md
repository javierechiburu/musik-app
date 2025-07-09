# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application built with TypeScript and Tailwind CSS v4. It uses the App Router architecture and follows modern React patterns with TypeScript strict mode enabled.

## Development Commands

- `npm run dev` - Start development server with Turbopack (recommended for faster builds)
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint with Next.js and TypeScript configurations

## Architecture

### Framework Stack
- **Next.js 15** with App Router (src/app directory structure)
- **React 19** with TypeScript
- **Tailwind CSS v4** with inline theme configuration
- **ESLint** with Next.js core web vitals and TypeScript rules

### Project Structure
```
src/
  app/
    layout.tsx     # Root layout with font configuration
    page.tsx       # Home page component
    globals.css    # Global styles and Tailwind imports
```

### Key Patterns
- Uses App Router with `src/app` directory structure
- TypeScript path aliases configured (`@/*` maps to `./src/*`)
- Geist font family (sans and mono) loaded via `next/font/google`
- CSS custom properties for theming with dark mode support
- Tailwind CSS v4 with inline theme configuration in globals.css

### Styling Approach
- Tailwind CSS v4 with `@import "tailwindcss"`
- CSS custom properties for theming (--background, --foreground)
- Automatic dark mode via `prefers-color-scheme`
- Font variables integrated with Tailwind theme

### TypeScript Configuration
- Strict mode enabled with target ES2017
- Path alias `@/*` for src directory imports
- Next.js plugin for enhanced TypeScript support
- ESLint integration with Next.js and TypeScript rules