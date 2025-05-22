import { AxiosResponse } from "axios";
import $api from "../http/http";

export class StatisticService {
  static async getAll() {
    return $api.get("/statistic");
  }
}
