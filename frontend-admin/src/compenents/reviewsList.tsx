import React, { useState, useEffect } from "react";
import { ReviewsService } from "../api/services/all.services";
import Paginator from "./paginator.tsx";
import "./ReviewsList.css";

export const ReviewsList: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(2); // Количество отзывов на странице
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Загрузка отзывов с пагинацией
  const fetchReviews = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await ReviewsService.search(page, pageSize);
      setReviews(response.data.reviews || response.data);
      setTotalReviews(response.data.totalReviews || response.data.length);
      setError(null);
    } catch (err: any) {
      setError("Ошибка при загрузке отзывов: " + err.message);
      setReviews([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(currentPage);
  }, [currentPage]);

  // Обработка смены страницы
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Удаление отзыва
  const handleDelete = async (reviewId: number) => {
    if (window.confirm("Вы уверены, что хотите удалить этот отзыв?")) {
      try {
        setIsLoading(true);
        await ReviewsService.delete(reviewId);
        await fetchReviews(currentPage); // Обновляем список после удаления
      } catch (err: any) {
        setError("Ошибка при удалении отзыва: " + err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="reviews-list-container">
      <h2>Отзывы пользователей</h2>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : error ? (
        <div className="reviews-list-error">{error}</div>
      ) : reviews.length > 0 ? (
        <>
          <ul className="reviews-list">
            {reviews.map((review) => (
              <li key={review.id} className="review-item">
                <div className="review-header">
                  <span className="review-user">
                    {review.user?.FIO || "Аноним"}
                  </span>
                  <div className="review-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`review-star ${
                          star <= review.rating ? "filled" : ""
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="review-description">{review.description}</p>
                <button
                  className="review-delete-btn"
                  onClick={() => handleDelete(review.id)}
                  title="Удалить отзыв"
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
          <Paginator
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalAnimals={totalReviews}
            pageSize={pageSize}
          />
        </>
      ) : (
        <p>Отзывов пока нет.</p>
      )}
    </div>
  );
};

export default ReviewsList;
