import type { FormEvent, ReactElement } from "react";
import { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { addUser } from "./userListSlice";

function AddUserForm(): ReactElement {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useAppDispatch();

  function handleClickAdd(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    dispatch(
      addUser({
        id: Math.floor(Math.random() * 100) + 1,
        name,
        email,
      })
    );
    setName("");
    setEmail("");
  }

  return (
    <form className="add-user-form" onSubmit={handleClickAdd}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Add User</button>
    </form>
  );
}

export default AddUserForm;
