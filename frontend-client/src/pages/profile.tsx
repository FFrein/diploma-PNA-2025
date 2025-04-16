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
  const [activeField, setActiveField] = useState<string | null>(null); // Отслеживаем активное поле
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
        password: "",
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
      await store.logout();
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Ошибка при выходе");
    }
  };

  // Обновление профиля
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeField) return; // Ничего не сохраняем, если поле не выбрано

    try {
      const updatedData: any = {};
      if (activeField === "FIO" && form.FIO !== user.FIO)
        updatedData.FIO = form.FIO;
      if (activeField === "phone" && form.phone !== user.phone)
        updatedData.phone = form.phone;
      if (activeField === "password" && form.password)
        updatedData.password = form.password;

      if (Object.keys(updatedData).length > 0) {
        await AuthService.updateProfile(updatedData);
        await handleProfile(); // Обновляем данные после сохранения
        setSuccess(`Поле ${activeField} успешно обновлено`);
        setError(null);
        setActiveField(null); // Сбрасываем активное поле после сохранения
      } else {
        setSuccess("Изменений не было");
        setActiveField(null);
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
                onChange={(e) =>
                  activeField === "FIO" &&
                  setForm({ ...form, FIO: e.target.value })
                }
                placeholder="Введите ФИО"
                disabled={activeField !== "FIO" && activeField !== null}
              />
              <button
                type="button"
                className="edit-button"
                onClick={() => setActiveField("FIO")}
                disabled={activeField === "FIO" || activeField !== null}
              >
                ✏️
              </button>
            </div>
            <div className="form-group">
              <label>Номер телефона:</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  activeField === "phone" &&
                  setForm({
                    ...form,
                    phone: Number(e.target.value) ? e.target.value : "",
                  })
                }
                placeholder="Введите номер телефона"
                disabled={activeField !== "phone" && activeField !== null}
              />
              <button
                type="button"
                className="edit-button"
                onClick={() => setActiveField("phone")}
                disabled={activeField === "phone" || activeField !== null}
              >
                ✏️
              </button>
            </div>
            <div className="form-group">
              <label>Новый пароль:</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) =>
                  activeField === "password" &&
                  setForm({ ...form, password: e.target.value })
                }
                placeholder="Введите новый пароль"
                disabled={activeField !== "password" && activeField !== null}
              />
              <button
                type="button"
                className="edit-button"
                onClick={() => setActiveField("password")}
                disabled={activeField === "password" || activeField !== null}
              >
                ✏️
              </button>
            </div>
            {activeField && (
              <button type="submit" className="save-button">
                Сохранить
              </button>
            )}
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

export default Profile;
