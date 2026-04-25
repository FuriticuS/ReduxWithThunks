import type { ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearSelectedUser } from "./userDetailsSlice";

function SelectedUserDetails(): ReactElement {
  const selectedUserId = useAppSelector(
    (state) => state.selectedUser.selectedUserId
  );
  const users = useAppSelector((state) => state.userList.users);

  const dispatch = useAppDispatch();

  if (selectedUserId === null) {
    return <p>No user selected</p>;
  }

  const user = users.find((u) => u.id === selectedUserId);
  if (!user) {
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
        onClick={() => dispatch(clearSelectedUser())}
      >
        Clear Selection
      </button>
    </div>
  );
}

export default SelectedUserDetails;
