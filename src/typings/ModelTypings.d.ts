interface DocumentResult<T> {
  _doc: T;
}

export interface cartItemTypes extends DocumentResult<cartItemTypes> {
  productId: object;
  userId: object;
  productCount: number;
  totalAmount: number;
}

export interface adminModelTypings extends DocumentResult<adminModelTypings> {
  _id?: string;
  username: string;
  email: string;
  password?: string;
  createdAt?: date;
  updatedAt?: date;
}
export interface adminModelTypes {
  _id?: string;
  username: string;
  email: string;
  password?: string;
  createdAt?: date;
  updatedAt?: date;
}
export interface productTypes extends DocumentResult<productTypes> {
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
interface userModelTypes extends DocumentResult<userModelTypes> {
  _id?: string;
  first_name: string;
  email: string;
  password: string;
  last_name: string;
}
