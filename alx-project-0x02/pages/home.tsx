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

dynamic, reusable Card component
Step 1: Define the Props Interface

In interfaces/index.ts, add a CardProps interface:
// interfaces/index.ts

export interface CardProps {
  title: string;
  content: string;
}
This ensures our Card component knows it should receive a title and content as strings.

Step 2: Create the Card Component

Create components/common/Card.tsx:
// components/common/Card.tsx
import React from "react";
import { CardProps } from "@/interfaces";

const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 m-4 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};

export default Card;

Explanation of Tailwind classes:

bg-white → white background

shadow-md → medium shadow for depth

rounded-lg → rounded corners

p-6 → padding

m-4 → margin

hover:shadow-xl + transition-shadow → subtle hover effect

text-xl font-semibold → for the title

text-gray-700 → readable gray content text

Step 3: Use the Card Component in Home Page

Edit pages/home.tsx:
// pages/home.tsx
import React from "react";
import Card from "@/components/common/Card";

const Home: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center p-8">
      <Card title="Card 1" content="This is the first card content." />
      <Card title="Card 2" content="This is the second card content." />
      <Card title="Card 3" content="This is the third card content." />
    </div>
  );
};

export default Home;

What’s happening:

flex flex-wrap justify-center → cards are laid out in a row and wrap to next line if necessary

p-8 → page padding

Multiple <Card> instances with different title and content

Result:

A reusable Card component

Passes dynamic props for title/content

Displays nicely on the Home page

Fully typed with TypeScript


Modal Component Implementation
Step 1: Create the Interface First
Let's start by defining our TypeScript interfaces. Create/update interfaces/index.ts:
  // interfaces/index.ts
export interface Post {
  id: number;
  title: string;
  content: string;
  userId?: number;
}

export interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: Omit<Post, 'id'>) => void;
}

Step 2: Create the PostModal Component
Create components/common/PostModal.tsx:
// components/common/PostModal.tsx
import { useState } from 'react';
import { PostModalProps } from '../../interfaces';

const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    // Pass the new post data to parent
    onSave({
      title: title.trim(),
      content: content.trim(),
    });

    // Reset form and close modal
    setTitle('');
    setContent('');
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Don't render if modal is not open
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">Create New Post</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post title"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post content"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostModal;

Step 3: Update the Home Page
Now let's update pages/home.tsx to use our modal and display posts:
  // pages/home.tsx
import { useState } from 'react';
import { Post } from '../interfaces';
import PostModal from '../components/common/PostModal';

const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: 'Welcome to Our Platform',
      content: 'This is a sample post to get you started. Create your own posts using the button below!',
      userId: 1
    }
  ]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSavePost = (newPostData: Omit<Post, 'id'>) => {
    // Create a new post with a unique ID
    const newPost: Post = {
      ...newPostData,
      id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
      userId: 1, // Default user ID
    };

    // Add the new post to our list
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Home Page</h1>
          <p className="text-gray-600">Create and manage your posts</p>
        </div>

        {/* Add Post Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleOpenModal}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            + Create New Post
          </button>
        </div>

        {/* Posts Display Section */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts yet. Create your first post!</p>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {post.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {post.content}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">
                    Post ID: {post.id} • User ID: {post.userId}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Component */}
        <PostModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSavePost}
        />
      </div>
    </div>
  );
};

export default HomePage;

Step 4: Update Navigation (Optional)
Make sure your home page is accessible. Update pages/index.tsx to redirect to home:
// pages/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/home');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg">Redirecting to home page...</p>
    </div>
  );
}

Testing Your Implementation
Start your development server:
npm run dev

Navigate to http://localhost:3000/home
Test the flow:

Click "Create New Post" button → Modal should open

Fill in title and content

Click "Save Post" → Modal should close

New post should appear at the top of the list

Key Concepts Explained
Props Interface: We defined PostModalProps to ensure type safety

State Management: Using useState for modal state and posts data

Parent-Child Communication: onSave callback passes data from modal to parent

Form Handling: Controlled components with proper validation

Conditional Rendering: Modal only renders when isOpen is true

Next Steps
Once you've implemented and tested this, you'll have:

A functional modal component

Form input handling

Dynamic content updates

Parent-child component communication

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
  
