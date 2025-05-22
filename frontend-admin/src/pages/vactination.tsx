import { Route, Routes } from "react-router-dom";
import VaccinationCreate from "../compenents/vaccination/createForm";
import VaccinationDelete from "../compenents/vaccination/deleteForm";
import { HorizontalMenuType2 } from "../compenents/HorizontalMenu";

export const Vactination = () => {
  return (
    <>
      <HorizontalMenuType2
        baseUrl="/vactination"
        links={[
          {
            name: "Создать",
            url: "",
          },
          {
            name: "Удалить",
            url: "delete",
          },
        ]}
      />
      <Routes>
        <Route path={"/create"} element={<VaccinationCreate />}></Route>
        <Route path={"/delete"} element={<VaccinationDelete />}></Route>
        <Route path={"*"} element={<VaccinationCreate />}></Route>
      </Routes>
    </>
  );
};
