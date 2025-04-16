import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../store/context";
import "./Authorization.sass";

export const Authorization = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      await store.login(form.email, form.password); // Предполагается, что в store есть метод login

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
    <div className="authorization-page">
      <div className="authorization-card">
        <h2 className="authorization-title">Вход</h2>
        <form onSubmit={handleSignIn} className="authorization-form">
          <input
            placeholder="Email (@mail.ru)"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="authorization-input"
          />
          <input
            placeholder="Пароль"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="authorization-input"
          />
          <button type="submit" className="authorization-button">
            Войти
          </button>
          <Link to="/auth/registration" className="authorization-link">
            Нет аккаунта? Зарегистрироваться
          </Link>
          <Link to="/auth/forgot-password" className="authorization-link">
            Забыли пароль?
          </Link>
        </form>
      </div>
    </div>
  );
};
