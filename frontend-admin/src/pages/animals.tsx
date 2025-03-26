import { Route, Routes } from "react-router-dom";
import { HorizontalMenu } from "../compenents/HorizontalMenu";
import { AnimalCreate } from "../compenents/animal/create";
import { AnimalEdit } from "../compenents/animal/edit";
import { AnimalsCatalog } from "../compenents/animal/animalsCatalog";

export const Animals = () => {
  return (
    <>
      <HorizontalMenu baseUrl="/animals" />
      <Routes>
        <Route path={"/create"} element={<AnimalCreate />}></Route>
        <Route path={"/edit/:id"} element={<AnimalEdit />}></Route>
        <Route path={"*"} element={<AnimalsCatalog />}></Route>
      </Routes>
    </>
  );
};
