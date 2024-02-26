import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  AppBar,
  Toolbar,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Avatar,
} from "@mui/material";
import RepoList from "./components/RepoList";

function App() {
  const [username, setUsername] = useState("");
  const [showRepoList, setShowRepoList] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setShowRepoList(true);
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Mi Explorador de Repositorios
            </Typography>
            
            <Avatar alt="User Avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO2L2WFUXd-4pnJoprAtrMCu17xm1OUoInjrgGYxAf9VsumiYdh6-4NjjPEp6s_KEzRsc&usqp=CAU" />
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm" sx={{ marginTop: "20px" }}>
          <br></br>
          <form onSubmit={handleFormSubmit}>
            <TextField
              label="Nombre de Usuario"
              variant="standard"
              value={username}
              onChange={handleUsernameChange}
              fullWidth
              sx={{ marginBottom: "10px" }}
            />
            <Button type="submit" variant="contained" color="success" fullWidth>
              Buscar Repositorios
            </Button>
          </form>
          
        </Container>
      </div>
      <div>
        <Container sx={{ marginTop: "20px" }}>
          {showRepoList && <RepoList username={username} />}
        </Container>

      </div>

    </ThemeProvider>
  );
}

export default App;
