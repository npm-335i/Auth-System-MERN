import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar({ setAuthMode, isAuthenticated, onLogout }) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(true);

    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const nav = document.querySelector(".nav");
      if (nav && !nav.contains(event.target) && open) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open]);

  const handleLoginClick = (e) => {
    e.preventDefault();
    setOpen(false);
    setAuthMode("login");
    navigate("/auth");
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    setOpen(false);
    setAuthMode("signup");
    navigate("/auth");
  };

  const handleLogoutClick = async (e) => {
    e.preventDefault();
    setOpen(false);
    if (onLogout) {
      await onLogout();
    }
    navigate("/auth");
  };

  const handleDashboardClick = (e) => {
    e.preventDefault();
    setOpen(false);
    navigate("/dashboard");
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    setOpen(false);
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const navItems = [
    { label: "Dashboard", href: "/dashboard", show: isAuthenticated },
    { label: "Features", href: "#features" },
    { label: "Faqs", href: "#Faqs" },
    { label: "Pricing", href: "#Pricing" },
    { label: "Home", href: "#Home" },
  ];

  return (
    <header
      className={`nav-shell ${loaded ? "loaded" : ""} ${
        scrolled ? "scrolled" : ""
      }`}
    >
      <nav className="nav">
        <div className="brand" onClick={handleHomeClick}>
          <span className="brand-dot" />
          NexAuth
        </div>

        <ul className={`links ${open ? "open" : ""}`}>
          {navItems.map((item, i) => {
            if (item.show === false) return null;
            return (
              <li key={i} style={{ "--i": i + 1 }}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    if (item.href === "/dashboard") {
                      navigate("/dashboard");
                    } else if (item.href.startsWith("#")) {
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                >
                  {item.label}
                  <span className="hover-line" />
                </a>
              </li>
            );
          })}

          <div className="mobile-auth">
            {isAuthenticated ? (
              <>
                <button className="btn primary" onClick={handleDashboardClick}>
                  Dashboard
                </button>
                <button className="btn ghost" onClick={handleLogoutClick}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button className="btn ghost" onClick={handleLoginClick}>
                  Login
                </button>
                <button className="btn primary" onClick={handleSignupClick}>
                  Sign Up
                </button>
              </>
            )}
          </div>
        </ul>

        <div className="auth">
          {isAuthenticated ? (
            <>
              <button className="btn ghost" onClick={handleDashboardClick}>
                Dashboard
              </button>
              <button className="btn primary" onClick={handleLogoutClick}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="btn ghost" onClick={handleLoginClick}>
                Login
              </button>
              <button className="btn primary" onClick={handleSignupClick}>
                Sign Up
              </button>
            </>
          )}
        </div>

        <button
          className={`burger ${open ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span />
          <span />
        </button>
      </nav>
    </header>
  );
}
