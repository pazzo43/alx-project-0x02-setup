Implement User List and Data Fetching
1. Define the TypeScript Interface (interfaces/index.ts)
We need to define a detailed interface for the User object, including nested structures like address, as provided by the JSONPlaceholder API.
// interfaces/index.ts

// --- Existing Interfaces (Post, PostCardProps) ---
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostCardProps {
  post: Post;
}

// --- New User Interfaces ---
interface UserAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string;
    };
}

/** * User interface representing the data structure fetched from the API
 */
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: UserAddress;
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

/**
 * UserCardProps defines the expected props for the UserCard component.
 */
export interface UserCardProps {
    user: User;
}

2.Create the UserCard.tsx Component
Create the file components/common/UserCard.tsx. This component displays the key personal and contact details of a single user.
// components/common/UserCard.tsx
import React from 'react';
import { UserCardProps } from '@/interfaces';

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const fullAddress = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;

  return (
    <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-t-4 border-indigo-500 flex flex-col h-full">
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">
          {user.name.charAt(0)}
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-500">@{user.username}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <p>
          <span className="font-semibold text-gray-700">Email:</span> 
          <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline ml-1 truncate block sm:inline-block">{user.email}</a>
        </p>
        <p>
          <span className="font-semibold text-gray-700">Phone:</span> {user.phone.split(' ')[0]}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Website:</span> 
          <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1 truncate block sm:inline-block">
            {user.website}
          </a>
        </p>
        <p>
          <span className="font-semibold text-gray-700 block">Address:</span> 
          <span className="text-gray-600">{fullAddress}</span>
        </p>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <span className="text-xs font-semibold uppercase text-gray-400">Company:</span>
        <p className="text-base font-medium text-gray-700">{user.company.name}</p>
      </div>
    </article>
  );
};

export default UserCard;

3.Fetch and Display Users in pages/users.tsx
Now we implement the data fetching logic for the users route, following the same getStaticProps pattern for server-side data fetching efficiency.
// pages/users.tsx
import { GetStaticProps, NextPage } from 'next';
import Header from '@/components/layout/Header';
import UserCard from '@/components/common/UserCard';
// Assuming interfaces is accessible via '@/interfaces' or adjust path
import { User } from '@/interfaces'; 

// 1. Define the props interface for the page
interface UsersPageProps {
  users: User[];
}

// 2. Fetch data using getStaticProps
// Fetches the user data from JSONPlaceholder
export const getStaticProps: GetStaticProps<UsersPageProps> = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users'); 
    if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
    }
    const usersData: User[] = await response.json();

    return {
      props: {
        users: usersData,
      },
      revalidate: 60, 
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
        props: {
            users: [], // Return empty array on failure
        },
    };
  }
};

// 3. Page Component
const UsersPage: NextPage<UsersPageProps> = ({ users }) => {
  return (
    <>
      <Header />
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Application Users</h1>
        
        {users.length === 0 ? (
            <p className="text-center text-gray-500">No users found or failed to load data.</p>
        ) : (
            // Grid layout for displaying UserCard components
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {users.map((user) => (
                    // Pass the entire user object as a prop
                    <UserCard key={user.id} user={user} /> 
                ))}
            </div>
        )}
      </main>
    </>
  );
};

export default UsersPage;
Verification
When you run your application, navigate to the /users route. You should now see a responsive grid displaying the information for 10 users, each rendered by the reusable UserCard component.
  
  
