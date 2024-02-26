import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Avatar,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  LinearProgress
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
    return <div> <LinearProgress
    color="inherit"
    variant="indeterminate"
  /></div>;
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
      <h2 style={{ textAlign: "center" }}>Todos los repositorios de {user.name}</h2>     
        <div style={{ display: "flex", justifyContent: "center" }}>
          <table>
            <tbody>
              <tr>
                <td>Usuario</td>
                <td></td>
                <td style={{ textAlign: "right" }}>{user.login}</td>
              </tr>
              <tr>
                <td>Seguidores</td>
                <td></td>
                <td style={{ textAlign: "right" }}>{user.followers}</td>
              </tr>
              <tr>
                <td>Repositorios</td>
                <td></td>
                <td style={{ textAlign: "right" }}>{user.public_repos}</td>
              </tr>
              <tr>
                <td>Ir al perfil</td>
                <td></td>
                <td style={{ textAlign: "right" }}>
                  <Button variant="text" href={user.html_url}>
                    Perfil GitHub
                  </Button>
                </td>
              </tr>
              <tr>
                <td>Foto del usuario</td>
                <td></td>
                <td>
                  <Avatar alt="User Avatar" src={user.avatar_url} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      <br />
    
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Tamaño</TableCell>
            <TableCell align="right">Fecha Creación</TableCell>
            <TableCell align="right">Fecha Última Actualización</TableCell>
            <TableCell align="right">Estrellas</TableCell>
            <TableCell align="right">Lenguaje</TableCell>
            <TableCell align="right">Repositorio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentRepos.map((repo) => (

            <TableRow
              key={repo.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {repo.name}
              </TableCell>
              <TableCell align="right">{repo.size} KB</TableCell>
              <TableCell align="right">{new Date(repo.created_at).toLocaleDateString()}</TableCell>
              <TableCell align="right">{new Date(repo.updated_at).toLocaleDateString()}</TableCell>
              <TableCell align="right">{repo.stargazers_count}</TableCell>
              <TableCell align="right">{repo.language}</TableCell>
              <TableCell align="right">
                <Button variant="text" href={repo.html_url}>
                  Ver Repositorio
                </Button>
              </TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </TableContainer>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pagination 
            count={Math.ceil(repos.length / reposPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined" 
            color="primary"
            size="large"
          />
        </div>
        <br />
    </div>
  );
};

RepoList.propTypes = {
  username: PropTypes.string.isRequired,
};

export default RepoList;
