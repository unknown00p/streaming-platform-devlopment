// import axios from "axios";
import BaseUrl from "../baseUrl/BaseUrl"
async function Register({ username, fullname, email, password }) {
  const formData = new FormData();

  const defaultAvatar = new File(
    [await fetch("/images/avatar.png").then((res) => res.blob())],
    "defaultAvatar.png",
    { type: "image/png" }
  )

  const defaultCoverImage = new File(
    [await fetch("/images/coverImage.jpg").then((res) => res.blob())],
    "defaultCoverImage.jpg",
    { type: "image/jpg" }
  )

  console.log("defaultAvatar",defaultAvatar);

  formData.append("username", username);
  formData.append("fullName", fullname);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("avatar", defaultAvatar);
  formData.append("coverImage", defaultCoverImage);
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
