import { AxiosResponse } from "axios";
import $api from "../http/http";

export class VaccinationService {
  static async getAll() {
    return $api.get("/vactination");
  }

  static async create(data: any) {
    console.log(data);
    return $api.post("/vactination", data);
  }

  static async delete(id: string | number) {
    return $api.delete(`/vactination/${id}`);
  }
}
