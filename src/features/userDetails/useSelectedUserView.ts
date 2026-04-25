import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../hooks";
import type { RootState } from "../../store";
import type { User } from "../../types/user";
import { fetchUsers, usersQueryKey } from "../usersList/usersQuery";

export type SelectedUserViewModel =
  | { kind: "none" }
  | { kind: "notFound"; id: number }
  | { kind: "user"; user: User };

export const useSelectedUserView = (): SelectedUserViewModel => {
  const selectedUserId = useAppSelector(
    (state: RootState) => state.selectedUser.selectedUserId
  );
  const { data: users = [] } = useQuery({
    queryKey: usersQueryKey,
    queryFn: fetchUsers,
    enabled: false,
  });

  if (selectedUserId === null) {
    return { kind: "none" };
  }
  const user = users.find((u: User) => u.id === selectedUserId);
  if (user === undefined) {
    return { kind: "notFound", id: selectedUserId };
  }
  return { kind: "user", user };
};
