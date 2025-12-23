# Kartigo

NOTE: This version do not use database.

Kartigo is a modern e-commerce web application built with React. It allows users to browse, search, and manage products with a user-friendly interface inspired by real-world e-commerce giants.

![React](https://img.shields.io/badge/React-18.x-blue?logo=react)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Features

- Browse a wide range of real-world products
- Add or remove items from the cart
- Modern, responsive UI
- Product details with images and videos (served via Croma servers)
- Search and filter products
- Cart management
- Notification system for user actions
- Built with React and Create React App
- Firebase integration for authentication and data (see below)

## Demo

<p>
  <a href="https://kartigo-nine.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit-blue?style=for-the-badge&logo=vercel" alt="Live Demo" />
  </a>
</p>

## Technologies Used

- React (Create React App)
- JavaScript (ES6+)
- CSS3
- Firebase (for authentication and backend)
- Croma servers (for product media)

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Aditya-4987/Kartigo.git
cd Kartigo
npm install
```

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Add your Firebase configuration to `src/Components/firebase.js` or `firebaseConfig.js` as required.
3. Update `firebase.json` if you plan to deploy with Firebase Hosting.

### Running the App

Start the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Building for Production

To build the app for production:

```bash
npm run build
```

The optimized build will be in the `build` folder.

## Scripts

- `npm start` — Run the app in development mode
- `npm run build` — Build the app for production
- `npm test` — Run tests (if available)
- `npm run eject` — Eject Create React App configuration (not recommended)

## Project Structure

- `/src` — Main source code
  - `App.js` — Main app component
  - `Components/` — UI components (authentication, cart, product details, etc.)
  - `assets/` — Icons, images, and animations
  - `utils/` — Utility functions and product data
  - `tempDatabase_json/` — Sample product data (JSON)
- `/public` — Static assets (HTML, manifest, icons, fonts)
- `/build` — Production build output (after running `npm run build`)
- `firebase.json` — Firebase configuration
- `package.json` — Project metadata and scripts

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the [MIT](LICENSE) license.

---

### Troubleshooting

#### `npm run build` fails to minify

See: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Contact

For questions or feedback, please open an issue or contact [Aditya-4987](https://github.com/Aditya-4987).
