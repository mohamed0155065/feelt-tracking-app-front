type UserInfo = {
  id: string | null;
  name: string | null;
  email: string | null;
  phone?: string | null;
  vehicle_id: number | null;
  role: string | null;
};

type AuthState = {
  token?: string;
  userInfo: UserInfo;
};

type AuthActions = {
  setUserInfo: (userInfo: UserInfo) => void;
  setToken: (token?: string) => void;
  logOut: () => void;
};

export type AuthTypes = AuthState & AuthActions;