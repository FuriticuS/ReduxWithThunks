import {useDispatch, useSelector} from "react-redux";
import {deleteUser, fetchUsers} from "./userListSlice.js";
import {selectedUser} from "../userDetails/userDetailsSlice.js";


function UserList() {
  const users = useSelector(state => state.userList.users)
  const error = useSelector(state => state.userList.error)
  const loading = useSelector(state => state.userList.loading)

  const dispatch = useDispatch();

  return (
    <div className="user-list">
      <h2>User List</h2>

      <button className="load-btn" onClick={() => dispatch(fetchUsers())}>Load Users</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {!error && <ul>
        {users.map(user =>
          <li key={user.id}>
            <span>{user.name} - {user.email}</span>
            <div className="btn-group">
              <button className="select-btn" onClick={() => dispatch(selectedUser(user.id))}>Select</button>

              <button className="delete-btn" onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
            </div>
          </li>
        )}
      </ul>}
    </div>
  );
}

export default UserList;
