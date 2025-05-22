import { AxiosResponse } from "axios";
import $api from "../http/http";

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
