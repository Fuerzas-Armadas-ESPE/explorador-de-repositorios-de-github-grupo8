import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Avatar,
  CircularProgress,
  Pagination
} from "@mui/material";

const RepoList = ({ username }) => {
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(
          `https://api.github.com/users/${username}`
        );
        setUser(userResponse.data);

        const reposResponse = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );
        const sortedRepos = reposResponse.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setRepos(sortedRepos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username]);

  if (!user) {
    return <div> <CircularProgress /></div>;
  }

  // Pagination
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <h2>Todos los repositorios de {user.name}</h2>     
      <p>Username: {user.login}</p>
      <p>Followers: {user.followers}</p>
      <p>Public Repos: {user.public_repos}</p>
      <p>URL: {user.html_url}</p>
      <Avatar alt="User Avatar" src={user.avatar_url} />
      <br />
    
      <ul>
        {currentRepos.map((repo) => (
          <li key={repo.id}>
            {repo.name} - Tamaño: {repo.size}
          </li>
        ))}
      </ul>

      <div>
        <Pagination
          count={Math.ceil(repos.length / reposPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

RepoList.propTypes = {
  username: PropTypes.string.isRequired,
};

export default RepoList;
