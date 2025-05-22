import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Paginator from "../paginator";
import "./animalsCatalog.css";
import { AnimalsService } from "../../api/services/animal.service";
import { animalBreedService } from "../../api/services/animalBreed.service";

type GetAllAnimalsFormType = {};

export const AnimalsCatalog: React.FC<GetAllAnimalsFormType> = () => {
  const [animals, setAnimals] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalAnimals, setTotalAnimals] = useState(0);
  const [animalBreeds, setAnimalBreeds] = useState<any[]>([]);

  // Состояния для параметров поиска
  const [animalType, setAnimalType] = useState<string | undefined>(undefined);
  const [health, setHealth] = useState<string | undefined>(undefined);
  const [size, setSize] = useState<string | undefined>(undefined);
  const [color, setColor] = useState<string | undefined>(undefined);
  const [age, setAge] = useState<number | undefined>(undefined);
  const [animalBreedId, setAnimalBreedId] = useState<number | undefined>(
    undefined
  );

  const pageSize = 6;

  const handleGetAll = async (page?: number) => {
    try {
      const response = await AnimalsService.search(
        page ? page : currentPage,
        pageSize,
        {
          animalType,
          health,
          size,
          color,
          age: age ? Number(age) : undefined,
          animalBreedId: Number(animalBreedId)
            ? Number(animalBreedId)
            : undefined,
        }
      );
      setAnimals(response.data.animals.slice(0, 6));
      setTotalAnimals(response.data.totalAnimals);
      setError(null);
    } catch (err: any) {
      setError("Ошибка при получении данных о животных: " + err.message);
      setAnimals([]);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await AnimalsService.delete(id);
      setAnimals(animals.filter((animal) => animal.id !== id)); // Удаляем из состояния
      setTotalAnimals(totalAnimals - 1); // Уменьшаем общее количество
      handleGetAll();
      setError(null);
    } catch (err: any) {
      setError("Ошибка при удалении животного: " + err.message);
    }
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    handleGetAll(page);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    handleGetAll(1);
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
    handleGetAll();
  }, [animalBreedId, age, size, color, health, animalType]);

  useEffect(() => {
    handleGetAll();
    handleGetAnimalBreeds();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  return (
    <div className="animals-catalog-container">
      {/* Search Bar */}
      <div className="search-bar-container">
        <div className="search-inputs">
          <select
            value={animalType || ""}
            onChange={(e) => setAnimalType(e.target.value || undefined)}
            className="search-input"
          >
            <option value="">Тип животного</option>
            <option value="cat">Кот</option>
            <option value="dog">Собака</option>
          </select>
          <select
            value={health || ""}
            onChange={(e) => setHealth(e.target.value || undefined)}
            className="search-input"
          >
            <option value="">Выберите здоровье</option>
            <option value="healthy">Здоров</option>
            <option value="temporaryIllness">Временное заболевание</option>
            <option value="chronic">Хроническое заболевание</option>
          </select>
          <select
            value={size || ""}
            onChange={(e) => setSize(e.target.value || undefined)}
            className="search-input"
          >
            <option value="">Выберите размер</option>
            <option value="small">Маленький</option>
            <option value="medium">Средний</option>
            <option value="large">Большой</option>
          </select>
          <select
            value={color || ""}
            onChange={(e) => setColor(e.target.value || undefined)}
            className="search-input"
          >
            <option value="">Выберите цвет</option>
            <option value="black">Чёрный</option>
            <option value="white">Белый</option>
            <option value="brown">Коричневый</option>
            <option value="grey">Серый</option>
            <option value="red">Рыжий</option>
          </select>
          <input
            type="number"
            placeholder="Возраст"
            value={age || ""}
            onChange={(e) =>
              setAge(
                e.target.value
                  ? Number(e.target.value) > 0
                    ? Number(e.target.value)
                    : 0
                  : undefined
              )
            }
            className="search-input"
          />
          <select
            value={animalBreedId || ""}
            onChange={(e) =>
              setAnimalBreedId(
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            className="search-input"
          >
            <option value="">Выберите породу</option>
            {animalBreeds.map((breed) => (
              <option key={breed.id} value={breed.id}>
                {breed.name}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleSearch} className="search-button">
          Поиск
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      <ul className="animals-list">
        {animals.map((animal) => (
          <li key={animal.id} className="animal-card">
            <div
              className="animal-card-background"
              style={{
                backgroundImage: `url(${
                  animal?.animalImages?.[0]?.imageUrl || ""
                })`,
              }}
            >
              <div className="animal-info">
                <strong>ID:</strong> {animal?.id} <br />
                <strong>Имя:</strong> {animal?.name.slice(0, 30)}
              </div>
            </div>
            <Link to={`/animals/edit/${animal.id}`} className="edit-icon">
              ✏️
            </Link>
            <button
              onClick={() => handleDelete(animal.id)}
              className="delete-icon"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
      <Paginator
        currentPage={currentPage}
        onPageChange={handleChangePage}
        totalAnimals={totalAnimals}
        pageSize={pageSize}
      />
    </div>
  );
};
