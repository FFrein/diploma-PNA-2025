import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AnimalsImagesService,
  AnimalsService,
  VaccinationAnimalService,
  VaccinationService,
  animalBreedService,
} from "../../api/services/all.services";
import "./AnimalEdit.css";

export const AnimalEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [age, setAge] = useState<number | undefined>(undefined);
  const [gender, setGender] = useState<string | undefined>(undefined);
  const [animalType, setAnimalType] = useState<string | undefined>(undefined);
  const [health, setHealth] = useState<string | undefined>(undefined);
  const [size, setSize] = useState<string | undefined>(undefined);
  const [color, setColor] = useState<string | undefined>(undefined);
  const [foodPerDay, setFoodPerDay] = useState<number | null>(null);
  const [toiletPerDay, setToiletPerDay] = useState<number | null>(null);
  const [sterilized, setSterilized] = useState<number | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [additionalImagesPreviews, setAdditionalImagesPreviews] = useState<
    string[]
  >([]);
  const [existingImages, setExistingImages] = useState<any[]>([]); // Текущие изображения
  const [animalBreedId, setAnimalBreedId] = useState<number | undefined>(
    undefined
  );
  const [animalBreeds, setAnimalBreeds] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Загрузка данных животного
  const fetchAnimal = async () => {
    try {
      const response = await AnimalsService.getById(id!);
      const animal = response.data;
      setName(animal.name || "");
      setDescription(animal.description || "");
      setAge(animal.age || undefined);
      setGender(animal.gender || undefined);
      setAnimalType(animal.animalType || undefined);
      setHealth(animal.health || undefined);
      setSize(animal.size || undefined);
      setColor(animal.color || undefined);
      setFoodPerDay(animal.foodPerDay || null);
      setToiletPerDay(animal.toiletPerDay || null);
      setSterilized(animal.sterilized ? 1 : 0);
      setAnimalBreedId(animal.animalBreedId || undefined);
      setExistingImages(animal.animalImages || []); // Загружаем текущие изображения
      setVaccinations(animal.vaccinations || []);
    } catch (err: any) {
      setError("Ошибка при загрузке данных животного: " + err.message);
    }
  };

  // Загрузка пород
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
    if (id) {
      fetchAnimal();
      handleGetAnimalBreeds();
      handleGetVaccinations();
    }
  }, [id]);

  // Обработка выбора дополнительных изображений
  const handleAdditionalImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      setAdditionalImages(files);
      const previews = files.map((file) => URL.createObjectURL(file));
      setAdditionalImagesPreviews(previews);
    }
  };

  // Обработка отправки формы редактирования
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
    if (sterilized !== null)
      formData.append("sterilized", sterilized.toString());
    if (animalBreedId) formData.append("animalBreed", animalBreedId.toString());

    try {
      if (id) {
        console.log(formData);
        await AnimalsService.update(id, formData);
      }
      setSuccess("Животное успешно обновлено!");
    } catch (err: any) {
      setError("Ошибка при обновлении животного: " + err.message);
    }
  };

  // Обработка отправки дополнительных изображений
  const handleAdditionalImagesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!additionalImages.length) {
      setError("Выберите хотя бы одно изображение для загрузки");
      return;
    }

    try {
      const uploadPromises = additionalImages.map(async (file) => {
        const formData = new FormData();
        formData.append("animal", id!);
        formData.append("file", file);
        return AnimalsImagesService.create(formData);
      });

      await Promise.all(uploadPromises);
      setSuccess("Дополнительные изображения успешно добавлены!");
      setAdditionalImages([]);
      setAdditionalImagesPreviews([]);
      await fetchAnimal(); // Обновляем данные животного после загрузки
    } catch (err: any) {
      setError("Ошибка при добавлении изображений: " + err.message);
    }
  };

  // Обработка удаления изображения
  const handleDeleteImage = async (imageId: number) => {
    try {
      await AnimalsImagesService.delete(imageId);
      setExistingImages(existingImages.filter((img) => img.id !== imageId));
      setSuccess("Изображение успешно удалено!");
    } catch (err: any) {
      setError("Ошибка при удалении изображения: " + err.message);
    }
  };

  const [vaccinations, setVaccinations] = useState<any[]>([]); // Текущие вакцины животного
  const [allVaccinations, setAllVaccinations] = useState<any[]>([]); // Все доступные вакцины
  const [selectedVaccinationId, setSelectedVaccinationId] = useState<
    number | undefined
  >(undefined);

  // Обработка удаления вакцины
  const handleDeleteVaccination = async (
    animalId: number,
    vaccinationId: number
  ) => {
    try {
      await VaccinationAnimalService.delete(animalId, vaccinationId);
      setVaccinations(
        vaccinations.filter((v) => v.vaccinationId !== vaccinationId)
      );
      setSuccess("Вакцина успешно удалена!");
    } catch (err: any) {
      setError("Ошибка при удалении вакцины: " + err.message);
    }
  };

  // Обработка добавления вакцины
  const handleAddVaccination = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!selectedVaccinationId) {
      setError("Выберите вакцину для добавления");
      return;
    }

    try {
      await VaccinationAnimalService.create({
        animal: Number(id),
        vaccination: Number(selectedVaccinationId),
      });

      setSuccess("Вакцина успешно добавлена!");
      setSelectedVaccinationId(undefined); // Сбрасываем выбор
      await fetchAnimal(); // Обновляем данные животного
    } catch (err: any) {
      setError("Ошибка при добавлении вакцины: " + err.message);
    }
  };

  // Загрузка всех вакцин
  const handleGetVaccinations = async () => {
    try {
      const resp = await VaccinationService.getAll();
      setAllVaccinations(resp.data);
    } catch (err: any) {
      setError("Ошибка при получении списка вакцин: " + err.message);
      setAllVaccinations([]);
    }
  };

  return (
    <div className="animal-edit-container">
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <div className="animal-edit-container-forms">
        {/* Форма редактирования */}
        <div>
          <h2>Редактировать животное</h2>
          <form onSubmit={handleSubmit} className="animal-edit-form">
            <div className="animal-edit-form-grid">
              {/* Колонка 1 */}
              <div className="form-column">
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
                  <label>Описание:</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Колонка 2 */}
              <div className="form-column">
                <div className="form-group">
                  <label>Возраст:</label>
                  <input
                    type="number"
                    value={age || ""}
                    onChange={(e) =>
                      setAge(
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Еды в день:</label>
                  <input
                    type="number"
                    value={foodPerDay || ""}
                    onChange={(e) =>
                      setFoodPerDay(
                        e.target.value ? Number(e.target.value) : null
                      )
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
                      setToiletPerDay(
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Стерилизован:</label>
                  <select
                    value={sterilized === null ? "" : sterilized}
                    onChange={(e) =>
                      setSterilized(
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                    className="form-input"
                  >
                    <option value="">Выберите</option>
                    <option value="1">Да</option>
                    <option value="0">Нет</option>
                  </select>
                </div>
              </div>

              {/* Колонка 3 */}
              <div className="form-column">
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
                    <option value="temporaryIllness">
                      Временное заболевание
                    </option>
                    <option value="chronic">Хроническое заболевание</option>
                  </select>
                </div>
              </div>

              {/* Колонка 4 */}
              <div className="form-column">
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
              </div>
            </div>
            <button type="submit" className="submit-button">
              Сохранить изменения
            </button>
          </form>
        </div>

        {/* Форма для дополнительных изображений */}
        <div>
          <h3>Добавить дополнительные изображения</h3>
          <div className="existing-images-container">
            {existingImages.length > 0 && (
              <div className="existing-images">
                {existingImages.map((img) => (
                  <div key={img.id} className="image-wrapper">
                    <img src={img.imageUrl} alt={`Изображение ${img.id}`} />
                    <button
                      className="delete-image-btn"
                      onClick={() => handleDeleteImage(img.id)}
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <form
            onSubmit={handleAdditionalImagesSubmit}
            className="additional-images-form"
          >
            <div className="form-group">
              <label>Выберите новые изображения:</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleAdditionalImagesChange}
                className="form-input"
              />
              {additionalImagesPreviews.length > 0 && (
                <div className="additional-images-preview">
                  {additionalImagesPreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Предпросмотр ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
            <button type="submit" className="submit-button">
              Загрузить изображения
            </button>
          </form>
        </div>

        {/* Секция вакцин */}
        <div>
          <h3>Вакцины животного</h3>
          <div className="vaccinations-container">
            {vaccinations.length > 0 ? (
              <ul className="vaccination-list">
                {vaccinations.map((vac) => {
                  const vaccinationDetails = allVaccinations.find(
                    (v) => v.id === vac.vaccinationId
                  );
                  return (
                    <li key={vac.id} className="vaccination-item">
                      {vaccinationDetails ? (
                        <p>{vaccinationDetails.name}</p>
                      ) : (
                        `Вакцина ID: ${vac.vaccinationId}`
                      )}
                      <button
                        className="delete-vaccination-btn"
                        onClick={() =>
                          handleDeleteVaccination(
                            vac.animalId,
                            vac.vaccinationId
                          )
                        }
                      >
                        ❌
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>У животного нет вакцин</p>
            )}
          </div>
          <form
            onSubmit={handleAddVaccination}
            className="add-vaccination-form"
          >
            <div className="form-group">
              <label>Добавить вакцину:</label>
              <select
                value={selectedVaccinationId || ""}
                onChange={(e) =>
                  setSelectedVaccinationId(
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                className="form-input"
              >
                <option value="">Выберите вакцину</option>
                {allVaccinations.map((vac) => (
                  <option key={vac.id} value={vac.id}>
                    {vac.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="submit-button">
              Добавить вакцину
            </button>
          </form>
        </div>
        {/* */}
      </div>
    </div>
  );
};
