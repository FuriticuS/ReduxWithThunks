import type { ChangeEvent, FormEvent, JSX } from "react";
import { useState } from "react";
import { useAppDispatch } from "../../hooks";
import type { User } from "../../types/user";
import { addUser } from "./userListSlice";

export const AddUserForm = (): JSX.Element => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newUser: User = {
      id: Math.floor(Math.random() * 100) + 1,
      name,
      email,
    };
    dispatch(addUser(newUser));
    setName("");
    setEmail("");
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  return (
    <form className="add-user-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <button type="submit">Add User</button>
    </form>
  );
};
