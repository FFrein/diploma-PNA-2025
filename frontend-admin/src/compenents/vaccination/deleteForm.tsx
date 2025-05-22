import React, { useEffect, useState } from "react";
import "./styles.css";
import { VaccinationService } from "../../api/services/vactination.service";

export const VaccinationDelete: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [allVaccinations, setAllVaccinations] = useState([]);

  const handleGetVaccinations = async () => {
    try {
      const resp = await VaccinationService.getAll();
      setAllVaccinations(resp.data);
    } catch (err: any) {
      setError("Ошибка при получении списка вакцин: " + err.message);
      setAllVaccinations([]);
    }
  };

  // Обработка отправки формы
  const handleDelete = async (id: number) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await VaccinationService.delete(id);
      setSuccess("Прививка успешно удалена!");
    } catch (err: any) {
      setError("Ошибка при удалении прививки: " + err.message);
    } finally {
      setIsLoading(false);
    }
    handleGetVaccinations();
  };

  useEffect(() => {
    handleGetVaccinations();
  }, []);

  return (
    <div className="news-form-container">
      <ul>
        {allVaccinations.length > 0 &&
          allVaccinations.map((elem: any) => {
            return (
              <li key={elem.id} className="vactination-li">
                {elem.name}
                <button
                  onClick={() => {
                    handleDelete(elem.id);
                  }}
                >
                  x
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default VaccinationDelete;
