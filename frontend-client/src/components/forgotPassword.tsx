import { useState } from "react";
import AuthService from "../api/services/auth.service";
import "./forgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await AuthService.forgotPassword(email);
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Ошибка при отправке письма. Попробуйте снова.");
      console.error(error);
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-card">
        <h2 className="forgot-password-title">Восстановление пароля</h2>
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <input
            type="email"
            placeholder="Введите ваш email (@mail.ru)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="forgot-password-input"
            required
          />
          <button type="submit" className="forgot-password-button">
            Отправить ссылку
          </button>
        </form>
        {message && <p className="forgot-password-message">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
