import ReviewsList from "../components/review/reviewsList";
import { TakeAnimalNav } from "../components/main/takeAnimalNav";
import TelegramBlock from "../components/main/telegram";
import Accordion from "../components/accordion/Accordion";

export const Home = () => {
  return (
    <div>
      <img src="/public/mainPage.jpg" alt="Кот" className="home-image" />
      <TakeAnimalNav />
      <TelegramBlock />
      <Accordion />
      <ReviewsList />
    </div>
  );
};
