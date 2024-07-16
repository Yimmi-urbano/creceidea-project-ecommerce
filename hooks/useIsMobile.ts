// hooks/useIsMobile.ts
import { useMediaQuery } from "@mui/material";

const useIsMobile = (): boolean => {
  const isMobile = useMediaQuery("(max-width:768px)");
  return isMobile;
};

export default useIsMobile;
