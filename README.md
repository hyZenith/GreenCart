
# GreenCart — Grocery E-commerce (MERN)

A full-stack grocery e-commerce application built with MongoDB, Express, React (Vite), and Node.js. It includes a customer-facing React app and an Express API server with image uploads (Cloudinary), authentication (JWT cookies), and basic order/cart/address flows.

This README covers local setup, environment variables, common troubleshooting, and quick developer notes.

---

## Repository layout

- `client/` — React + Vite frontend
- `server/` — Express backend (ESM) with Mongoose models
- `README.md` — this file


## Requirements

- Node.js 18+ (recommended)
- npm or pnpm
- MongoDB (local or cloud)
- Cloudinary account (for image uploads)


## Environment variables

Create a `.env` file in the `server/` folder with the following variables:

```
PORT=5000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<a-strong-secret>
CLOUDINARY_CLOUD_NAME=<cloud name>
CLOUDINARY_API_KEY=<api key>
CLOUDINARY_API_SECRET=<api secret>
```

Notes:
- For development with Vite, the client is configured to proxy `/api` → `http://localhost:5000` (see `client/vite.config.js`). That keeps cookies and credentials working across dev servers.
- Ensure `JWT_SECRET` is set so `authUser` middleware can verify tokens.


## Install & run (development)

1. Install server dependencies and start the API:

```pwsh
cd server
npm install
npm run server
```

By default the server uses `nodemon`. If the server fails to start, check the terminal logs for missing env variables or DB connection errors.

2. Install client dependencies and start Vite dev server:

```pwsh
cd client
npm install
npm run dev
```

Open the app in your browser (Vite will print the URL, usually `http://localhost:5173`).


## Build & run (production-ish)

- Build client:

```pwsh
cd client
npm run build
```

- Serve static build with any static server and point API to the `server/` address. The project does not include a combined production script; you can use nginx or serve to host the built client.

## Contributing

- Create a branch for each change. Keep changes small. Add brief tests where possible.


## License

This repo contains example/demo code. Add a license file if you plan to open-source or release.

