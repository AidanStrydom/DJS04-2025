# DJS03 React Podcast Preview

This project is a **React-based podcast preview application** that fetches podcast data from an external API and displays it in a responsive grid of cards. It builds upon the concepts introduced in DJS01 and DJS02 but replaces vanilla JavaScript and Web Components with a modular React architecture.

---

## Features

- Fetches podcast data from a remote API: `https://podcast-api.netlify.app/shows`
- Displays a responsive grid of podcast cards using React components
- Maps genre IDs to titles using static data from `data.js`
- Shows last updated date in a localized, human-readable format
- Displays a spinner during loading and an error message on failure
- Has a search bar to help find podcasts that updates the results dynamically
- Has sorting options to allow finding podcasts faster
- Has genre filter that shows podcasts of the required genre
- Combination filtering, all search options work together
- Pagination through a load more system
- Clean, reusable component structure

---

## Project Structure

```
/src
│
├── /api
│ └── fetchPodcasts.js # Function to fetch podcast data from the API
│
├── /components
│ ├── Header.jsx # Top navigation/header component
│ ├── PodcastCard.jsx # Component to display individual podcast info
│ └── PodcastGrid.jsx # Component to render a grid of PodcastCards
│
├── /utils
│ └── formatDate.js # Utility to format ISO dates into readable text
│
├── App.jsx # Root component for state and layout
├── data.js # Static mapping of genre IDs to titles
├── index.css # Application-wide CSS including layout and tags
├── main.jsx # Vite entry point
```

---

## How it Works

- **Data Fetching**: `fetchPodcasts.js` handles the API call and manages success, loading, and error states.
- **Genre Resolution**: Genre IDs returned by the API are mapped to readable names using `data.js`.
- **UI Rendering**:
  - `PodcastGrid.jsx` loops over all podcast data and renders `PodcastCard` components.
  - `PodcastCard.jsx` displays title, image, season count, genre tags, and the last update date.
- **Styling**: Tags, error messages, and loading spinners are styled with plain CSS in `index.css`.

---

## Learning Goals

- Learn how to structure a React project using functional components
- Understand how to fetch and display remote data in React
- Apply conditional rendering for loading and error states
- Use utility modules and static data in a real-world project
- State management

---

## How to Run

1. Clone the project or download the source code.
2. Install dependencies using:

   ```bash
   npm install
   ```

3. Run the development server with:

   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 in your browser to view the app.
