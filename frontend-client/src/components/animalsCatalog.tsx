import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Paginator from "./paginator";
import {
  AnimalsService,
  animalBreedService,
} from "../api/services/all.services";

type GetAllAnimalsFormType = {};

export const AnimalsCatalog: React.FC<GetAllAnimalsFormType> = () => {
  const { type } = useParams<{ type: string }>();

  const [animals, setAnimals] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalAnimals, setTotalAnimals] = useState(0);

  const [animalBreeds, setAnimalBreeds] = useState<any[]>([]);

  // Состояния для параметров поиска
  const [animalType, setAnimalType] = useState<string | undefined>(
    type || undefined
  );
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
          age: age ? Number(age) : undefined, // Преобразуем возраст в число
          animalBreedId: Number(animalBreedId)
            ? Number(animalBreedId)
            : undefined,
        }
      );
      setAnimals(response.data.animals.slice(0, 6)); // Ограничиваем до 6 животных
      setTotalAnimals(response.data.totalAnimals);
      setError(null);
    } catch (err: any) {
      setError("Ошибка при получении данных о животных: " + err.message);
      setAnimals([]);
    }
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    handleGetAll(page);
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
    setCurrentPage(1);
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
          {/* Тип */}
          <select
            value={animalType || ""}
            onChange={(e) => setAnimalType(e.target.value || undefined)}
            className="search-input"
          >
            <option value="">Тип животного</option>
            <option value="cat">Кот</option>
            <option value="dog">Собака</option>
          </select>
          {/* Здоровье - выпадающий список */}
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
          {/* Размер - выпадающий список */}
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
          {/* Цвет - выпадающий список */}
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
          {/* Возраст */}
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
          {/* Порода */}
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
      </div>

      {error && <div className="error-message">{error}</div>}
      <ul className="animals-list">
        {animals.map((animal) => (
          <Link
            to={`/animal/${animal.id}`}
            key={animal.id}
            className="animal-item"
          >
            <li
              className="animal-card"
              style={{
                backgroundImage: `url(${
                  animal?.animalImages?.[0]?.imageUrl || ""
                })`,
              }}
            >
              <div className="animal-info">
                <strong>Имя:</strong> {animal?.name.slice(0, 30)}
              </div>
            </li>
          </Link>
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
