import { jwtDecode } from "jwt-decode";
export const decodeToken = (token) => {
  const decodedHeader = jwtDecode(token);

  return decodedHeader;
};
