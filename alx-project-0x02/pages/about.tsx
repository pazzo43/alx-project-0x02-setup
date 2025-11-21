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


Reusable Button Component
Step 1: Update the Interfaces
First, let's add the ButtonProps interface to interfaces/index.ts:
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

// Add Button interfaces
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonShape = 'rounded-sm' | 'rounded-md' | 'rounded-full';
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';

export interface ButtonProps {
  children: React.ReactNode;
  size?: ButtonSize;
  shape?: ButtonShape;
  variant?: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

Step 2: Create the Reusable Button Component
Create components/common/Button.tsx:
// components/common/Button.tsx
import { ButtonProps } from '../../interfaces';

const Button: React.FC<ButtonProps> = ({
  children,
  size = 'medium',
  shape = 'rounded-md',
  variant = 'primary',
  onClick,
  disabled = false,
  type = 'button',
  className = '',
}) => {
  // Size classes
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  // Disabled state
  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'transition-colors duration-200 ease-in-out';

  // Base classes that apply to all buttons
  const baseClasses = 'font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';

  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${shape}
    ${variantClasses[variant]}
    ${disabledClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
};

export default Button;

Step 3: Create the About Page
Now let's create pages/about.tsx to showcase our Button component:
  // pages/about.tsx
import { useState } from 'react';
import Button from '../components/common/Button';
import { ButtonSize, ButtonShape, ButtonVariant } from '../interfaces';

const AboutPage: React.FC = () => {
  const [clickCount, setClickCount] = useState<{ [key: string]: number }>({});

  const handleButtonClick = (buttonName: string) => {
    setClickCount(prev => ({
      ...prev,
      [buttonName]: (prev[buttonName] || 0) + 1
    }));
  };

  // Demo configurations for different button combinations
  const buttonConfigs = [
    { size: 'small' as ButtonSize, shape: 'rounded-sm' as ButtonShape, variant: 'primary' as ButtonVariant },
    { size: 'small' as ButtonSize, shape: 'rounded-md' as ButtonShape, variant: 'secondary' as ButtonVariant },
    { size: 'small' as ButtonSize, shape: 'rounded-full' as ButtonShape, variant: 'outline' as ButtonVariant },
    { size: 'medium' as ButtonSize, shape: 'rounded-sm' as ButtonShape, variant: 'danger' as ButtonVariant },
    { size: 'medium' as ButtonSize, shape: 'rounded-md' as ButtonShape, variant: 'primary' as ButtonVariant },
    { size: 'medium' as ButtonSize, shape: 'rounded-full' as ButtonShape, variant: 'secondary' as ButtonVariant },
    { size: 'large' as ButtonSize, shape: 'rounded-sm' as ButtonShape, variant: 'outline' as ButtonVariant },
    { size: 'large' as ButtonSize, shape: 'rounded-md' as ButtonShape, variant: 'danger' as ButtonVariant },
    { size: 'large' as ButtonSize, shape: 'rounded-full' as ButtonShape, variant: 'primary' as ButtonVariant },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Page</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            This page demonstrates our reusable Button component with different sizes, shapes, and variants.
          </p>
        </div>

        {/* Button Showcase Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {buttonConfigs.map((config, index) => {
            const buttonKey = `btn-${config.size}-${config.shape}-${config.variant}`;
            const clickCountForButton = clickCount[buttonKey] || 0;

            return (
              <div
                key={buttonKey}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4 capitalize">
                  {config.size} • {config.shape.replace('rounded-', '')} • {config.variant}
                </h3>
                
                <div className="flex justify-center mb-4">
                  <Button
                    size={config.size}
                    shape={config.shape}
                    variant={config.variant}
                    onClick={() => handleButtonClick(buttonKey)}
                  >
                    Click Me
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Clicks: <span className="font-semibold">{clickCountForButton}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Special Button Examples */}
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Special Button Examples
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {/* Disabled Button */}
            <Button
              size="medium"
              variant="primary"
              disabled
            >
              Disabled Button
            </Button>

            {/* Custom Class Button */}
            <Button
              size="large"
              shape="rounded-full"
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              Custom Styled
            </Button>

            {/* Submit Button */}
            <Button
              type="submit"
              size="medium"
              variant="secondary"
            >
              Submit Form
            </Button>

            {/* Danger Button with different shape */}
            <Button
              size="small"
              shape="rounded-full"
              variant="danger"
            >
              Delete
            </Button>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">How to Use the Button Component</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Available Props:</h4>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li><code>size</code>: small, medium, large</li>
                <li><code>shape</code>: rounded-sm, rounded-md, rounded-full</li>
                <li><code>variant</code>: primary, secondary, outline, danger</li>
                <li><code>disabled</code>: boolean</li>
                <li><code>onClick</code>: function</li>
                <li><code>type</code>: button, submit, reset</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Example Usage:</h4>
              <pre className="bg-blue-100 p-3 rounded text-xs overflow-x-auto">
                {`<Button
  size="large"
  shape="rounded-full"
  variant="primary"
  onClick={handleClick}
>
  Click Me
</Button>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

Step 4: Update Navigation (Optional)
If you want to easily navigate to the About page, you can update your Header.tsx component (we'll create this later) or add a temporary link in pages/home.tsx:
  // Add this to pages/home.tsx, for example in the header section:
<div className="text-center mb-8">
  <h1 className="text-3xl font-bold text-gray-900 mb-2">Home Page</h1>
  <p className="text-gray-600 mb-4">Create and manage your posts</p>
  <a 
    href="/about" 
    className="text-blue-600 hover:text-blue-800 underline"
  >
    Check out our Button component examples →
  </a>
</div>

Testing Your Implementation
Start your development server (if not running):
npm run dev

Navigate to http://localhost:3000/about

Test the buttons:

Click different buttons to see the click counter update

Observe the different sizes, shapes, and colors

Try the disabled button (should not be clickable)

Notice the hover and focus states

Key Concepts Explained
TypeScript Enums: We used union types for ButtonSize, ButtonShape, and ButtonVariant

Configuration Objects: sizeClasses and variantClasses make the code clean and maintainable

Conditional Styling: Dynamic class generation based on props

Flexible Props: The component accepts many customization options while providing sensible defaults

Accessibility: Proper focus states and disabled handling

What You've Built
A highly reusable Button component

Multiple size options (small, medium, large)

Multiple shape options (rounded-sm, rounded-md, rounded-full)

Multiple variant options (primary, secondary, outline, danger)

Disabled state support

Comprehensive demo page showing all combinations

Next Steps
Your Button component is now production-ready! You can use it throughout your application. The component is:

Type-safe with full TypeScript support

Flexible with many customization options

Accessible with proper focus management

Consistent with Tailwind CSS utility classes


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
  
