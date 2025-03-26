import React from "react";
import { Link } from "react-router-dom";
import "./NavigationMenu.css";

export const NavigationMenu: React.FC = () => {
  return (
    <nav className="navigation-menu">
      <ul className="nav-list">
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
      </ul>
    </nav>
  );
};
