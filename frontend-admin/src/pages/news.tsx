import { Route, Routes } from "react-router-dom";
import { HorizontalMenu } from "../compenents/HorizontalMenu";
import NewsList from "../compenents/news/NewsList";
import NewsEdit from "../compenents/news/NewsEdit";
import NewsCreate from "../compenents/news/NewsCreate";

export const News = () => {
  return (
    <>
      <HorizontalMenu baseUrl="/news" />
      <Routes>
        <Route path={"/create"} element={<NewsCreate />}></Route>
        <Route path={"/edit/:id"} element={<NewsEdit />}></Route>
        <Route path={"*"} element={<NewsList />}></Route>
      </Routes>
    </>
  );
};
