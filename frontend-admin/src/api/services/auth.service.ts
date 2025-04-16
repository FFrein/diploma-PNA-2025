import { AxiosResponse } from "axios";
import $api from "../http/http";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<any>> {
    return $api
      .post<any>("auth/login", { email, password, role: "admin" })
      .then((response) => response);
  }

  static async registration(
    email: string,
    password: string,
    username: string,
    phonenumber: string
  ): Promise<any> {
    return $api
      .post<any>("auth/registration", {
        email,
        password,
        username,
        phonenumber,
      })
      .then((response) => response)
      .catch((response) => response);
  }

  static async logout(): Promise<void> {
    $api.post<any>("auth/logout");
  }

  static async ban(id: number, ban: number): Promise<any> {
    return $api
      .put<any>("user/ban", { id, ban })
      .then((response) => response)
      .catch((response) => response);
  }
}
