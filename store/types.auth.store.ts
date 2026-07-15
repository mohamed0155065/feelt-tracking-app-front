// types of user information
type UserInfo = {
  id: string | null;
  name: string | null;
  email: string | null;
  role: string | null;
};

// types of states
type AuthState = {
  token?: string;
  userInfo: UserInfo;
};

// types of actions
type AuthActions = {
  setUserInfo: (userInfo: UserInfo) => void;
  setToken: (token?: string) => void;
  logOut: () => void;
};

// types of states & actions
export type AuthTypes = AuthState & AuthActions;
