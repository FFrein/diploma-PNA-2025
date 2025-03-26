import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NewsService } from "../api/services/all.services";
import "./NewsDetail.css";

export const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Получаем ID из URL
  const [news, setNews] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Загрузка новости по ID
  const fetchNews = async (newsId: string) => {
    setIsLoading(true);
    try {
      const response = await NewsService.getById(+newsId);
      setNews(response.data);
      setError(null);
    } catch (err: any) {
      setError("Ошибка при загрузке новости: " + err.message);
      setNews(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchNews(id);
    }
  }, [id]);

  return (
    <div className="news-detail-container">
      {isLoading ? (
        <p>Загрузка...</p>
      ) : error ? (
        <div className="news-detail-error">{error}</div>
      ) : news ? (
        <>
          <h1 className="news-detail-title">{news.title}</h1>
          {news.iamge && (
            <img
              src={news.iamge}
              alt={news.title}
              className="news-detail-image"
            />
          )}
          <p className="news-detail-description">{news.description}</p>
        </>
      ) : (
        <p>Новость не найдена.</p>
      )}
    </div>
  );
};

export default NewsDetail;
