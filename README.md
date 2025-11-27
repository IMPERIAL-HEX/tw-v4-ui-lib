# Tailwind v4 UI Package POC

This repository is a proof of concept (POC) for creating a UI component package using **Tailwind CSS v4** in a monorepo setup. The goal is to build a reusable UI library that can be consumed both within the monorepo and by external projects.

## Overview

This monorepo demonstrates how to:
- Build a UI component package with Tailwind CSS v4
- Share components across multiple applications within a monorepo
- Distribute the package for use in external projects
- Handle CSS generation and distribution properly

## Repository Structure

```
tw-v4-ui-lib/
├── apps/
│   └── web/              # Next.js application consuming the UI package
├── packages/
│   ├── ui/               # UI component library package
│   ├── eslint-config/   # Shared ESLint configurations
│   └── typescript-config/ # Shared TypeScript configurations
└── package.json          # Root package.json
```

## Main Configuration

### Key Principles

1. **No Tailwind Import in `index.css`**: The `packages/ui/src/index.css` file does **not** include `@import "tailwindcss"`. Instead, it only contains:
   - `@source` directive to reference source files
   - Custom theme configuration
   - CSS custom properties and base layer styles
   
   This keeps the source CSS clean and allows the consuming application to handle Tailwind processing.

2. **Keep the Source**: The source CSS file (`src/index.css`) is preserved and copied to the `dist` folder during build using `vite-plugin-static-copy`.

3. **IntelliSense Support**: A `.settings.json` file (or `.vscode/settings.json`) should be configured in the monorepo to enable proper IntelliSense for TypeScript and Tailwind CSS across workspace packages.

4. **CSS Distribution**: The styles are copied to the `dist` folder using `vite-plugin-static-copy` during the build process. The Vite configuration uses:
   ```js
   viteStaticCopy({
     targets: [
       {
         src: "src/index.css",
         dest: ".",
         rename: "styles.css",
       },
     ],
   })
   ```

5. **Consumer Configuration**: For consumers (both within the monorepo and external projects), the `globals.css` follows the same pattern:
   ```css
   @import "tailwindcss";
   @import "@imperial-hex/test-ui/styles.css";
   ```

### Package Structure

The UI package (`@imperial-hex/test-ui`) exports:
- Components: `import { Button } from "@imperial-hex/test-ui"`
- Utils: `import { cn } from "@imperial-hex/test-ui/utils"`
- Styles: `import "@imperial-hex/test-ui/styles.css"`

## Usage

### Within the Monorepo

In `apps/web/app/globals.css`:
```css
@import "tailwindcss";
@import "@imperial-hex/test-ui/styles.css";
```

### External Projects

For external projects consuming this package, see the example implementation:
**[Test-Package-UI](https://github.com/IMPERIAL-HEX/Test-Package-UI)**

The `globals.css` configuration is identical to the monorepo setup:
```css
@import "tailwindcss";
@import "@imperial-hex/test-ui/styles.css";
```

## CSS Chunking and Optimization

For advanced CSS chunking strategies and avoiding duplicate utility generation, refer to:
- [Stack Overflow: Shipping a UI package alongside projects in a monorepo](https://stackoverflow.com/questions/79820754/shipping-a-ui-package-alongside-projects-in-a-monorepo/79820755#79820755)

This discussion covers important considerations for:
- Avoiding duplicate CSS utility generation
- Proper Tailwind configuration in monorepo setups
- Optimizing CSS output for production

## Development

### Install Dependencies

```sh
pnpm install
```

### Build

Build all packages and apps:
```sh
pnpm build
```

Build only the UI package:
```sh
pnpm --filter @imperial-hex/test-ui build
```

### Development Mode

Run all apps in development mode:
```sh
pnpm dev
```

Run only the web app:
```sh
pnpm --filter web dev
```

Watch the UI package for changes:
```sh
pnpm --filter @imperial-hex/test-ui dev
```

## Technologies

- **Turborepo**: Monorepo build system
- **Vite**: Build tool for the UI package
- **Tailwind CSS v4**: Utility-first CSS framework
- **Next.js**: React framework for the web app
- **TypeScript**: Type safety
- **pnpm**: Package manager

## Learn More

- [Turborepo Documentation](https://turborepo.com/docs)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)
