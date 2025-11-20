Scaffold Next.js + TypeScript + Tailwind
1. Create the Next.js Project

Open your terminal and run:
npx create-next-app@latest alx-project-2 --typescript --tailwind --eslint

This command automatically sets up:

Next.js

TypeScript

Tailwind CSS

ESLint

A clean folder structure

2. Create Required Folders & Files

Go into your project:
cd alx-project-2
Now create the folders:
mkdir -p components/layout
mkdir -p interfaces
mkdir -p public/assets/images

Create the file:
touch components/layout/Header.tsx
touch interfaces/index.ts

3. Add Content to Header.tsx

Open:

components/layout/Header.tsx

Add this minimal content:
const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <h1 className="text-xl font-bold">My Next.js Project</h1>
    </header>
  );
};

export default Header;

4. Add Content to interfaces/index.ts
export interface ExampleInterface {
  id: number;
  name: string;
}
(You can update interfaces later when real components are added.)

  5. Add Welcome Text to pages/index.tsx

Open /pages/index.tsx and replace the default content with:
import Header from "../components/layout/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="p-6">
        <h2 className="text-2xl font-semibold">Welcome to ALX Project 0x02</h2>
        <p className="mt-2 text-gray-600">
          Your Next.js + TypeScript + Tailwind setup is complete!
        </p>
      </main>
    </div>
  );
}

6. Run the Application

Start the project:
npm run dev -- -p 3000

Then visit:

http://localhost:3000

You should see:

The blue header

The “Welcome to ALX Project 0x02” message
