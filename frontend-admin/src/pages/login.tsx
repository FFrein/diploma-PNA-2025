import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/context";
import "./Login.css"; // Подключаем файл стилей

export const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const handlerSightIn = async (e: any) => {
    e.preventDefault();

    try {
      await store.login(form.email, form.password);

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
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Вход</h2>
        <form onSubmit={handlerSightIn} className="login-form">
          <div className="form-group">
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Пароль"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="form-input"
              type="password"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
