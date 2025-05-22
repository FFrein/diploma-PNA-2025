import { AxiosResponse } from "axios";
import $api from "../http/http";

export class AnimalsImagesService {
  static async create(animal: FormData) {
    return $api.post("/animals-images", animal, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static async delete(id: number) {
    return $api.delete(`/animals-images/${id}`);
  }
}
