import React, { useState } from "react";
import "./styles.css";
import { VaccinationService } from "../../api/services/vactination.service";

export const VaccinationCreate: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedAnimalType, setSelectedAnimalType] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Обработка отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await VaccinationService.create({
        name: title,
        description,
        animalType: selectedAnimalType,
      });
      setSuccess("Прививка успешно создана!");
      setTitle("");
      setDescription("");
    } catch (err: any) {
      setError("Ошибка при создании новости: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="news-form-container">
      <h2>Создание прививки</h2>
      <form onSubmit={handleSubmit} className="news-form">
        <div className="form-group">
          <label>Название:</label>
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
          <label>Тип животного:</label>
          <select
            value={selectedAnimalType || ""}
            onChange={(e) => setSelectedAnimalType(e.target.value)}
            className="form-input"
          >
            <option value="">Тип животного</option>
            <option value="cat">Кот</option>
            <option value="dog">Собака</option>
          </select>
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

export default VaccinationCreate;
