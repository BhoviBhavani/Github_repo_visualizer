"use client"
import React, { useState } from 'react';
import fetchGithubData from '../app/api/github';
import RepoList from '../components/RepoList';
import { signIn, signOut, SessionProvider, useSession } from 'next-auth/react';

const Home = () => {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState('');
  const { data: session } = useSession();
  
  const handleSearch = async () => {
    try {
      const data = await fetchGithubData(username);
      if (data.message === 'Not Found') {
        setError('User not found');
        setRepos([]);
      } else {
        setError('');
        setRepos(data);
      }
    } catch (error) {
      setError('An error occurred while fetching data');
      setRepos([]);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-100">
      <div className="w-full max-w-md min-h-screen p-4">
        <h1 className='mt-5 text-blue-500 font-bold p-4'>GITHUB-REPOSITORIES-VISUALIZER</h1>
        {!session ? (
          <button onClick={() => signIn('github')}>Sign in with GitHub</button>
        ) : (
          <>
            <p>Welcome, {session.user.name}!</p>
            <button onClick={() => signOut()}>Sign out</button>
          </>
        )}
        <div className="flex items-center mb-2">
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-grow p-2 rounded-l-md border border-gray-300 focus:ring focus:ring-blue-300 focus:border-blue-400"
          />
          <button
            onClick={handleSearch}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:ring focus:ring-blue-300 focus:outline-none"
          >
            Search
          </button>
        </div>
        {error && <p className="mt-2 text-red-500">{error}</p>}
        {repos.length > 0 ? <RepoList repos={repos} /> : null}
      </div>
    </main>
  );
};

const HomeWithSession = () => (
  <SessionProvider>
    <Home />
  </SessionProvider>
);

export default HomeWithSession;


