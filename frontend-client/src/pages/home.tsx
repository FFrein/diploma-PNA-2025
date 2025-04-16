import ReviewsList from "../components/review/reviewsList";
import { TakeAnimalNav } from "../components/main/takeAnimalNav";
import TelegramBlock from "../components/main/telegram";
import { Questions } from "../components/main/questions";

export const Home = () => {
  return (
    <div>
      <img src="/public/mainPage.jpg" alt="Кот" className="home-image" />
      <TakeAnimalNav />
      <TelegramBlock />
      <Questions />
      <ReviewsList />
    </div>
  );
};
