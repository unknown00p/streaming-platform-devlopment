import BaseUrl from "../baseUrl/BaseUrl"
async function Register({ username, fullname, email, password,avatar }) {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("fullName", fullname);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("avatar", avatar[0]);
  formData.append("coverImage", "https://ts4.mm.bing.net/th?id=OIP.48MZ3Hs-Q9SB5K0M2AdEkgHaEo&pid=15.1");
  try {
    const register = await BaseUrl().post("/users/register", formData, {
      headers:{
        "Content-Type":"multipart/form-data"
      }
    },)
    return register
  } catch (error) {
    console.error("Error during registration:", error);
    return null;
  }
}

export default Register
