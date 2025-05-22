import { AxiosResponse } from "axios";
import $api from "../http/http";

export class AnimalsService {
  static async getAll() {
    return $api.get("/animals");
  }
  static async getById(id: number | string) {
    return $api.get(`/animals/${id}`);
  }

  static async create(animal: FormData) {
    return $api.post("/animals", animal, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static async update(id: string, animal: FormData) {
    return $api.patch(`/animals/${id}`, animal, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static async delete(id: number) {
    return $api.delete(`/animals/${id}`);
  }

  static async search(
    page?: number,
    pageSize?: number,
    filter?: {
      animalType?: string;
      health?: string;
      size?: string;
      color?: string;
      age?: number;
      animalBreedId?: number;
    }
  ): Promise<AxiosResponse<any>> {
    const params = new URLSearchParams();

    if (page) params.append("page", page.toString());

    if (pageSize) params.append("pageSize", pageSize.toString());

    if (filter?.animalType?.length) {
      params.append("animalType", filter.animalType);
    }
    if (filter?.health) {
      params.append("health", filter.health.toString());
    }
    if (filter?.size) {
      params.append("size", filter.size.toString());
    }
    if (filter?.color) {
      params.append("color", filter.color.toString());
    }
    if (filter?.age) {
      params.append("age", filter.age.toString());
    }
    if (filter?.animalBreedId) {
      params.append("animalBreedId", filter.animalBreedId.toString());
    }

    return $api.get<any>(`animals?${params.toString()}`);
  }
}
