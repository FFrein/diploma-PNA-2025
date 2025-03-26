import React, { useState } from "react";
import "./NewsForm.css";
import { NewsService } from "../../api/services/all.services";

export const NewsCreate: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await NewsService.create({ title, description, file: file || undefined });
      setSuccess("Новость успешно создана!");
      setTitle("");
      setDescription("");
      setFile(null);
      setImagePreview(null);
    } catch (err: any) {
      setError("Ошибка при создании новости: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="news-form-container">
      <h2>Создать новость</h2>
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
          {isLoading ? "Создание..." : "Создать"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
};

export default NewsCreate;
