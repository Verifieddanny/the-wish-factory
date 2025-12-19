# 🎄 The Wish Factory

A full-stack Next.js application for generating personalized, interactive digital greeting cards for Christmas and New Year celebrations.

Built as a specialized tool for creating "digital envelopes" that unfold into beautiful, animated experiences with music, specifically designed with a reverent and festive tone suitable for formal or religious contexts.

![Project Preview](/public/preview.png)

## ✨ Features

* **✉️ Digital Envelope Experience:** Users receive a sealed envelope that must be tapped to reveal the card.
* **🪄 Dynamic Themes:**
    * **Christmas:** Features falling snow and classic red/green aesthetics.
    * **New Year:** Features explosive fireworks and golden aesthetics.
    * **Randomized Styling:** Each card gets a unique visual "variant" (Classic Red, Snow Blue, Cozy Green, Golden Star) generated upon creation.
* **🎵 Musical Atmosphere:** Integrated audio player with curated, non-vulgar holiday hymns and songs.
* **🔗 Clean Shareable Links:** Generates short, friendly URLs (e.g., `/share/MerryXmas24`) using `nanoid`.
* **🖼️ Dynamic SEO:** Automatically generates OpenGraph images and Metadata so links look beautiful when shared on WhatsApp/Twitter (e.g., "Merry Christmas from Uncle John!").

## 🛠️ Tech Stack

* **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion (for the envelope opening, snow, and fireworks)
* **Database:** PostgreSQL (via Supabase)
* **ORM:** Prisma (with `pg` driver adapter for serverless compatibility)
* **Icons:** Lucide React

## 🚀 Getting Started

### Prerequisites
* Node.js 18+
* A Supabase account (or any PostgreSQL database)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/christmas-wish.git](https://github.com/yourusername/christmas-wish.git)
    cd christmas-wish
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root:
    ```bash
    DATABASE_URL="your_supabase_transaction_connection_string"
    DIRECT_URL="your_supabase_session_connection_string"
    ```

4.  **Initialize the Database:**
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Add Songs:**
    Ensure you have MP3 files in `public/songs/` named `song-1.mp3`, `song-2.mp3`, etc.

6.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to see the factory.

## 📂 Project Structure

* `app/page.tsx`: The "Factory" dashboard where users create wishes.
* `app/actions.ts`: Server Actions handling form submission and DB creation.
* `app/share/[id]/page.tsx`: The dynamic route that fetches and displays a wish.
* `components/WishCard.tsx`: The complex client component handling animations (Snow/Fireworks) and the Envelope reveal.
* `prisma/schema.prisma`: The database model definition.

## 🎨 Animation Details

The project uses **Framer Motion** for:
* **Envelope Opening:** A multi-stage animation where the envelope scales up and fades out while the card springs into view.
* **Fireworks:** A custom particle system using `motion.div` to simulate explosions for New Year themes.
* **Snowfall:** A client-side generated particle system for Christmas themes.

## 🤝 Contribution

Feel free to fork this project and add more themes, songs, or animations!

## 📜 License

This project is open-source and available under the MIT License.