import { reactive } from "vue";
import userContext, { login, logout } from "@/contexts/userContext";
import { UserProps } from "@/@types/user";

type StoreType = {
  [key: string]: string;
};

const localStorageMock = (() => {
  let store: StoreType = {};
  return {
    getItem: (key: string) => store[key],
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("userContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("logs in a user and saves user data to localStorage", () => {
    const user: UserProps = { email: "test@example.com", password: "password" };
    login(user.email, user.password);
    expect(userContext.state.user).toEqual(user);
    expect(localStorage.getItem("user")).toEqual(JSON.stringify(user));
  });

  it("logs out a user and removes user data from localStorage", () => {
    const user: UserProps = { email: "test@example.com", password: "password" };
    login(user.email, user.password);
    logout();
    expect(userContext.state.user).toBeNull();
    expect(localStorage.getItem("user")).toBeUndefined();
  });
});
