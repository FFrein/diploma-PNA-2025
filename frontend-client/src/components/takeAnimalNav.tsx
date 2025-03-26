import { Link } from "react-router-dom";

export const TakeAnimalNav = () => {
  return (
    <div className="takeAnimalNav">
      <nav>
        <Link to="/catalog?cats" className="animalButton">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4313/4313375.png"
            alt="img"
          />
          <p>Коты</p>
        </Link>
        <Link to="/catalog?cats" className="animalButton">
          <img
            src="https://png.pngtree.com/png-clipart/20230515/original/pngtree-dog-icon-transparent-background-free-png-image_9161863.png"
            alt="img"
          />
          <p>Собаки</p>
        </Link>
      </nav>
    </div>
  );
};
