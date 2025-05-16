import { useContext, useEffect } from "react"; // Убираем useState, он больше не нужен
import "./App.sass";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/header/header";
import { Auth } from "./pages/auth";
import { Catalog } from "./pages/catalog/catalog";
import { Footer } from "./components/footer";
import { Home } from "./pages/home/home";
import { Animal } from "./pages/catalog/animal";
import { DonationPage } from "./pages/donation/donation";
import { Context } from "./store/context";
import { Profile } from "./pages/profile/profile";
import { observer } from "mobx-react-lite";
import { News } from "./pages/news/news";
import NewsDetail from "./pages/news/newsDetailds/NewsDetail";
import Volunteering from "./pages/volunteering/Volunteering";
import GiveAwayPet from "./pages/giveAwayPet/GiveAwayPet";
import { Tooltip } from "./components/tooltip/Tooltip";
import { TooltipProvider } from "./components/tooltip/TooltipContext";
import "swiper/css";

function App() {
  const { store } = useContext(Context);

  useEffect(() => {
    store.checkAuth();
  }, [store]);

  return (
    <Router>
      <TooltipProvider>
        <Header />
        <div className="wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:type" element={<Catalog />} />
            <Route path="/volunteering" element={<Volunteering />} />
            <Route path="/giveAwayPet" element={<GiveAwayPet />} />
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
        <Tooltip />
      </TooltipProvider>
    </Router>
  );
}

export default observer(App);
