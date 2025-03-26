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

export class animalBreedService {
  static async getAll() {
    return $api.get("/animal-breed");
  }
}

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

export class VaccinationService {
  static async getAll() {
    return $api.get("/vactination");
  }
}

export class VaccinationAnimalService {
  static async create(vaccination: { animal: number; vaccination: number }) {
    return $api.post("/vaccination-animal", { ...vaccination });
  }

  static async delete(animalId: number, vaccinationId: number) {
    return $api.delete(`/vaccination-animal/${animalId}/${vaccinationId}`);
  }
}

export class ReviewsService {
  // Поиск отзывов с пагинацией
  static async search(
    page?: number,
    pageSize?: number
  ): Promise<AxiosResponse<any>> {
    const params = new URLSearchParams();

    if (page) params.append("page", page.toString());
    if (pageSize) params.append("pageSize", pageSize.toString());

    return $api.get<any>(`/reviews?${params.toString()}`); // Исправлено "rewievs" на "reviews"
  }

  // Создание отзыва
  static async create(review: {
    rating: number;
    description: string;
    user: number;
  }): Promise<AxiosResponse<any>> {
    return $api.post("/reviews", review, {
      headers: { "Content-Type": "application/json" },
    });
  }

  // Обновление отзыва
  static async update(
    id: number,
    review: { rating?: number; description?: string; user: number }
  ): Promise<AxiosResponse<any>> {
    return $api.patch(`/reviews/${id}`, review, {
      headers: { "Content-Type": "application/json" },
    });
  }

  // Удаление отзыва
  static async delete(id: number): Promise<AxiosResponse<any>> {
    return $api.delete(`/reviews/${id}`);
  }

  // Получение всех отзывов (опционально)
  static async getAll(): Promise<AxiosResponse<any>> {
    return $api.get("/reviews");
  }

  // Получение отзыва по ID (опционально)
  static async getByUserId(id: number): Promise<AxiosResponse<any>> {
    return $api.get(`/reviews/${id}`);
  }
}

export class NewsService {
  // Поиск новостей с пагинацией
  static async search(
    page?: number,
    pageSize?: number
  ): Promise<AxiosResponse<any>> {
    const params = new URLSearchParams();

    if (page) params.append("page", page.toString());
    if (pageSize) params.append("pageSize", pageSize.toString());

    return $api.get<any>(`/news?${params.toString()}`);
  }

  // Создание новости
  static async create(news: {
    title: string;
    description: string;
    file?: File; // Поле для изображения, опционально
  }): Promise<AxiosResponse<any>> {
    const formData = new FormData();
    formData.append("title", news.title);
    formData.append("description", news.description);
    if (news.file) formData.append("file", news.file);

    return $api.post("/news", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  // Обновление новости
  static async update(
    id: number,
    news: { title?: string; description?: string; file?: File }
  ): Promise<AxiosResponse<any>> {
    const formData = new FormData();
    if (news.title) formData.append("title", news.title);
    if (news.description) formData.append("description", news.description);
    if (news.file) formData.append("file", news.file);

    return $api.patch(`/news/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  // Удаление новости
  static async delete(id: number): Promise<AxiosResponse<any>> {
    return $api.delete(`/news/${id}`);
  }

  // Получение всех новостей (опционально)
  static async getAll(): Promise<AxiosResponse<any>> {
    return $api.get("/news");
  }

  // Получение новости по ID
  static async getById(id: number): Promise<AxiosResponse<any>> {
    return $api.get(`/news/${id}`);
  }
}
