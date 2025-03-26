import { AxiosResponse } from "axios";
import $api from "../http/http";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<any>> {
    return $api
      .post<any>("auth/login", { email, password })
      .then((response) => response);
  }

  static async registration(
    email: string,
    password: string,
    login: string,
    phone: string,
    FIO: string
  ): Promise<any> {
    return $api
      .post<any>("auth/registration", {
        email,
        password,
        login,
        phone,
        FIO: FIO || "FIO",
      })
      .then((response) => response)
      .catch((response) => response);
  }

  static async logout(): Promise<void> {
    $api.post<any>("user/logout");
  }

  static async forgotPassword(email: string): Promise<any> {
    return await $api.post("auth/forgot-password", { email });
  }

  static async getProfile() {
    return $api.get<any>("auth/profile").then((response) => response);
  }

  static async updateProfile(data: {
    FIO?: string;
    phone?: string;
    password?: string;
  }) {
    return $api.put("/users", data).then((response) => response);
  }
}
