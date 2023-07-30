// import { useCookies } from "react-cookie";
// const getUserDataFromCookie = () => {
//   const [cookies] = useCookies(["userData"]); // Replace "userData" with the actual cookie name
//   return cookies.userData || null;
// };
// const [cookies] = useCookies(["token"]);
// const myCookieValue = cookies.token;
// console.log(myCookieValue, "jere");
// let isAuthenticated = false;
// if (myCookieValue) {
//   isAuthenticated = true;
// } else {
//   isAuthenticated = false;
// }
const initialState = {
  loading: false,
  user: "",
  isAuthenticated: false,
  error: null,
};

export default initialState;
