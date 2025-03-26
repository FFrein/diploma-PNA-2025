import ReviewsList from "../components/reviewsList";
import { TakeAnimalNav } from "../components/takeAnimalNav";
import TelegramBlock from "../components/telegram";

export const Home = () => {
  return (
    <div>
      <img src="/public/mainPage.jpg" alt="Кот" className="home-image" />
      <TakeAnimalNav />
      <TelegramBlock />
      <ReviewsList />
    </div>
  );
};
