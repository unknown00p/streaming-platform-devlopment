import type { AxiosResponse } from "axios";
import baseUrl from "@/api/baseUrl/baseurl.ts";
import type {
  ChangePasswordParams,
  SignInParams,
  SignUpParams,
  UpdateNameEmailParams,
} from "@/types/api/auth.type";

import type { ApiError } from "@/types/api/error.type";

/**
 * Signs in a user with email and password.
 * @param {SignInParams} { email, password }
 * @returns {Promise<AxiosResponse | null>}
 * @throws {Error} Throws an error if the API request fails.
 */
export async function SignIn({
  email,
  password,
}: SignInParams): Promise<AxiosResponse | null> {
  try {
    const response: AxiosResponse = await baseUrl.post(
      "/users/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    return response;
  } catch (error: unknown) {
    if (isApiError(error)) {
      console.log(error?.response?.data);
    } else {
      console.log(error);
    }
    throw error;
  }
}

/**
 * Signs in a user with a Google token.
 * @param {string} token - The Google token.
 * @returns {Promise<AxiosResponse | null>}
 * @throws {Error} Throws an error if the API request fails.
 */
export async function SignInWithGoogle(
  token: string
): Promise<AxiosResponse | null> {
  try {
    const formdata = new FormData();
    formdata.append("token", token);
    const response: AxiosResponse = await baseUrl.post(
      "/users/googleLogin",
      formdata,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
    return response;
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
}

/**
 * Signs out the current user.
 * @returns {Promise<AxiosResponse | null>}
 * @throws {Error} Throws an error if the API request fails.
 */
export async function SignOut(): Promise<AxiosResponse | null> {
  try {
    const response: AxiosResponse = await baseUrl.post(
      "/users/logout",
      {},
      { withCredentials: true }
    );
    return response;
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
}

/**
 * Signs up a new user with provided details and optional avatar/cover image.
 * @param {SignUpParams} { username, fullname, email, password, avatar, coverImage }
 * @returns {Promise<AxiosResponse | null>}
 * @throws {Error} Throws an error if the API request fails.
 */
export async function SignUp({
  username,
  fullname,
  email,
  password,
  avatar,
  coverImage,
}: SignUpParams): Promise<AxiosResponse | null> {
  const formData = new FormData();

  const defaultAvatarBlob = await fetch("/images/avatar.png").then((res) =>
    res.blob()
  );
  const defaultAvatar = new File([defaultAvatarBlob], "defaultAvatar.png", {
    type: "image/png",
  });

  const defaultCoverImageBlob = await fetch("/images/coverImage.jpg").then(
    (res) => res.blob()
  );
  const defaultCoverImage = new File(
    [defaultCoverImageBlob],
    "defaultCoverImage.jpg",
    { type: "image/jpeg" }
  );

  formData.append("username", username);
  formData.append("fullName", fullname);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("avatar", avatar && avatar[0] ? avatar[0] : defaultAvatar);
  formData.append(
    "coverImage",
    coverImage && coverImage[0] ? coverImage[0] : defaultCoverImage
  );

  try {
    const register: AxiosResponse = await baseUrl.post(
      "/users/register",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return register;
  } catch (error: unknown) {
    console.error("Error during registration:", error);
    throw error;
  }
}

/**
 * Fetches user data by user ID.
 * @param {string} userId
 * @returns {Promise<AxiosResponse | null>}
 * @throws {Error} Throws an error if the API request fails.
 */
export async function userById(userId: string): Promise<AxiosResponse | null> {
  try {
    const response: AxiosResponse = await baseUrl.get("/users/userById", {
      params: { userId },
      withCredentials: true,
    });
    return response;
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
}

/**
 * Fetches data of the current logged-in user.
 * @returns {Promise<AxiosResponse>}
 * @throws {Error} Throws an error if the request fails.
 */
export async function currentUser(): Promise<AxiosResponse> {
  try {
    const response: AxiosResponse = await baseUrl.get("/users/current-user", {
      withCredentials: true,
    });
    return response;
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
}

/**
 * Updates the user's full name and email.
 * @param {UpdateNameEmailParams} { fullName, email }
 * @returns {Promise<AxiosResponse | null>}
 * @throws {Error} Throws an error if the API request fails.
 */
export async function UpdateNameEmail({
  fullName,
  email,
}: UpdateNameEmailParams): Promise<AxiosResponse | null> {
  try {
    const updatedValue: AxiosResponse = await baseUrl.patch(
      "/users/update-account",
      {
        fullName,
        email,
      },
      { withCredentials: true }
    );
    return updatedValue;
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
}

/**
 * Updates the user's avatar.
 * @param {File} avatarFile - The new avatar image file.
 * @returns {Promise<AxiosResponse | null>}
 * @throws {Error} Throws an error if the API request fails.
 */
export async function UpdateAvatar(
  avatarFile: File
): Promise<AxiosResponse | null> {
  try {
    const formData = new FormData();
    formData.append("avatar", avatarFile);
    const response: AxiosResponse = await baseUrl.patch(
      "/users/avatar",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
}

/**
 * Updates the user's cover image.
 * @param {File} coverImage - The new cover image file.
 * @returns {Promise<AxiosResponse | null>}
 * @throws {Error} Throws an error if the API request fails.
 */
export async function UpdateCoverImage(
  coverImage: File
): Promise<AxiosResponse | null> {
  try {
    const formData = new FormData();
    formData.append("coverImage", coverImage);
    const response: AxiosResponse = await baseUrl.patch(
      "/users/cover-image",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
    return response;
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
}

/**
 * Changes the current user's password.
 * @param {ChangePasswordParams} { oldPassword, newPassword }
 * @returns {Promise<AxiosResponse | null>}
 * @throws {Error} Throws an error if the API request fails.
 */
export async function changeCurrentPassword({
  oldPassword,
  newPassword,
}: ChangePasswordParams): Promise<AxiosResponse | null> {
  try {
    const response: AxiosResponse = await baseUrl.post(
      "/users/change-password",
      {
        oldPassword,
        newPassword,
      },
      { withCredentials: true }
    );
    return response;
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
}

/**
 * Adds a video to the user's watch history.
 * @param {string} videoId
 * @returns {Promise<AxiosResponse>}
 * @throws {Error} Throws an error if the request fails.
 */
export async function addVideosToWatchHistory(
  videoId: string
): Promise<AxiosResponse> {
  console.log(videoId);
  try {
    const result: AxiosResponse = await baseUrl.patch(
      "/users/addVideosToWatchHistory",
      {
        videoId: videoId,
      },
      { withCredentials: true }
    );
    console.log("addVideosToWatchHistory", result);
    return result;
  } catch (error: unknown) {
    console.log(error);
    throw error
  }
}

/**
 * Fetches the user's watch history.
 * @returns {Promise<AxiosResponse>}
 * @throws {Error} Throws an error if the request fails.
 */
export async function watchHistory(): Promise<AxiosResponse> {
  try {
    const result: AxiosResponse = await baseUrl.get("/users/watchHistory", {
      withCredentials: true,
    });
    return result;
  } catch (error: unknown) {
    throw error;
  }
}

// A type guard to check if an unknown error is an ApiError
function isApiError(error: unknown): error is ApiError {
  return typeof error === "object" && error !== null && "message" in error;
}
