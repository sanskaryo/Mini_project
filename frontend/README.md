# Frontend Application

A modern React application built with Vite for fast development and optimized builds.

## 🚀 Tech Stack

- **React 19.1.1** - A JavaScript library for building user interfaces
- **Vite 7.1.2** - Next generation frontend tooling for fast builds and HMR
- **ESLint** - Code linting with React-specific rules
- **CSS3** - Modern styling with CSS custom properties and media queries

## 📁 Project Structure

```
frontend/
├── public/           # Static assets
│   └── vite.svg     # Vite logo
├── src/             # Source code
│   ├── assets/      # React assets
│   │   └── react.svg
│   ├── App.jsx      # Main App component
│   ├── App.css      # App-specific styles
│   ├── index.css    # Global styles
│   └── main.jsx     # Application entry point
├── index.html       # HTML template
├── package.json     # Dependencies and scripts
├── vite.config.js   # Vite configuration
└── eslint.config.js # ESLint configuration
```

## 🛠️ Development

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Available Scripts

- **`npm run dev`** - Start development server with hot module replacement
- **`npm run build`** - Build the project for production
- **`npm run preview`** - Preview the production build locally
- **`npm run lint`** - Run ESLint to check code quality

### Development Server

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Building for Production

Create an optimized production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 📝 Code Quality

This project uses ESLint with React-specific rules to maintain code quality:

- React Hooks rules
- React Refresh rules for Fast Refresh compatibility
- Custom rules for unused variables

Run linting:
```bash
npm run lint
```

## 🎨 Styling

- Uses CSS custom properties for theming
- Supports both light and dark color schemes
- Responsive design with media queries
- Modern CSS features like `place-items` and `color-scheme`

## 🔧 Configuration

### Vite Configuration
The project uses the default Vite configuration with React plugin for Fast Refresh.

### ESLint Configuration
Custom ESLint setup with:
- React Hooks plugin
- React Refresh plugin
- Browser globals
- Modern ECMAScript features

## 📦 Dependencies

### Runtime Dependencies
- `react` - React library
- `react-dom` - React DOM rendering

### Development Dependencies
- `@vitejs/plugin-react` - Vite React plugin
- `eslint` - Code linting
- Various ESLint plugins for React development

## 🚀 Deployment

After building the project, deploy the contents of the `dist/` folder to your preferred hosting platform.

## 📄 License

This project is private and not licensed for public use.