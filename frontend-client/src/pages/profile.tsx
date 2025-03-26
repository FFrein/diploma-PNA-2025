import { useContext, useEffect, useState } from "react";
import { Context } from "../store/context";
import { useNavigate } from "react-router-dom";
import AuthService from "../api/services/auth.service";
import "./Profile.css";
import { ReviewForm } from "../components/reviewForm";

export const Profile = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({
    FIO: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Загрузка данных профиля
  const handleProfile = async () => {
    try {
      const response = await AuthService.getProfile();
      const userData = response.data;
      setUser(userData);
      setForm({
        FIO: userData.FIO || "",
        phone: userData.phone || "",
        password: "", // Пароль оставляем пустым для редактирования
      });
      setError(null);
    } catch (err: any) {
      setError("Ошибка при получении данных: " + err.message);
    }
  };

  // Выход из системы
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await store.logout(); // Предполагается, что есть метод logout в store
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Ошибка при выходе");
    }
  };

  // Обновление профиля
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedData: any = {};
      if (form.FIO && form.FIO !== user.FIO) updatedData.FIO = form.FIO;
      if (form.phone && form.phone !== user.phone)
        updatedData.phone = form.phone;
      if (form.password) updatedData.password = form.password; // Отправляем пароль только если он заполнен

      if (Object.keys(updatedData).length > 0) {
        await AuthService.updateProfile(updatedData); // Предполагаемый метод для обновления
        await handleProfile(); // Перезагружаем данные после обновления
        setSuccess("Профиль успешно обновлен");
        setError(null);
      }
    } catch (err: any) {
      setError("Ошибка при сохранении: " + err.message);
      setSuccess(null);
    }
  };

  useEffect(() => {
    handleProfile();
  }, []);

  return (
    <div className="profile-page">
      <h2>Профиль</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      {user ? (
        <div>
          <form onSubmit={handleSave} className="profile-form">
            <div className="form-group">
              <label>Email:</label>
              <input type="email" value={user.email} disabled />
            </div>
            <div className="form-group">
              <label>ФИО:</label>
              <input
                type="text"
                value={form.FIO}
                onChange={(e) => setForm({ ...form, FIO: e.target.value })}
                placeholder="Введите ФИО"
              />
            </div>
            <div className="form-group">
              <label>Номер телефона:</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Введите номер телефона"
              />
            </div>
            <div className="form-group">
              <label>Новый пароль:</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Введите новый пароль (если хотите изменить)"
              />
            </div>
            <button type="submit" className="save-button">
              Сохранить
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="logout-button"
            >
              Выйти
            </button>
          </form>
          <ReviewForm userId={user.id} />
        </div>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
};
