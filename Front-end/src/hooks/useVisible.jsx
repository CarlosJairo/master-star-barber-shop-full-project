import { useState } from "react";

const useVisible = () => {
  const [isVisible, setIsVisible] = useState(false);

  // const toggleVisible = () => setIsVisible(!isVisible);
  // const closeVisible = () => setIsVisible(false);
  // const todoVisible = () => setIsVisible(true);

  return [isVisible, setIsVisible];
};

export default useVisible;
