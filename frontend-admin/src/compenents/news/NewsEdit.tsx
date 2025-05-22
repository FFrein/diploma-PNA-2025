import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./NewsForm.css";
import { NewsService } from "../../api/services/news.service";

export const NewsEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Загрузка данных новости
  const fetchNews = async (newsId: string) => {
    setIsLoading(true);
    try {
      const response = await NewsService.getById(+newsId);
      const news = response.data;
      setTitle(news.title);
      setDescription(news.description);
      setImagePreview(news.iamge || null);
      setError(null);
    } catch (err: any) {
      setError("Ошибка при загрузке новости: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchNews(id);
    }
  }, [id]);

  // Обработка загрузки изображения
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Обработка отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await NewsService.update(+id, {
        title,
        description,
        file: file || undefined,
      });
      setSuccess("Новость успешно обновлена!");
      setFile(null); // Сбрасываем только файл, оставляем текущие значения
    } catch (err: any) {
      setError("Ошибка при обновлении новости: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="news-form-container">
      <h2>Редактировать новость</h2>
      {isLoading && !title ? (
        <p>Загрузка...</p>
      ) : error && !title ? (
        <div className="error-message">{error}</div>
      ) : (
        <form onSubmit={handleSubmit} className="news-form">
          <div className="form-group">
            <label>Заголовок:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label>Описание:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input"
              rows={5}
              required
            />
          </div>
          <div className="form-group">
            <label>Изображение:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="form-input"
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Предпросмотр" />
              </div>
            )}
          </div>
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Сохранение..." : "Сохранить"}
          </button>
        </form>
      )}
      {error && title && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
};

export default NewsEdit;
