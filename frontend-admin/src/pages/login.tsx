import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/context";

export const Login = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phonenumber: "",
    password: "",
  });
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const handlerSightIn = async (e: any) => {
    e.preventDefault();

    try {
      await store.registration(
        form.username,
        form.email,
        form.password,
        form.phonenumber
      );

      if (store.isAuth) {
        navigate("/gallery");
      } else {
        alert("Ошибка авторищзации");
      }
    } catch (error) {
      console.error(error);
      alert("Ошибка авторищзации");
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handlerSightIn} className="">
          <input
            placeholder="email"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
            }}
          />
          <input
            placeholder="password"
            value={form.password}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
            }}
          />
          <button type="submit" className="">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};
