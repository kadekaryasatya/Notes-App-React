import React, { useEffect, useMemo, useState } from "react";
import LocaleContext from "./contexts/LocaleContext";
import AuthContext from "./contexts/AuthContext";
import { getUserLogged } from "./utils/api";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import ArchivePage from "./pages/ArchivePage";
import NotFound from "./pages/NotFound";
import NotesDetailPage from "./pages/NotesDetailPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function NotesApp1() {
  const [auth, setAuth] = useState(null);
  const [locale, setLocale] = useState("id");

  const toggleLocale = () => {
    localStorage.setItem("locale", locale === "id" ? "en" : "id");
    setLocale((prevLocale) => (prevLocale === "id" ? "en" : "id"));
  };

  const localeContextValue = useMemo(
    () => ({
      locale,
      toggleLocale,
    }),
    [locale]
  );

  const authContextValue = useMemo(
    () => ({
      auth,
      setAuth,
    }),
    [auth]
  );

  useEffect(() => {
    /**
     * Get User Logged
     */
    getUserLogged()
      .then((res) => {
        if (!res.error) {
          setAuth(res.data);
        } else {
          setAuth(null);
        }
        setLoading(false);
      })
      .catch(() => {
        alert("Error");
      });

    /**
     * Inisialisasi Locale
     */
    if (localStorage.locale && ["id", "en"].includes(localStorage.locale)) {
      setLocale(localStorage.locale);
    }
  }, []);

  if (auth === null) {
    return (
      <LocaleProvider value={localeContextValue}>
        <AuthContext.Provider value={authContextValue}></AuthContext.Provider>
        <div className="note-app">
          <Header />
          <main className="userPage">
            <Routes>
              <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </LocaleProvider>
    );
  }
}
