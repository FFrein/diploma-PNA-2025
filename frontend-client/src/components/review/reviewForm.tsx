import React, { useState, useEffect } from "react";
import { ReviewsService } from "../../api/services/all.services";
import "./ReviewForm.css";

interface ReviewFormProps {
  userId: number;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ userId }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0); // Для предварительного рейтинга при наведении
  const [description, setDescription] = useState<string>("");
  const [existingReview, setExistingReview] = useState<any>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Загрузка существующего отзыва
  const fetchReview = async () => {
    setIsLoading(true);
    try {
      const response = await ReviewsService.getByUserId(userId);
      const userReview = response.data;
      if (userReview) {
        setExistingReview(userReview);
        setRating(userReview.rating);
        setDescription(userReview.description);
      }
    } catch (err: any) {
      setError("Ошибка при загрузке отзыва: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReview();
  }, [userId]);

  // Обработка отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (rating < 1 || rating > 5) {
      setError("Рейтинг должен быть от 1 до 5");
      return;
    }

    const reviewData = { rating, description, user: userId };
    console.log(1);
    try {
      if (existingReview && isEditing) {
        await ReviewsService.update(existingReview.id, reviewData);
        setSuccess("Отзыв успешно обновлен!");
        setIsEditing(false);
      } else {
        console.log(2);
        await ReviewsService.create(reviewData);
        setSuccess("Отзыв успешно создан!");
      }
      await fetchReview();
    } catch (err: any) {
      setError("Ошибка при сохранении отзыва: " + err.message);
    }
  };

  // Переключение в режим редактирования
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Установка рейтинга при клике на звёздочку
  const handleStarClick = (starValue: number) => {
    if (isEditing || !existingReview) {
      setRating(starValue);
    }
  };

  // Установка предварительного рейтинга при наведении
  const handleStarHover = (starValue: number) => {
    if (isEditing || !existingReview) {
      setHoverRating(starValue);
    }
  };

  // Сброс предварительного рейтинга при уходе курсора
  const handleStarLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="review-form-container">
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <>
          {error && <div className="review-form-error">{error}</div>}

          {success && <div className="review-form-success">{success}</div>}
          {existingReview && !isEditing ? (
            <div className="review-form-existing">
              <div className="review-form-stars-form">
                <h3>Ваш отзыв</h3>
                <div className="review-form-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`review-form-star ${
                        star <= existingReview.rating ? "filled" : ""
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p>
                <strong>Описание:</strong> {existingReview.description}
              </p>
              <button className="review-form-edit-btn" onClick={handleEdit}>
                ✏️
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="review-form">
              <h3>
                {existingReview ? "Редактировать отзыв" : "Оставить отзыв"}
              </h3>
              <div className="review-form-group">
                <div className="review-form-stars-form">
                  <label>Рейтинг:</label>
                  <div className="review-form-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`review-form-star ${
                          star <= (hoverRating || rating) ? "filled" : ""
                        }`}
                        onClick={() => handleStarClick(star)}
                        onMouseEnter={() => handleStarHover(star)}
                        onMouseLeave={handleStarLeave}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="review-form-group">
                <label>Описание:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="review-form-input"
                  rows={4}
                  disabled={!isEditing && !!existingReview}
                />
              </div>
              <button type="submit" className="review-form-submit-btn">
                {existingReview ? "Сохранить изменения" : "Отправить отзыв"}
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};
