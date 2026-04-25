import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { JSX } from "react";
import { useAppDispatch } from "../../hooks";
import type { User } from "../../types/user";
import { selectedUser } from "../userDetails/userDetailsSlice";
import { fetchUsers, usersQueryKey } from "./usersQuery";

export const UserList = (): JSX.Element => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const {
    data: users = [],
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: usersQueryKey,
    queryFn: fetchUsers,
    enabled: false,
  });

  const handleLoadUsers = (): void => {
    void refetch();
  };

  const handleSelectUser = (id: number): void => {
    dispatch(selectedUser(id));
  };

  const handleDeleteUser = (id: number): void => {
    queryClient.setQueryData<User[]>(usersQueryKey, (previous) =>
      (previous ?? []).filter((user: User) => user.id !== id)
    );
  };

  const errorMessage: string | undefined =
    isError && error instanceof Error ? error.message : undefined;

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
      {isFetching && <p>Loading...</p>}
      {errorMessage !== undefined && <p>{errorMessage}</p>}
      {!isError && (
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
