import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../../store/context";
import "./header.sass";

export const Header = observer(() => {
  const { store } = useContext(Context);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="header">
      <nav className="header-nav">
        <img
          src="https://i.pinimg.com/736x/2d/7a/56/2d7a56f7894f5c7546f6094c81d46b43.jpg"
          alt="logo"
        />
        <button className="burger" onClick={toggleMenu}>
          ☰
        </button>

        <div className={`header-nav-center ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="linkBtn" onClick={() => setMenuOpen(false)}>
            Главная
          </Link>
          <Link
            to="/catalog"
            className="linkBtn"
            onClick={() => setMenuOpen(false)}
          >
            Найти питомца
          </Link>
          <Link
            to="/giveAwayPet"
            className="linkBtn"
            onClick={() => setMenuOpen(false)}
          >
            Отдать животное
          </Link>
          <Link
            to="/news"
            className="linkBtn"
            onClick={() => setMenuOpen(false)}
          >
            Новости
          </Link>
          {/*
              <Link
                to="/volunteering"
                className="linkBtn"
                onClick={() => setMenuOpen(false)}
              >
                Волонтёрство
              </Link>
          */}
          <Link
            to="/donate"
            className="linkBtn"
            onClick={() => setMenuOpen(false)}
          >
            Пожертвования
          </Link>
        </div>
        {store.isAuth ? (
          <Link
            to="profile"
            className="linkBtn authBtn"
            onClick={() => setMenuOpen(false)}
          >
            Профиль
          </Link>
        ) : (
          <Link
            to="/auth"
            className="linkBtn authBtn"
            onClick={() => setMenuOpen(false)}
          >
            Войти
          </Link>
        )}
      </nav>
    </div>
  );
});
