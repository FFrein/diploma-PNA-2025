import { AnimalsCatalog } from "../components/animalsCatalog";
import "./catalog.css";

export const Catalog = () => {
  return (
    <div className="catalog-animals container">
      <AnimalsCatalog />
      <img
        src="/public/dogs_6.png"
        alt="animals-bg"
        className="catalog-animals-bg"
      />
    </div>
  );
};
