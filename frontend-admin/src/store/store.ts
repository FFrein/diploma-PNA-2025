import { makeAutoObservable } from "mobx";
import AuthService from "../api/services/auth.service";
import $api from "../api/http/http";
import { toast } from "react-toastify";

export default class Store {
  user = {} as any;
  isAuth = false;
  isLoading = true;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: any) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(email: string, password: string) {
    try {
      const resp = await AuthService.login(email, password);
      console.log(resp.data);
      localStorage.setItem("access_token", resp.data.access_token);
      localStorage.setItem("refresh_token", resp.data.refresh_token);
      this.setAuth(true);
      this.setUser(resp.data.user);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async registration(
    username: string,
    email: string,
    password: string,
    phonenumber: string
  ) {
    try {
      const resp = await AuthService.registration(
        email,
        password,
        username,
        phonenumber
      );
      if (resp.status !== 200 && resp.status !== 201) {
        console.log(resp);
        throw new Error(resp.response.data.error || "Registration failed");
      }
      localStorage.setItem("access_token", resp.data.access_token);

      this.setAuth(true);
      this.setUser(resp.data.user);
      toast.success("Регистрация прошла успешно!");
    } catch (e: any) {
      console.error(e.message);
      throw e;
    }
  }

  async logout() {
    this.setLoading(true);
    try {
      //await AuthService.logout();
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      this.setAuth(false);
      this.setUser({} as any);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      console.log(localStorage.getItem("refresh_token"));
      const resp = await $api.post<any>(
        `auth/refresh`,
        { refresh_token: localStorage.getItem("refresh_token") },
        {
          withCredentials: true,
        }
      );
      console.log(resp.data);
      if (resp.data.access_token) {
        localStorage.setItem("access_token", resp.data.access_token);
        localStorage.setItem("refresh_token", resp.data.refresh_token);
        this.setAuth(true);
        this.setUser(resp.data.user);
      } else {
        this.setAuth(false);
      }
    } catch (e: any) {
      //console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}
