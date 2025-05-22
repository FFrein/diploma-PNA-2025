import { AxiosResponse } from "axios";
import $api from "../http/http";

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
