import { Link } from "react-router-dom";
import { TooltipWrapper } from "../tooltip/TooltipWrapper";

export const TakeAnimalNav = () => {
  return (
    <div className="takeAnimalNav">
      <nav>
        <TooltipWrapper eventType={"Перейти"}>
          <Link to="/catalog/cat" className="animalButton">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4313/4313375.png"
              alt="img"
            />
            <p>Коты</p>
          </Link>
        </TooltipWrapper>
        <TooltipWrapper eventType={"Перейти"}>
          <Link to="/catalog/dog" className="animalButton">
            <img
              src="https://png.pngtree.com/png-clipart/20230515/original/pngtree-dog-icon-transparent-background-free-png-image_9161863.png"
              alt="img"
            />
            <p>Собаки</p>
          </Link>
        </TooltipWrapper>
      </nav>
    </div>
  );
};
