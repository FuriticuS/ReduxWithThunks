import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { User } from "../../types/user";

const selectUsers = (state: RootState): User[] => state.userList.users;

const selectSelectedUserId = (state: RootState): number | null =>
  state.selectedUser.selectedUserId;

export type SelectedUserViewModel =
  | { kind: "none" }
  | { kind: "notFound"; id: number }
  | { kind: "user"; user: User };

export const selectSelectedUserView = createSelector(
  [selectUsers, selectSelectedUserId],
  (users, selectedUserId): SelectedUserViewModel => {
    if (selectedUserId === null) {
      return { kind: "none" };
    }
    const user = users.find((user: User) => user.id === selectedUserId);
    if (user === undefined) {
      return { kind: "notFound", id: selectedUserId };
    }
    return { kind: "user", user };
  }
);
