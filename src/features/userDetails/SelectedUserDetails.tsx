import type { JSX } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import type { RootState } from "../../store";
import type { User } from "../../types/user";
import { clearSelectedUser } from "./userDetailsSlice";

const SelectedUserDetails = (): JSX.Element => {
  const selectedUserId = useAppSelector(
    (state: RootState) => state.selectedUser.selectedUserId
  );
  const users = useAppSelector((state: RootState) => state.userList.users);
  const dispatch = useAppDispatch();

  const handleClearSelection = (): void => {
    dispatch(clearSelectedUser());
  };

  if (selectedUserId === null) {
    return <p>No user selected</p>;
  }

  const user: User | undefined = users.find(
    (u: User) => u.id === selectedUserId
  );
  if (user === undefined) {
    return <p>User not found</p>;
  }

  return (
    <div className="selected-user-details">
      <h2>Selected User</h2>
      <p>
        <strong>Name: </strong>
        {user.name}
      </p>
      <p>
        <strong>Email: </strong>
        {user.email}
      </p>

      <button
        type="button"
        className="clear-btn"
        onClick={handleClearSelection}
      >
        Clear Selection
      </button>
    </div>
  );
};

export default SelectedUserDetails;
