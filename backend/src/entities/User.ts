import { role } from '@prisma/client';

export class User {
  id!: number;
  role!: role;

  email: String;
  password!: string;

  FIO!: String;

  phone?: String;
}
