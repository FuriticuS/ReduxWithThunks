import type { JSX } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../hooks";
import type { User } from "../../types/user";
import { addUser } from "./userListSlice";

type AddUserFormFields = {
  name: string;
  email: string;
};

export const AddUserForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm<AddUserFormFields>({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit: SubmitHandler<AddUserFormFields> = (data) => {
    const newUser: User = {
      id: Math.floor(Math.random() * 100) + 1,
      name: data.name,
      email: data.email,
    };
    dispatch(addUser(newUser));
    reset();
  };

  return (
    <form className="add-user-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Name"
        {...register("name")}
      />
      <input
        type="email"
        placeholder="Email"
        {...register("email")}
      />
      <button type="submit">Add User</button>
    </form>
  );
};
