import ReviewsList from "../../components/review/reviewsList";
import { TakeAnimalNav } from "../../components/main/takeAnimalNav";
import TelegramBlock from "../../components/main/telegram";
import Accordion from "../../components/accordion/Accordion";
import { TooltipWrapper } from "../../components/tooltip/TooltipWrapper";
import styles from "./home.module.sass";
import AnimalsStats from "../../components/animalsStats/animalsStats";

export const Home = () => {
  return (
    <div className={styles.home_wrapper}>
      <div className={styles.animalsStats}>
        <AnimalsStats />
      </div>
      <img src="/mainPage.jpg" alt="Кот" className="home-image" />
      <TakeAnimalNav />

      <TooltipWrapper eventType={"Перейти"}>
        <TelegramBlock />
      </TooltipWrapper>

      <Accordion />
      <ReviewsList />
    </div>
  );
};
