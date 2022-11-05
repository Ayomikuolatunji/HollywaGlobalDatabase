export interface adminModelTypings {
  _id?: string;
  username: string;
  email: string;
  password?: string;
  createdAt?: date;
  updatedAt?: date;
}

export interface productTypes {
  _id?: string;
  name: string;
  price: number;
  description: string;
  type: string;
  image: string;
  adminId: string;
  status: boolean;
  currency: string;
  createdAt?: date;
  updatedAt?: date;
}
