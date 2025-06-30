import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to Employee Management App</h1>
      <div className="space-x-4">
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">Login</Link>
        <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded">Signup</Link>
      </div>
    </div>
  );
};

export default Home;
