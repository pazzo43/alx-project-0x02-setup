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
