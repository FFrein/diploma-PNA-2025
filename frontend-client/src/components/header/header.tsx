import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../../store/context";
import "./header.sass";

export const Header = observer(() => {
  const { store } = useContext(Context);

  return (
    <div className="header">
      <nav className="header-nav">
        <img
          src="https://i.pinimg.com/736x/2d/7a/56/2d7a56f7894f5c7546f6094c81d46b43.jpg"
          alt="logo"
        />
        <div className="header-nav-center">
          <Link to="/" className="linkBtn">
            Главная
          </Link>
          <Link to="/catalog" className="linkBtn">
            Найти питомца
          </Link>
          <Link to="/donate" className="linkBtn">
            Отдать питомца
          </Link>
          <Link to="/news" className="linkBtn">
            Новости
          </Link>
          <Link to="/donate" className="linkBtn">
            Волонтёрство
          </Link>
          <Link to="/donate" className="linkBtn">
            Пожертвования
          </Link>
        </div>

        {store.isAuth ? (
          <Link to="profile" className="linkBtn authBtn">
            Профиль
          </Link>
        ) : (
          <Link to="/auth" className="linkBtn authBtn">
            Войти
          </Link>
        )}
      </nav>
    </div>
  );
});
