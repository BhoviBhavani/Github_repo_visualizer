const fetchGithubData = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await response.json();
    return data;
  };
  
  export default fetchGithubData;