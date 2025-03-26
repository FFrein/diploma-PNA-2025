import React, { useState, useEffect } from "react";
import "./NewsList.css";
import { Link } from "react-router-dom";
import { NewsService } from "../../api/services/all.services";
import Paginator from "../paginator";

export const NewsList: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [totalNews, setTotalNews] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(6); // 6 новостей на странице (2 строки по 3)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Загрузка новостей с пагинацией
  const fetchNews = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await NewsService.search(page, pageSize);
      setNews(response.data.news || response.data);
      setTotalNews(response.data.totalNews || response.data.length);
      setError(null);
    } catch (err: any) {
      setError("Ошибка при загрузке новостей: " + err.message);
      setNews([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage]);

  // Обработка смены страницы
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Удаление новости
  const handleDelete = async (id: number) => {
    if (window.confirm("Вы уверены, что хотите удалить эту новость?")) {
      setIsLoading(true);
      try {
        await NewsService.delete(id);
        await fetchNews(currentPage); // Обновляем список после удаления
      } catch (err: any) {
        setError("Ошибка при удалении новости: " + err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Разделение новостей на две строки по 3
  const firstRow = news.slice(0, 3);
  const secondRow = news.slice(3, 6);

  return (
    <div className="news-list-container">
      <h2>Новости</h2>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : error ? (
        <div className="news-list-error">{error}</div>
      ) : news.length > 0 ? (
        <>
          {/* Первая строка */}
          <div className="news-row">
            {firstRow.map((item) => (
              <div key={item.id} className="news-item-wrapper">
                <Link to={`/news/${item.id}`} className="news-item">
                  {item.iamge && (
                    <img
                      src={item.iamge}
                      alt={item.title}
                      className="news-image"
                    />
                  )}
                  <h3 className="news-title">{item.title}</h3>
                  <p className="news-description">{item.description}</p>
                </Link>
                <Link
                  to={`/news/edit/${item.id}`}
                  className="news-edit-btn"
                  title="Редактировать"
                >
                  ✏️
                </Link>
                <button
                  className="news-delete-btn"
                  onClick={() => handleDelete(item.id)}
                  title="Удалить"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>

          {/* Вторая строка */}
          <div className="news-row">
            {secondRow.map((item) => (
              <div key={item.id} className="news-item-wrapper">
                <Link to={`/news/${item.id}`} className="news-item">
                  {item.iamge && (
                    <img
                      src={item.iamge}
                      alt={item.title}
                      className="news-image"
                    />
                  )}
                  <h3 className="news-title">{item.title}</h3>
                  <p className="news-description">{item.description}</p>
                </Link>
                <Link
                  to={`/news/edit/${item.id}`}
                  className="news-edit-btn"
                  title="Редактировать"
                >
                  ✏️
                </Link>
                <button
                  className="news-delete-btn"
                  onClick={() => handleDelete(item.id)}
                  title="Удалить"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>

          {/* Пагинация */}
          <Paginator
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalAnimals={totalNews}
            pageSize={pageSize}
          />
        </>
      ) : (
        <p>Новостей пока нет.</p>
      )}
    </div>
  );
};

export default NewsList;
