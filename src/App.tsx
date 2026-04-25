import type { JSX } from "react";
import AddUserForm from "./features/usersList/AddUserForm";
import UserList from "./features/usersList/UserList";
import SelectedUserDetails from "./features/userDetails/SelectedUserDetails";

const App = (): JSX.Element => (
  <div className="app-container">
    <h1>User Management App</h1>
    <AddUserForm />
    <SelectedUserDetails />
    <UserList />
  </div>
);

export default App;
