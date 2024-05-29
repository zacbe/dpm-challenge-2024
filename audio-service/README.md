# Basic Project Setup

```bash
# initialize a new project
$ npm init -y
```

# Install and Initialize TypeScript

```bash
# Install TypeScript as a development dependency
$ npm install typescript --save-dev

# Initialize TypeScript configuration
$ npx tsc --init
```

# Configure TypeScript

Create or modify the `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "target": "ESNext", // Latest ECMAScript features
    "module": "CommonJS", // CommonJS module system
    "moduleResolution": "Node", // Resolve modules like Node.js
    "outDir": "dist", // Output to "dist" directory
    "rootDir": "src", // Source files in "src"
    "esModuleInterop": true, // CommonJS compatibility
    "strict": true, // Strict type-checking
    "sourceMap": false, // No source maps
    "types": ["express"], // Include "express" types
    "resolveJsonModule": true // Import JSON files
  },
  "include": ["src/**/*", "types/**/*"], // Include "src" and "types"
  "exclude": ["node_modules", "dist"] // Exclude "node_modules" and "dist"
}
```

# Install Development Dependencies

```bash
# Node.js type definitions
$ npm install @types/node --save-dev

# Express type definitions
$ npm install @types/express --save-dev

# Run TypeScript files directly without compilation
$ npm install tsx --save-dev

# Cross-platform tool for removing directories/files
$ npm install rimraf --save-dev
```

# Install Dependencies

```bash
# Express library
$ npm install express
```

# Add Helpful Scripts

In your `package.json` file, add custom `scripts` for common tasks:

```json
"scripts": {
  "clean": "rimraf dist", // Remove the "dist" directory
  "build": "npm run clean && tsc", // Clean and compile TypeScript files
  "start": "tsx src/index.ts", // Run the main file directly using tsx
  "dev": "tsx watch src/index.ts", // Watch for changes and re-run the app
}
```

# Project Structure

```
└── 📁src                 // Root TypeScript directory
    └── 📁api
        └── 📁controllers // Handles requests/business logic
            └── index.ts
        └── 📁routes      // Maps URLs to controllers
            └── index.ts
    └── 📁libs            // Shared libraries/utilities
        └── index.ts
    └── 📁middleware      // Request/response middleware functions
        └── index.ts
    └── 📁models          // Database models/entities
        └── index.ts
    └── 📁services        // Business/application services layer
        └── index.ts
    └── 📁types        // TypeCcript Global types
        └── global.d.ts
    └── 📁utils           // Helper utilities
        └── index.ts
    └── index.ts          // Main application file
    └── server.ts         // Server entry point
```
