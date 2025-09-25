# SecurePay - Secure Payment App

SecurePay is a concept for a secure payment application built with React, TypeScript, and Tailwind CSS. It features a "Trust Score" system to help users make safer transactions.

## Features

*   **Send Money**: Send money via UPI ID or Phone Number.
*   **Trust Score**: Every user has a trust score. The app warns you if you're about to send money to a user with a low score.
*   **User Reporting**: A comprehensive form to report fraudulent or suspicious users.
*   **Transaction History**: View a complete history of your transactions.
*   **Supabase Integration**: User profiles and scores are checked against a Supabase database.
*   **Responsive Design**: The app is designed to work on mobile, tablet, and desktop screens.

## Tech Stack

*   **Frontend**: React, TypeScript, Vite
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React
*   **Backend**: Supabase (for profile data)

## Getting Started

1.  **Install dependencies:**
    ```bash
    yarn install
    ```

2.  **Set up environment variables:**
    Create a `.env` file in the root directory and add your Supabase credentials:
    ```
    VITE_SUPABASE_URL=YOUR_SUPABASE_URL
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

3.  **Run the development server:**
    ```bash
    yarn dev
    ```
