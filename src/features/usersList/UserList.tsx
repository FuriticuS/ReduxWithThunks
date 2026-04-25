import type { JSX } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import type { RootState } from "../../store";
import type { User } from "../../types/user";
import { deleteUser, fetchUsers } from "./userListSlice";
import { selectedUser } from "../userDetails/userDetailsSlice";

const UserList = (): JSX.Element => {
  const users = useAppSelector((state: RootState) => state.userList.users);
  const error = useAppSelector((state: RootState) => state.userList.error);
  const loading = useAppSelector((state: RootState) => state.userList.loading);
  const dispatch = useAppDispatch();

  const handleLoadUsers = (): void => {
    void dispatch(fetchUsers());
  };

  const handleSelectUser = (id: number): void => {
    dispatch(selectedUser(id));
  };

  const handleDeleteUser = (id: number): void => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="user-list">
      <h2>User List</h2>

      <button
        type="button"
        className="load-btn"
        onClick={handleLoadUsers}
      >
        Load Users
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {!error && (
        <ul>
          {users.map((user: User) => (
            <li key={user.id}>
              <span>
                {user.name} - {user.email}
              </span>
              <div className="btn-group">
                <button
                  type="button"
                  className="select-btn"
                  onClick={() => handleSelectUser(user.id)}
                >
                  Select
                </button>

                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
