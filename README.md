# VendaLink — Vhembe Community Marketplace

VendaLink is a full-stack community marketplace demo adapted for Venda and the wider Vhembe area in Limpopo, South Africa. People can browse local listings, register, sell items, arrange runner deliveries, and view suggested public meet-up areas.

**Important:** The sample accounts, products, runners, distances and meet-up suggestions are demo data. Meet-up suggestions are not safety certifications. Confirm the place, opening hours, public access and security before meeting anyone.

## Areas included

Thohoyandou CBD, Sibasa, Muledane, Shayandima, Tshakhuma, Lwamondo, Maniini, Makwarela and Phiphidi.

## Requirements

- Node.js 18 or newer
- npm
- A terminal (Visual Studio Code is recommended)

## Run the project

Open a terminal in the extracted `VendaLink-Vhembe-Marketplace` folder.

### 1. Install dependencies

```bash
cd backend
npm install
cd ../frontend
npm install
cd ..
```

### 2. Seed the demo database

```bash
cd backend
node src/db/seed.js
```

The seed command creates fictional demo accounts, listings, runners and suggested meeting areas. Running it again resets the demo data.

### 3. Build the frontend

```bash
cd ../frontend
npm run build
```

### 4. Start the app

```bash
cd ../backend
node src/server.js
```

Open http://localhost:4000 in your browser.

For development with hot reload, run the backend in one terminal and `npm run dev` from the `frontend` folder in another terminal. The frontend development server uses the Vite proxy for `/api`.

## Demo login

All demo accounts use the password `password123`.

| Demo user | Phone | Area |
|---|---|---|
| Rinao Mudau | `0821234567` | Thohoyandou CBD |
| Ndangeni Khaukanani | `0829876543` | Sibasa |
| Tshilidzi Blessings Mudau | `0831112233` | Muledane |
| Tshanduko Mudau | `0844445566` | Shayandima |

These are development/demo accounts. They all use the shared password above; change or remove demo credentials before any public deployment. The named profiles are included at the user's request and should not be treated as verified marketplace users.

## Features

- Account registration and login
- Local listings with category and area filters
- Create listings and flash-sale listings
- Runner directory and delivery flow
- Transaction records and voucher/receipt workflow
- User profiles, notifications and reviews
- Suggested public meet-up areas
- Saved listings wishlist stored in the user's browser, with save/unsave controls on listing cards and detail pages

## Project structure

```text
VendaLink-Vhembe-Marketplace/
├── backend/
│   ├── src/
│   │   ├── db/          Database and Venda/Vhembe demo seed data
│   │   ├── middleware/  Authentication middleware
│   │   ├── routes/      Authentication, listings and app APIs
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   └── package.json
├── docker-compose.yml
├── Dockerfile
└── README.md
```

## GitHub

Create a new GitHub repository, then from the project root run:

```bash
git init
git add .
git commit -m "Create VendaLink Vhembe marketplace"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Replace the remote URL with your own GitHub repository URL.

## Important before real-world use

This is a starter/demo project, not a production-ready marketplace. Before launching publicly, configure a strong private `JWT_SECRET`, review authentication and payment/escrow handling, add real location/map data, verify any proposed meeting places, and test all flows. Never use the demo passwords for real accounts.
