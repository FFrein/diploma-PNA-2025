import NewsList from "../../components/news/NewsList";
import "./news.css";

export const News = () => {
  return (
    <div className="news">
      <NewsList />
      <img
        src="/public/koshka.png"
        alt="animals-bg"
        className="news-animals-bg"
      />
    </div>
  );
};
