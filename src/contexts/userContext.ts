import { reactive } from "vue";
import { UserProps } from "../@types/user";

type UserState = {
  user: UserProps | null;
};

const localStorageKey = "user";

function getInitialUser(): UserProps | null {
  const userJson = localStorage.getItem(localStorageKey);
  return userJson ? JSON.parse(userJson) : null;
}

const state: UserState = reactive({
  user: getInitialUser(),
});

export function saveUser(user: UserProps) {
  localStorage.setItem(localStorageKey, JSON.stringify(user));
}

export function login(email: string, password: string) {
  const user: UserProps = { email, password };
  state.user = user;
  saveUser(user);
}

export function logout() {
  state.user = null;
  localStorage.removeItem(localStorageKey);
}
export default {
  state,
  login,
  logout,
};
