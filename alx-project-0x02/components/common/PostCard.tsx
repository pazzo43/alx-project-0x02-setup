Implement Post List and Data Fetching
1.Define the TypeScript Interface (interfaces/index.ts)
Update your interfaces/index.ts file to include the data structure for a Post. We'll also reuse the previously defined Post type for the component's props.
  // interfaces/index.ts

// ... (other interfaces like ButtonProps, User, etc. if you created them earlier)

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

/** * PostCardProps defines the expected props for the PostCard component. 
 * Since we want to pass the whole Post object, the props interface extends Post.
 */
export interface PostCardProps {
  post: Post;
}

2.Create the PostCard.tsx Component
Create the file components/common/PostCard.tsx. This component uses the PostCardProps interface to ensure type safety and provides a structured way to display the post data.

We will add a basic Tailwind-based Card design using shadow, padding, and rounded corners.
  // components/common/PostCard.tsx
import React from 'react';
// Assuming interfaces is accessible via '@/interfaces' or adjust path
import { PostCardProps } from '@/interfaces'; 

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
      <span className="text-xs font-semibold uppercase text-indigo-600 tracking-wider">
        User ID: {post.userId}
      </span>
      
      <h2 className="text-xl font-bold text-gray-800 mt-1 mb-3 line-clamp-2">
        {post.title}
      </h2>
      
      <p className="text-gray-600 line-clamp-3">
        {post.body}
      </p>
      
      {/* Example action button for detail view */}
      <button 
        className="mt-4 text-sm font-medium text-indigo-500 hover:text-indigo-700 transition duration-150"
        onClick={() => alert(`Viewing post #${post.id}`)}
      >
        Read More →
      </button>
    </article>
  );
};

export default PostCard;

3. . Fetch and Display Data in pages/posts.tsx
Update the pages/posts.tsx file to fetch the data from the JSONPlaceholder API using Next.js's getStaticProps. This approach fetches the data at build time, making the page very fast.
  // pages/posts.tsx
import { GetStaticProps, NextPage } from 'next';
import Header from '@/components/layout/Header';
import PostCard from '@/components/common/PostCard';
// Assuming interfaces is accessible via '@/interfaces' or adjust path
import { Post } from '@/interfaces'; 

// 1. Define the props interface for the page
interface PostsPageProps {
  posts: Post[];
}

// 2. Fetch data using getStaticProps
// This function runs only on the server at build time
export const getStaticProps: GetStaticProps<PostsPageProps> = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=20'); // Fetch first 20 posts
    if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
    }
    const postsData: Post[] = await response.json();

    return {
      props: {
        posts: postsData,
      },
      // Optional: revalidate the data every 60 seconds (Incremental Static Regeneration)
      revalidate: 60, 
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
        props: {
            posts: [], // Return empty array on failure
        },
    };
  }
};

// 3. Page Component
const PostsPage: NextPage<PostsPageProps> = ({ posts }) => {
  return (
    <>
      <Header />
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Latest Posts</h1>
        
        {posts.length === 0 ? (
            <p className="text-center text-gray-500">No posts found or failed to load data.</p>
        ) : (
            // Grid layout for displaying PostCard components
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    // Pass the entire post object as a prop to PostCard
                    <PostCard key={post.id} post={post} /> 
                ))}
            </div>
        )}
      </main>
    </>
  );
};

export default PostsPage;

Verification
When you run your Next.js application, navigate to the /posts route. You should see a list of cards, each displaying the title, user ID, and body content fetched from the JSONPlaceholder API.
