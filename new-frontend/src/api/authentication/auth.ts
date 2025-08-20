import type { AxiosResponse } from "axios";
import baseUrl from "@/api/baseUrl/baseurl.ts";
import type {
  ChangePasswordParams,
  SignInParams,
  SignUpParams,
  UpdateNameEmailParams,
} from "@/types/api/auth.type";
import type { ApiError } from "@/types/api/error.type";
import { handleAxiosError } from "@/api/error/error.ts";

/**
 * Signs in a user with email and password.
 * @param {SignInParams} { email, password }
 * @returns {Promise<AxiosResponse | null>}
 */
export async function SignIn({
  email,
  password,
}: SignInParams): Promise<AxiosResponse | null> {
  try {
    const response: AxiosResponse = await baseUrl.post(
      "/users/login",
      { email, password },
      { withCredentials: true }
    );
    return response;
  } catch (error: unknown) {
    // Expected failure (e.g., incorrect credentials), so return null.
    return handleAxiosError(error, false);
  }
}

/**
 * Signs in a user with a Google token.
 * @param {string} token - The Google token.
 * @returns {Promise<AxiosResponse | null>}
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
    // Expected failure (e.g., invalid token), so return null.
    return handleAxiosError(error, false);
  }
}

/**
 * Signs out the current user.
 * @returns {Promise<AxiosResponse | null>}
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
    // Signing out failure is not critical, so return null.
    return handleAxiosError(error, false);
  }
}

/**
 * Signs up a new user with provided details and optional avatar/cover image.
 * @param {SignUpParams} { username, fullname, email, password, avatar, coverImage }
 * @returns {Promise<AxiosResponse | null>}
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
  // ... (fetch and append logic remains the same)
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
    // Expected failure (e.g., username already taken), so return null.
    return handleAxiosError(error, false);
  }
}

/**
 * Fetches user data by user ID.
 * @param {string} userId
 * @returns {Promise<AxiosResponse>}
 */
export async function userById(userId: string): Promise<AxiosResponse | null> {
  try {
    const response: AxiosResponse = await baseUrl.get("/users/userById", {
      params: { userId },
      withCredentials: true,
    });
    return response;
  } catch (error: unknown) {
    // This is a critical function for getting a user's profile.
    // If it fails, the UI can't render the profile, so throw an error.
    return handleAxiosError(error, true);
  }
}

/**
 * Fetches data of the current logged-in user.
 * @returns {Promise<AxiosResponse>}
 */
export async function currentUser(): Promise<AxiosResponse | null> {
  try {
    const response: AxiosResponse = await baseUrl.get("/users/current-user", {
      withCredentials: true,
    });
    return response;
  } catch (error: unknown) {
    // This is a critical function for app state.
    // If it fails, something is fundamentally wrong, so throw.
    return handleAxiosError(error, true);
  }
}

/**
 * Updates the user's full name and email.
 * @param {UpdateNameEmailParams} { fullName, email }
 * @returns {Promise<AxiosResponse | null>}
 */
export async function UpdateNameEmail({
  fullName,
  email,
}: UpdateNameEmailParams): Promise<AxiosResponse | null> {
  try {
    const updatedValue: AxiosResponse = await baseUrl.patch(
      "/users/update-account",
      { fullName, email },
      { withCredentials: true }
    );
    return updatedValue;
  } catch (error: unknown) {
    // A failed update can be handled locally (e.g., show a toast).
    return handleAxiosError(error, false);
  }
}

/**
 * Updates the user's avatar.
 * @param {File} avatarFile - The new avatar image file.
 * @returns {Promise<AxiosResponse | null>}
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
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
    return response;
  } catch (error: unknown) {
    // A failed update is not critical, so return null.
    return handleAxiosError(error, false);
  }
}

/**
 * Updates the user's cover image.
 * @param {File} coverImage - The new cover image file.
 * @returns {Promise<AxiosResponse | null>}
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
    // A failed update is not critical, so return null.
    return handleAxiosError(error, false);
  }
}

/**
 * Changes the current user's password.
 * @param {ChangePasswordParams} { oldPassword, newPassword }
 * @returns {Promise<AxiosResponse | null>}
 */
export async function changeCurrentPassword({
  oldPassword,
  newPassword,
}: ChangePasswordParams): Promise<AxiosResponse | null> {
  try {
    const response: AxiosResponse = await baseUrl.post(
      "/users/change-password",
      { oldPassword, newPassword },
      { withCredentials: true }
    );
    return response;
  } catch (error: unknown) {
    // Expected failure (e.g., incorrect old password), so return null.
    return handleAxiosError(error, false);
  }
}

/**
 * Adds a video to the user's watch history.
 * @param {string} videoId
 * @returns {Promise<AxiosResponse>}
 */
export async function addVideosToWatchHistory(
  videoId: string
): Promise<AxiosResponse | null> {
  try {
    const result: AxiosResponse = await baseUrl.patch(
      "/users/addVideosToWatchHistory",
      { videoId: videoId },
      { withCredentials: true }
    );
    return result;
  } catch (error: unknown) {
    // This is a critical action. If it fails, it needs to be reported.
    return handleAxiosError(error, true);
  }
}

/**
 * Fetches the user's watch history.
 * @returns {Promise<AxiosResponse>}
 */
export async function watchHistory(): Promise<AxiosResponse | null> {
  try {
    const result: AxiosResponse = await baseUrl.get("/users/watchHistory", {
      withCredentials: true,
    });
    return result;
  } catch (error: unknown) {
    // This is a critical function for displaying user content.
    // If it fails, something is wrong, so throw.
    return handleAxiosError(error, true);
  }
}