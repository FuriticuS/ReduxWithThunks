import {useDispatch, useSelector} from "react-redux";
import {clearSelectedUser} from "./userDetailsSlice.js";

function SelectedUserDetails() {
  const selectedUser = useSelector(state => state.selectedUser.selectedUserId);
  const users = useSelector(state => state.userList.users);

  const dispatch = useDispatch();

  if(!selectedUser) {
    return <p>No user selected</p>
  }

  const user = users.find(user => user.id === selectedUser)
  if(!user) {
    return <p>User not found</p>
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

      <button className="clear-btn" onClick={() => dispatch(clearSelectedUser())}>Clear Selection</button>
    </div>
  );
}

export default SelectedUserDetails;
