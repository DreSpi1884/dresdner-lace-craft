import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useScrollAnimations from "@/hooks/useScrollAnimations";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait for the target section to mount, then scroll to it
      const id = hash.replace("#", "");
      const tryScroll = (attempt = 0) => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (attempt < 10) {
          window.setTimeout(() => tryScroll(attempt + 1), 60);
        }
      };
      tryScroll();
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  useScrollAnimations();

  return null;
};

export default ScrollToTop;
