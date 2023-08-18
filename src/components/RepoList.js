import React, { useState } from 'react';
import BarChart from './BarChart';

const RepoList = ({ repos }) => {
  const itemsPerPage = 10; // Number of repositories per page
  const [currentPage, setCurrentPage] = useState(1); 
  
  const lastRepoIndex = currentPage * itemsPerPage;
  const firstRepoIndex = lastRepoIndex - itemsPerPage;
  const currentRepos = repos.slice(firstRepoIndex, lastRepoIndex);

  const totalPages = Math.ceil(repos.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <ul>
        {currentRepos.map(repo => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
      {repos.length > 0 && <BarChart data={currentRepos} />}

      <div className="mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-2 py-1 mx-1 border ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RepoList;