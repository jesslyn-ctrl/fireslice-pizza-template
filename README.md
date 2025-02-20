# FireSlice Pizza

**FireSlice Pizza** is a web application that lets users browse pizzas, view details, add items to their cart, and place orders. Powered by **Firebase DataConnect**, FireSlice aims to provide a smooth and interactive experience with real-time data updates.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)
- [Future Enhancements](#future-enhancements)
- [License](#license)

---

## Features

- **Browse Products**: View a list of pizzas, pastas, etc with descriptions and images.
- **Product Details**: Get detailed information about each pizza, including ingredients and pricing.
- **Add to Cart**: Add pizzas to your cart and manage quantities in real-time.
- **Order Summary**: Review your cart, see totals, and proceed to checkout.
- **Firebase Authentication**: Sign up, log in, and manage your account with Firebase Authentication.
- **Dataconnect**: Data syncs in real-time with Firebase DataConnect for seamless updates.


## Getting Started

### Prerequisites

- Node.js (>= 20.x)
- Firebase account (for Firebase DataConnect and Authentication)
- Visual Studio Code
- Firebase Dataconnect *VSCode Extension*
- Yarn or npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jesslyn-ctrl/fireslice-pizza-template.git

   cd fireslice-pizza-template
   ```

2. **Install dependencies in the `app` module:**
    ```bash
    cd app
    npm install
    # or
    yarn install
    ```
3. **Firebase Configuration:**
    - Go to Firebase Console, create a project, and add a web app.
    - Enable Firebase Dataconnect for the service, and Firebase Authentication for user login.
    - Setup your environment variables in `app` module:
    ```bash
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
    VITE_EMULATOR_AUTH_URL=your_emulator_auth_url
    ```

4. **Start the Development Server in your `app` module:**
    ```bash
    npm run dev
    ```

## Technologies Used

- **Vite:** Build tool.
- **React:** For building the user interface.
- **Firebase:** Backend as a Service (BaaS) for database, service and authentication.
- **TypeScript:** Static typing for catching errors early.
- **Tailwind CSS:** Utility-first CSS framework for styling.


## Future Enhancements

- **Order History:** Allow users to view their past orders.
- **Product Recommendations:** Suggest pizzas based on previous orders.
- **Payment Integration:** Add secure payment processing.


## License

This project is licensed under the MIT License.