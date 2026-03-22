markdown#  StayFinder — Airbnb Clone

A production-grade accommodation booking platform built with React + Vite, inspired by Airbnb. This project demonstrates advanced state management, API integration, caching, and responsive UI design.

---

##  Live Demo
> [(https://airbnb-clone-taupe-beta.vercel.app/)]

---

##  Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript + Vite |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| Server State | TanStack Query (React Query) |
| Global State | Context API + Zustand |
| HTTP Client | Axios |
| API | Airbnb19 via RapidAPI |

---

##  Project Structure
```
src/
├── components/
│   ├── layout/         # Navbar, Layout
│   ├── listings/       # ListingCard, FilterPanel
│   ├── bookings/       # BookingForm
│   └── ui/             # Loader, ErrorState, SearchBar
├── context/            # FavoritesContext, FiltersContext
├── hooks/              # useListings, useListingDetails
├── pages/              # Home, ListingDetails, Bookings, Favorites, Login
├── services/           # api.ts, listingsService.ts
├── store/              # useAuthStore, useBookingStore
├── types/              # TypeScript interfaces
└── utils/              # transformers.ts
```

---

##  Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/UmChristelle/Airbnb-clone
cd airbnb-clone
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root:
```bash
VITE_RAPIDAPI_KEY=your_rapidapi_key_here
VITE_RAPID_API_HOST=airbnb19.p.rapidapi.com
VITE_BASE_URL=https://airbnb19.p.rapidapi.com
```
>  Get your free API key at [rapidapi.com/DataCrawler/api/airbnb19](https://rapidapi.com/DataCrawler/api/airbnb19)

### 4. Run the app
```bash
npm run dev
```

---

##  API Integration

- **Base URL:** `https://airbnb19.p.rapidapi.com`
- **Endpoint:** `GET /api/v1/searchPropertyByLocationV2`
- **Auth:** `x-rapidapi-key` header from `.env`
- Centralized Axios instance in `src/services/api.ts`
- Interceptors handle 401, 403, 429 errors gracefully
- TanStack Query manages caching with `staleTime`

---

##  Routes

| Path | Page | Protected |
|---|---|---|
| `/` | Listings Feed | No |
| `/listing/:id` | Listing Details | No |
| `/bookings` | Bookings Dashboard | ✅ Yes |
| `/favorites` | Saved Listings | No |
| `/login` | Authentication | No |

---

##  State Management

| Type | Tool | Used For |
|---|---|---|
| Local State | `useState` | Forms, UI interactions |
| Global State | Context API | Favorites, Filters |
| Advanced State | Zustand | Booking logic, Auth |
| Server State | TanStack Query | Listings, Listing details |

---

##  Features

-  Search listings by location
-  Filter by price, rating, and location
-  Favorites persisted in localStorage
-  Booking form with validation
-  Protected routes
-  Cached API data for instant navigation
-  Fully responsive
-  Graceful error handling for API failures

---

##  Author
**Your Name** — [GitHub](https://github.com/UmChristelle/Airbnb-clone)