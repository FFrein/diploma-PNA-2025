import React, { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AnimalsService } from "../../api/services/all.services";
import "./Animal.sass";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

export const Animal: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [animal, setAnimal] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnimal = useCallback(async () => {
    if (id) {
      setIsLoading(true);
      try {
        const { data } = await AnimalsService.getById(Number(id));
        setAnimal(data);
        setError(null);
      } catch (error: any) {
        console.error("Ошибка при загрузке животного:", error);
        setError("Не удалось загрузить информацию о животном.");
        setAnimal(null);
      } finally {
        setIsLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchAnimal();
  }, [fetchAnimal]);

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      {isLoading ? (
        "Loading"
      ) : (
        <div className="animal-page-container">
          {isLoading ? (
            <div className="animal-page-loader">
              <svg
                className="animal-page-animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            </div>
          ) : error ? (
            <div className="animal-page-error">{error}</div>
          ) : animal ? (
            <div className="animal-page-card">
              <h1 className="animal-page-name">{animal.name}</h1>
              <div className="animal-page-details">
                <div className="animal-page-left-column">
                  <div className="animal-page-image-slider">
                    <Swiper
                      loop={true}
                      slidesPerView={1}
                      modules={[Navigation]}
                      navigation
                      onSlideChange={(swiper) =>
                        setCurrentIndex(swiper.activeIndex)
                      }
                      className="animal-page-swiper"
                    >
                      {animal.animalImages.map((img: any, index: any) => (
                        <SwiperSlide key={index}>
                          <img
                            src={img.imageUrl}
                            alt={`Image ${index + 1}`}
                            className="animal-page-image"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <div className="animal-page-image-counter">
                      {currentIndex + 1} / {animal.animalImages.length}
                    </div>
                  </div>
                  <div className="animal-page-description">
                    <h3 className="animal-page-section-title">Описание</h3>
                    <p>{animal.description}</p>
                  </div>
                </div>
                <div className="animal-page-right-column">
                  <div className="animal-page-info">
                    <h2 className="animal-page-section-title">
                      Основные данные
                    </h2>
                    <div className="animal-page-info-list">
                      <p>
                        <strong>Тип:</strong> {animal.animalType}
                      </p>
                      <p>
                        <strong>Возраст:</strong> {animal.age} лет
                      </p>
                      <p>
                        <strong>Здоровье:</strong> {animal.health}
                      </p>
                      <p>
                        <strong>Размер:</strong> {animal.size}
                      </p>
                      <p>
                        <strong>Цвет:</strong> {animal.color}
                      </p>
                      <p>
                        <strong>Еда:</strong> {animal.foodPerDay} г/день
                      </p>
                      <p>
                        <strong>Туалетного наполнителя:</strong>{" "}
                        {animal.toiletPerDay} мл/день
                      </p>
                      <p>
                        <strong>Стерилизован:</strong>{" "}
                        {animal.sterilized ? "Да" : "Нет"}
                      </p>
                      <p>
                        <strong>Порода:</strong> {animal.animalBreed.name}
                      </p>
                    </div>
                  </div>
                  <div className="animal-page-vaccinations">
                    <h3 className="animal-page-section-title">Прививки</h3>
                    {animal.vaccinations && animal.vaccinations.length > 0 ? (
                      <ul className="animal-page-vaccination-list">
                        {animal.vaccinations.map((vac: any) => (
                          <li key={vac.vaccination.id}>
                            {vac.vaccination.name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Прививки отсутствуют</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="animal-page-no-animal">Животное не найдено.</div>
          )}
        </div>
      )}
    </>
  );
};
