import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import AddToDo from "./pages/todos/AddToDo";
import ToDoPage from "./pages/todos/ToDoPage";
import ToDosPage from "./pages/todos/ToDosPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import EditToDo from "./pages/todos/EditToDo";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm.js";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import NotFound from "./components/NotFound";
import HomePage from "./pages/auth/HomePage";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomePage />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <ToDosPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/todos/create" render={() => <AddToDo />} />
          <Route exact path="/todos/:id" render={() => <ToDoPage />} />
          <Route exact path="/todos/:id/edit" render={() => <EditToDo />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />

          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;