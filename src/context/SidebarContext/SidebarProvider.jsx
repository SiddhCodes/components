import { useEffect, useState } from "react";
import { SidebarContext } from "./sidebarContext";
import { useMediaQuery } from "react-responsive";

export const SidebarProvider = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const toggle = () => setIsCollapsed((prev) => !prev);

  useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);

  const value = {
    isMobile,
    isCollapsed,
    setIsCollapsed,
    toggle,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
