
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import CreatePoll from "./components/pages/createPoll";
import Login from "./components/pages/login";
import Poll from "./components/pages/poll";
import PollsList from "./components/pages/pollsList";
import ProtectedRoute from "./components/common/protectedRoute";
import Register from "./components/pages/register";
import NavBar from "./components/navbar";
import Logout from "./components/pages/logout";
import { ToastContainer } from "react-toastify";
import { CssBaseline, Container, Box } from "@mui/material";


function App() {
  return (
    <>
      <CssBaseline />
      <AuthProvider>
        <NavBar />
        <Container maxWidth="md" sx={{ minHeight: '100vh', py: 3 }}>
          <Box sx={{ my: 2 }}>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/logout" component={Logout} />
              <Route path="/polls/:id" component={Poll} />
              <Route path="/polls" component={PollsList} />
              <ProtectedRoute path="/create-poll" component={CreatePoll} />
              <Redirect from="/" to="/polls" />
            </Switch>
          </Box>
        </Container>
        <ToastContainer />
      </AuthProvider>
    </>
  );
}

export default App;
