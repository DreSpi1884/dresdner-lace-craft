import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useScrollAnimations from "@/hooks/useScrollAnimations";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;

    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [pathname, hash]);

  useScrollAnimations();

  return null;
};

export default ScrollToTop;
