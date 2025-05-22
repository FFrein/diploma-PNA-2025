import { AxiosResponse } from "axios";
import $api from "../http/http";

export class VaccinationAnimalService {
  static async create(vaccination: { animal: number; vaccination: number }) {
    return $api.post("/vaccination-animal", { ...vaccination });
  }

  static async delete(animalId: number, vaccinationId: number) {
    return $api.delete(`/vaccination-animal/${animalId}/${vaccinationId}`);
  }
}
