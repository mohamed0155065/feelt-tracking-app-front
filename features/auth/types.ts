export type LoginCredentials = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type LoginResponseData = {
  token: string;
  user: User;
};

export type ApiErrorShape = {
  message: string;
  errors: Record<string, string[]>;
  status: number;
};