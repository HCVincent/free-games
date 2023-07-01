import { useState } from "react";

const useTokens = () => {
  const [jwtToken, setJwtToken] = useState("");
  return { jwtToken, setJwtToken };
};

export default useTokens;
