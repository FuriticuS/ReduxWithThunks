import { useQueryClient } from "@tanstack/react-query";
import type { JSX } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { User } from "../../types/user";
import { usersQueryKey } from "./usersQuery";

type AddUserFormFields = {
  name: string;
  email: string;
};

export const AddUserForm = (): JSX.Element => {
  const queryClient = useQueryClient();
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
    queryClient.setQueryData<User[]>(usersQueryKey, (previous) => [
      ...(previous ?? []),
      newUser,
    ]);
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
