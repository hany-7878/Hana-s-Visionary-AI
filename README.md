
# 🎨 Hana’s Visionary AI Generator

## ✨ Overview

Hana’s Visionary AI Generator is a modern, responsive web application that allows users to instantly turn text descriptions (prompts) into stunning, unique digital images using an integrated AI backend (not provided in this frontend code, but referenced via `/api/generate-image`). The frontend is built using Next.js, styled with Tailwind CSS, and enhanced with beautiful animations powered by Framer Motion.

## 🚀 Features

  * **Text-to-Image Generation:** Quickly generate visuals from natural language prompts.
  * **Prompt Suggestions:** Clickable pills to easily inspire and input new ideas.
  * **Interactive UI/UX:** Smooth transitions and animations using Framer Motion.
  * **Dynamic Gallery:** Displays a history of previously generated images.
  * **Responsive Design:** Optimized for desktop and mobile viewing using Tailwind CSS.
  * **Clear State Management:** Visual loading indicators and prompt clearing after generation for a seamless user experience.

## 🛠️ Technology Stack

  * **Framework:** [Next.js](https://nextjs.org/) (React)
  * **Styling:** [Tailwind CSS](https://tailwindcss.com/)
  * **Animations:** [Framer Motion](https://www.framer.com/motion/)
  * **Icons:** [Lucide React](https://lucide.dev/icons/)
  * **Data Fetching:** Custom `useFetchData` hook for API interaction.
  * **Backend Integration:** Connects to an external `/api/generate-image` endpoint (e.g., powered by OpenAI DALL-E, Stability AI, or similar service).

## 💻 Getting Started

### Prerequisites

You will need the following installed on your machine:

  * Node.js (LTS version recommended)
  * npm or yarn

### Installation

1.  **Clone the repository:**

    ```bash
    git clone 
    cd hana-visionary-ai
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # OR
    yarn install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root of your project and add your API endpoint details.

    ```env
    # Example for an external AI service API Key
    NEXT_PUBLIC_AI_API_KEY="your_api_key_here"
    # Or specific API URL if needed for serverless function
    # API_BASE_URL="https://api.example.com/ai"
    ```

    *Note: The frontend code uses `/api/generate-image`, implying a Next.js API route that handles the actual communication with the external AI service.*

4.  **Run the development server:**

    ```bash
    npm run dev
    # OR
    yarn dev
    ```

5.  Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser to see the result.

## ⚙️ Project Structure (Relevant Files)

| File/Folder | Description |
| :--- | :--- |
| `app/page.tsx` | The main `Home` component containing the UI, logic, and state management. |
| `components/common/ImageCard.tsx` | Reusable component for displaying generated images and their prompts. |
| `hooks/useFetchData.ts` | Custom hook for handling API calls, loading state, and storing generated images/prompts. |
| `interfaces/index.ts` | TypeScript interface definitions (e.g., `ImageProps`). |
| `app/api/generate-image/route.ts` | **(Backend placeholder)** Next.js API route where the call to the external AI model would be implemented. |

## 🤝 Contribution

Contributions are always welcome\! If you have suggestions for new features, bug fixes, or improvements to the UI/UX, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

