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

3.Verify Functionality
After running your development server (npm run dev), navigate between the routes (/home, /about, /posts) by clicking the links in the header.

Outcome: The navigation bar will appear on all three pages, and clicking the links will instantly transition you to the corresponding page, confirming that the routing works correctly.
  
