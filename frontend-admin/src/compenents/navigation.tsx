import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavigationMenu.css";
import { Context } from "../store/context";

export const NavigationMenu: React.FC = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
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

  return (
    <nav className="navigation-menu">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/statistic" className="nav-link">
            Статистика
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/animals" className="nav-link">
            Животные
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/news" className="nav-link">
            Новости
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/rewievs" className="nav-link">
            Отзывы
          </Link>
        </li>
        <li onClick={handleLogout} className="logout-button">
          Выйти
        </li>
      </ul>
    </nav>
  );
};
