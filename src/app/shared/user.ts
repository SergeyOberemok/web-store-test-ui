export interface UserDto {
  id: number;
  email: string;
  password: string;
}

export class User implements UserDto {
  id: number;
  email: string;
  password: string;

  constructor(params: { email?: string, password?: string } = {}) {
    this.email = params.email;
    this.password = params.password;
  }
}
