import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../store/context";
import "./Registration.sass";

export const Registration = () => {
  const [form, setForm] = useState({
    email: "",
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
      await store.registration(form.email, form.password);

      if (store.isAuth) {
        navigate("/gallery");
      } else {
        navigate("/auth");
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
            placeholder="Email (name@mail.ru)"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value.trim().slice(0, 50) })
            }
            className="registration-input"
          />
          <input
            placeholder="Пароль"
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value.trim().slice(0, 50) })
            }
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
