# SlotRaja

SlotRaja is a React + Vite parking-slot booking UI. It uses React Router for navigation and a small context store for session and slot state. The experience is intentionally cinematic: a landing page, auth screens, a slot dashboard, and a booking flow with a generated receipt.

## Features
- Route-based pages: Landing, Register, Login, Dashboard, Booking
- Protected routes for authenticated access
- Randomized slot availability across 3 floors
- Slot booking updates live state and shows a receipt
- Sleek UI with custom CSS + Bootstrap utilities

## Tech Stack
- React 18 + Vite
- React Router
- Context API for state
- Bootstrap for layout utilities

## How The Code Works

### Routing and App Shell
The main routing setup is in [src/App.jsx](src/App.jsx). It defines:
- Public routes: `/`, `/register`, `/login`
- Protected routes: `/dashboard`, `/book/:id`
- A `Navbar` that hides on the landing page
- A `Protected` wrapper that redirects unauthenticated users to `/login`

`BrowserRouter` is mounted in [src/main.jsx](src/main.jsx), wrapping the app.

### State and Business Logic
State is centralized in [src/context/ParkingContext.jsx](src/context/ParkingContext.jsx). It provides:
- `user` session state and `register`, `login`, `logout`
- `slots` generated for 3 floors, 8 slots each
- `bookSlot(id)` to mark a slot as occupied
- `getSlot(id)` to read a specific slot

Slot data is created once at load. Each slot has an id like `1-1` and a label like `A-01`.

### Pages
- [src/pages/Landing.jsx](src/pages/Landing.jsx): hero entry with links to Register and Login
- [src/pages/Register.jsx](src/pages/Register.jsx): sets user in context, then routes to Login
- [src/pages/Login.jsx](src/pages/Login.jsx): validates credentials from context and routes to Dashboard
- [src/pages/Dashboard.jsx](src/pages/Dashboard.jsx): floor toggle + grid of slots, free slots are clickable
- [src/pages/Booking.jsx](src/pages/Booking.jsx): slot details, duration input, total price, receipt

### Booking Flow
1. User logs in
2. Dashboard shows free vs occupied counts per floor
3. Clicking a free slot routes to `/book/:id`
4. Booking confirms by calling `bookSlot(id)`
5. A receipt is shown with a generated bill id

## User Workflow
1. Landing: click Enter Garage or Login
2. Register: create a user (stored in memory)
3. Login: authenticate with the same username and password
4. Dashboard: select a floor and choose a free slot
5. Booking: set hours, confirm, view receipt, return to dashboard

## Project Structure
- [src/App.jsx](src/App.jsx) - routes, navbar, protected wrapper
- [src/main.jsx](src/main.jsx) - app bootstrap
- [src/context/ParkingContext.jsx](src/context/ParkingContext.jsx) - state and actions
- [src/pages](src/pages) - landing, auth, dashboard, booking pages
- [src/App.css](src/App.css) and [src/index.css](src/index.css) - visual styling

## Scripts
From the [package.json](package.json) scripts:
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

## Notes
- Auth is in-memory only; refresh clears the user.
- Slot availability is randomized on load for demo purposes.
