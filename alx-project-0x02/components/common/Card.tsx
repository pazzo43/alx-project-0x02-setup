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
