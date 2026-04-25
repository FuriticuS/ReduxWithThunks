import type { ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { deleteUser, fetchUsers } from "./userListSlice";
import { selectedUser } from "../userDetails/userDetailsSlice";

function UserList(): ReactElement {
  const users = useAppSelector((state) => state.userList.users);
  const error = useAppSelector((state) => state.userList.error);
  const loading = useAppSelector((state) => state.userList.loading);

  const dispatch = useAppDispatch();

  return (
    <div className="user-list">
      <h2>User List</h2>

      <button
        type="button"
        className="load-btn"
        onClick={() => {
          void dispatch(fetchUsers());
        }}
      >
        Load Users
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {!error && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <span>
                {user.name} - {user.email}
              </span>
              <div className="btn-group">
                <button
                  type="button"
                  className="select-btn"
                  onClick={() => dispatch(selectedUser(user.id))}
                >
                  Select
                </button>

                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => dispatch(deleteUser(user.id))}
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
}

export default UserList;
