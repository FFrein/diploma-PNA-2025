import React from "react";
import { Link } from "react-router-dom";
import "./HorizontalMenu.css"; // Подключаем стили

export const HorizontalMenu: React.FC<{ baseUrl: string }> = ({ baseUrl }) => {
  return (
    <nav className="horizontal-menu">
      <ul className="menu-list">
        <li className="menu-item">
          <Link to={`${baseUrl}/`} className="menu-link">
            Каталог
          </Link>
        </li>
        <li className="menu-item">
          <Link to={`${baseUrl}/create`} className="menu-link">
            Создать
          </Link>
        </li>
      </ul>
    </nav>
  );
};
