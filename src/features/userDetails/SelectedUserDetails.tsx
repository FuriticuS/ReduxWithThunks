import type { JSX } from "react";
import { useAppDispatch } from "../../hooks";
import { clearSelectedUser } from "./userDetailsSlice";
import { useSelectedUserView } from "./useSelectedUserView";

export const SelectedUserDetails = (): JSX.Element => {
  const selection = useSelectedUserView();
  const dispatch = useAppDispatch();

  const handleClearSelection = (): void => {
    dispatch(clearSelectedUser());
  };

  if (selection.kind === "none") {
    return <p>No user selected</p>;
  }

  if (selection.kind === "notFound") {
    return <p>User not found</p>;
  }

  const { user } = selection;

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
