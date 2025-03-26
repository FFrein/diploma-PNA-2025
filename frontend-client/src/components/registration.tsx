import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/context";
import "./Registration.css";

export const Registration = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phonenumber: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null); // Добавляем состояние для ошибки
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const handlerSightIn = async (e: React.FormEvent) => {
    e.preventDefault();

    // Проверка формата email
    if (!form.email.endsWith("@mail.ru")) {
      setError("Email должен быть в формате name@mail.ru");
      return;
    }

    try {
      setError(null); // Сбрасываем ошибку перед запросом
      await store.registration(
        form.username,
        form.email,
        form.password,
        form.phonenumber
      );

      if (store.isAuth) {
        navigate("/gallery");
      } else {
        alert("Ошибка авторизации");
      }
    } catch (error) {
      console.error(error);
      alert("Ошибка авторизации");
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-card">
        <h2 className="registration-title">Регистрация</h2>
        <form onSubmit={handlerSightIn} className="registration-form">
          <input
            placeholder="Имя пользователя"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="registration-input"
          />
          <input
            placeholder="Email (name@mail.ru)"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="registration-input"
          />
          <input
            placeholder="Номер телефона"
            type="tel"
            value={form.phonenumber}
            onChange={(e) => setForm({ ...form, phonenumber: e.target.value })}
            className="registration-input"
          />
          <input
            placeholder="Пароль"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="registration-input"
          />
          {error && <p className="registration-error">{error}</p>}{" "}
          {/* Отображение ошибки */}
          <button type="submit" className="registration-button">
            Зарегистрироваться
          </button>
          <Link to="/auth/login" className="registration-link">
            Уже есть аккаунт? Войти
          </Link>
        </form>
      </div>
    </div>
  );
};
