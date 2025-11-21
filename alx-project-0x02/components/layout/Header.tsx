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

Implement Basic Routing
1. Create the two new pages

In your project, create:
pages/home.tsx
pages/about.tsx
You can create them manually or run:
touch pages/home.tsx
touch pages/about.tsx

2. Add basic content to home.tsx

pages/home.tsx:
const HomePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Welcome to the Home Page</h1>
      <p className="mt-2 text-gray-600">
        This is the home page created for basic routing.
      </p>
    </div>
  );
};

export default HomePage;

3. Add basic content to about.tsx

pages/about.tsx:
const AboutPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">About This Project</h1>
      <p className="mt-2 text-gray-600">
        This page explains the purpose of the project.
      </p>
    </div>
  );
};

export default AboutPage;

4. Update Header.tsx with navigation links

Open:

components/layout/Header.tsx

Replace content with:
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex items-center gap-6">
      <h1 className="text-xl font-bold">My Next.js Project</h1>

      <nav className="flex gap-4">
        <Link href="/home">
          <span className="hover:text-gray-300 cursor-pointer">Home</span>
        </Link>

        <Link href="/about">
          <span className="hover:text-gray-300 cursor-pointer">About</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;

5. Test the routing

Start your server if it's not running:
npm run dev -- -p 3000

Now go to:

http://localhost:3000/home

http://localhost:3000/about

You should see:

The header with the navigation

The correct <h1> for each page


Implement Reusable Header Component
1.Create the Header.tsx Component
Create the file components/layout/Header.tsx. This component will use the Next.js Link component to handle client-side routing, which makes page transitions faster.
// components/layout/Header.tsx
import Link from 'next/link';

const Header: React.FC = () => {
  const navItems = [
    { name: 'Home', href: '/home' },
    { name: 'About', href: '/about' },
    { name: 'Posts', href: '/posts' },
    { name: 'Users', href: '/users' }, // Adding /users too, for completeness
  ];

  return (
    <header className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand Link */}
        <Link href="/" className="text-xl font-bold text-white hover:text-gray-300 transition duration-150">
          ALX Project
        </Link>
        
        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="text-white hover:text-indigo-400 transition duration-150">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;


2. Implement Header in Pages
Next, you need to create the required page files and import the Header component into each one. Since you're using the Pages Router, each file in the pages/ directory represents a route.

A. Create pages/home.tsx
// pages/home.tsx
import Header from '@/components/layout/Header';

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Welcome Home!</h1>
        <p className="text-lg text-gray-600">This is the main dashboard of the application.</p>
      </main>
    </>
  );
};

export default HomePage;
B. Create pages/about.tsx
// pages/about.tsx
import Header from '@/components/layout/Header';

const AboutPage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">About Us</h1>
        <p className="text-lg text-gray-600">A project to master Next.js, TypeScript, and Tailwind CSS.</p>
      </main>
    </>
  );
};

export default AboutPage;

C. Create pages/posts.tsx
// pages/posts.tsx
import Header from '@/components/layout/Header';

const PostsPage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">All Posts</h1>
        <p className="text-lg text-gray-600">This page will display fetched post data soon!</p>
      </main>
    </>
  );
};

export default PostsPage;

Verify Functionality
After running your development server (npm run dev), navigate between the routes (/home, /about, /posts) by clicking the links in the header.

Outcome: The navigation bar will appear on all three pages, and clicking the links will instantly transition you to the corresponding page, confirming that the routing works correctly.
  
  
  
