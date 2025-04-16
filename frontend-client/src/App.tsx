import { useContext, useEffect } from "react"; // Убираем useState, он больше не нужен
import "./App.sass";
import { About } from "./pages/about";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { Auth } from "./pages/auth";
import { Catalog } from "./pages/catalog";
import { Questions } from "./components/main/questions";
import { Footer } from "./components/footer";
import { Home } from "./pages/home";
import { Animal } from "./pages/animal";
import { DonationPage } from "./pages/donation";
import { Context } from "./store/context";
import { Profile } from "./pages/profile";
import { observer } from "mobx-react-lite";
import { News } from "./pages/news";
import NewsDetail from "./pages/NewsDetail";

function App() {
  const { store } = useContext(Context);

  useEffect(() => {
    store.checkAuth();
  }, [store]);

  return (
    <Router>
      <Header />
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:type" element={<Catalog />} />
          <Route path="/about" element={<About />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/animal/:id" element={<Animal />} />
          <Route path="/donate" element={<DonationPage />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          {!store.isAuth ? (
            <Route path="/auth/*" element={<Auth />} />
          ) : (
            <Route path="/profile" element={<Profile />} />
          )}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default observer(App);
