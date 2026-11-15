# Portfolio Frontend

React portfolio migrated from Create React App to Vite.

## Requirements

- Node.js 22.12+ (recommended for the current Vite 8 toolchain)
- npm

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

The Vite development server runs at http://localhost:5173.

## Production build

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```

## Notes

- React components, existing CSS, assets, Firebase Auth, React Router, Axios API calls,
  Tailwind CSS 3, Wired Elements and Rough.js have been retained.
- Tailwind remains on v3 because the existing stylesheet uses the v3 `@tailwind` directives.
- React Router remains on v6 to avoid an unrelated routing migration.
- Firebase browser configuration remains in `src/config/firebase.js`; Firebase web API keys
  are identifiers, not server secrets. Protect the project with Firebase Authentication
  and Security Rules. Never put service-account credentials in frontend code.
- Configure any future public environment variables with the `VITE_` prefix and add them
  to `.env.example`. Vite-prefixed variables are visible to users in the browser.
