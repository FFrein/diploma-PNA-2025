import { AxiosResponse } from "axios";
import $api from "../http/http";

export class animalBreedService {
  static async getAll() {
    return $api.get("/animal-breed");
  }
}
