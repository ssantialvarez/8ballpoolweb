# Project Overview

This project is the **frontend** for a web application to **schedule and organize 8 Ball Pool matches**.
It is built using **Next.js App Router**, **React**, and **TypeScript**, ensuring a modern, server-component-first approach and a clean, mobile-first design.

---

## Technology Stack and Configuration 🛠️

- **Framework**: **Next.js** (using the **App Router** structure).
- **Library**: **React** for UI components. Prefer **React Server Components (RSC)** where possible (e.g., in layout and page files).
- **Language**: **TypeScript** (strict mode enabled) for all logic and components.
- **Styling**: **Tailwind CSS** for utility-first styling.
- **Icons**: Use **Lucide React** for all icons.
- **State Management**: Use **React Hooks** for local state.
- **Data Fetching**: Use **Axios** for all client-side API communication with the backend.

---

## Folder Structure and Routing (App Router) 📂

The code base does **not use a `/src` folder**. The root of the application and routing is the **`/app`** directory.

- **`/app`**: Contains all routing logic (pages, layouts, templates).
    - **`page.tsx`**: Defines a route's UI. These are typically **Server Components**.
    - **`layout.tsx`**: Defines the shared UI for a segment and are **Server Components**.
    - **`loading.tsx`, `error.tsx`**: Next.js UI files.
- **`/components`**: Reusable UI components. **Organize by domain** (e.g., `/components/matches`, `/components/ui`).
- **`/hooks`**: Custom React Hooks for reusable logic.
- **`/types`**: TypeScript declaration files and interface definitions (e.g., `Match`, `Player`).
- **`/lib`**: Utility and configuration files.
    - **`/lib/api`**: Location for the **configured Axios client** and API helper functions.
    - **`/lib/utils`**: General utility functions.

---

## Coding Standards and Next.js Best Practices 🧑‍💻

- **Server vs. Client**: Prioritize **React Server Components (RSC)** by default (no `'use client'` directive). Only use `'use client'` when interactivity, browser APIs, or client-side hooks are absolutely necessary.
- **Data Fetching (Server)**: Utilize native `fetch()` or direct database access within **Server Components** and Next.js Route Handlers.
- **Data Fetching (Client)**: Client components must use the **configured Axios client** for API calls.
- **Components**: Use **functional components** with ES6 arrow function syntax.
- **Icons**: When an icon is needed, import the corresponding component from **`lucide-react`**.
- **Naming**: Use **PascalCase** for components and types/interfaces. Use **camelCase** for variables, functions, and files.
- **Formatting**: Use **single quotes** for strings. End all statements with a **semicolon**.

---

## Data Fetching Standards (Axios) 🌐

- **Client Setup**: A dedicated **Axios client instance** must be created and configured in `/lib/api/apiClient.ts` to handle base URL, headers, and global error interception.
- **Implementation**: All data retrieval and mutation logic in **Client Components** must use the configured Axios client.
- **Data Hooks**: Extract complex fetching logic into custom hooks or services to manage loading, error, and data states.

---

## UI/UX Guidelines ✨

- **Theme**: The application supports a **toggle for light and dark mode**. Components must be theme-aware.
- **Design**: Maintain a **modern, clean, and minimalist aesthetic** using Tailwind CSS.
- **Responsiveness**: Focus on **mobile-first responsiveness** for all components.