import type { User } from "../../types/user";

export const usersQueryKey = ["users"] as const;

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch users.");
  }
  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Invalid response shape.");
  }
  return data as User[];
};
