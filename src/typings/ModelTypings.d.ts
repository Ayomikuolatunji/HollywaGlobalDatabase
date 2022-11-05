export interface adminModelTypings {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
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
}
