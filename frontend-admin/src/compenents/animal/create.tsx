import React, { useState, useEffect } from "react";
import "./AnimalCreate.css";
import {
  animalBreedService,
  AnimalsService,
} from "../../api/services/all.services";

export const AnimalCreate: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [age, setAge] = useState<number | undefined>(undefined);
  const [gender, setGender] = useState<string | undefined>(undefined);
  const [animalType, setAnimalType] = useState<string | undefined>(undefined);
  const [health, setHealth] = useState<string | undefined>(undefined);
  const [size, setSize] = useState<string | undefined>(undefined);
  const [color, setColor] = useState<string | undefined>(undefined);
  const [image, setImage] = useState<File | null>(null);
  const [foodPerDay, setFodPerDay] = useState<number | null>(null);
  const [toiletPerDay, settToiletPerDay] = useState<number | null>(null);
  const [sterilized, setSterilized] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [animalBreedId, setAnimalBreedId] = useState<number | undefined>(
    undefined
  );
  const [animalBreeds, setAnimalBreeds] = useState<any[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("name", name || "");
    formData.append("description", description || "");
    if (age) formData.append("age", age.toString());
    if (gender) formData.append("gender", gender);
    if (animalType) formData.append("animalType", animalType);
    if (health) formData.append("health", health);
    if (size) formData.append("size", size);
    if (color) formData.append("color", color);
    if (foodPerDay) formData.append("foodPerDay", foodPerDay.toString());
    if (toiletPerDay) formData.append("toiletPerDay", toiletPerDay.toString());
    if (sterilized)
      formData.append("sterilized", (sterilized == 2 ? 0 : 1).toString());
    if (animalBreedId) formData.append("animalBreed", animalBreedId.toString());
    if (image) formData.append("file", image);

    try {
      await AnimalsService.create(formData);
      setSuccess("Животное успешно создано!");
      setName("");
      setDescription("");
      setAge(undefined);
      setGender(undefined);
      setAnimalType(undefined);
      setHealth(undefined);
      setSize(undefined);
      setColor(undefined);
      setImage(null);
      settToiletPerDay(null);
      setFodPerDay(null);
      setSterilized(null);
      setImagePreview(null);
      setAnimalBreedId(undefined);
    } catch (err: any) {
      setError("Ошибка при создании животного: " + err.message);
    }
  };

  const handleGetAnimalBreeds = async () => {
    try {
      const resp = await animalBreedService.getAll();
      setAnimalBreeds(resp.data);
    } catch (err: any) {
      setError("Ошибка при получении данных о породах: " + err.message);
      setAnimalBreeds([]);
    }
  };

  useEffect(() => {
    handleGetAnimalBreeds();
  }, []);

  return (
    <div className="animal-create-container">
      <h2>Создать животное</h2>
      <form onSubmit={handleSubmit} className="animal-create-form">
        <div className="form-grid">
          {/* Колонка 1 */}
          <div className="form-group">
            <label>Имя:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Возраст:</label>
            <input
              type="number"
              value={age || ""}
              onChange={(e) =>
                setAge(e.target.value ? Number(e.target.value) : undefined)
              }
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Пол:</label>
            <select
              value={gender || ""}
              onChange={(e) => setGender(e.target.value || undefined)}
              className="form-input"
            >
              <option value="">Выберите пол</option>
              <option value="male">Мужской</option>
              <option value="female">Женский</option>
            </select>
          </div>
          <div className="form-group">
            <label>Тип животного:</label>
            <select
              value={animalType || ""}
              onChange={(e) => setAnimalType(e.target.value || undefined)}
              className="form-input"
            >
              <option value="">Выберите тип</option>
              <option value="cat">Кот</option>
              <option value="dog">Собака</option>
              <option value="bird">Птица</option>
            </select>
          </div>

          {/* Колонка 2 */}
          <div className="form-group">
            <label>Порода:</label>
            <select
              value={animalBreedId || ""}
              onChange={(e) =>
                setAnimalBreedId(
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              className="form-input"
            >
              <option value="">Выберите породу</option>
              {animalBreeds.map((breed) => (
                <option key={breed.id} value={breed.id}>
                  {breed.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Состояние здоровья:</label>
            <select
              value={health || ""}
              onChange={(e) => setHealth(e.target.value || undefined)}
              className="form-input"
            >
              <option value="">Выберите состояние</option>
              <option value="healthy">Здоров</option>
              <option value="temporaryIllness">Временное заболевание</option>
              <option value="chronic">Хроническое заболевание</option>
            </select>
          </div>
          <div className="form-group">
            <label>Размер:</label>
            <select
              value={size || ""}
              onChange={(e) => setSize(e.target.value || undefined)}
              className="form-input"
            >
              <option value="">Выберите размер</option>
              <option value="small">Маленький</option>
              <option value="medium">Средний</option>
              <option value="large">Большой</option>
            </select>
          </div>
          <div className="form-group">
            <label>Цвет:</label>
            <select
              value={color || ""}
              onChange={(e) => setColor(e.target.value || undefined)}
              className="form-input"
            >
              <option value="">Выберите цвет</option>
              <option value="black">Чёрный</option>
              <option value="white">Белый</option>
              <option value="brown">Коричневый</option>
              <option value="grey">Серый</option>
              <option value="ginger">Рыжий</option>
            </select>
          </div>

          {/* Колонка 3 */}
          <div className="form-group">
            <label>Еды в день:</label>
            <input
              type="number"
              value={foodPerDay || ""}
              onChange={(e) =>
                setFodPerDay(e.target.value ? Number(e.target.value) : null)
              }
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Туалетного наполнителя в день:</label>
            <input
              type="number"
              value={toiletPerDay || ""}
              onChange={(e) =>
                settToiletPerDay(e.target.value ? Number(e.target.value) : null)
              }
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Стерилизован:</label>
            <select
              value={sterilized || ""}
              onChange={(e) => setSterilized(Number(e.target.value) || null)}
              className="form-input"
            >
              <option value="">Выберите</option>
              <option value="1">Да</option>
              <option value="2">Нет</option>
            </select>
          </div>
          <div className="form-group">
            <label>Изображение:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="form-input"
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Предпросмотр" />
              </div>
            )}
          </div>
        </div>

        {/* Описание и кнопка вне колонок */}
        <div className="form-group full-width">
          <label>Описание:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Создать
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
};

export default AnimalCreate;
