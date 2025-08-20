import type { AxiosResponse } from "axios";
import baseUrl from "@/api/baseUrl/baseurl";
import type {
  getCommentLikesParams,
  getVideoLikesParams,
} from "@/types/api/like.type";

/**
 * Toggles the like status for a video.
 * @param {string} videoId - The ID of the video to like or unlike.
 * @returns {Promise<AxiosResponse>} The Axios response from the API.
 * @throws {Error} Throws an error if the API request fails.
 */
export async function toggleVideoLike(videoId: string): Promise<AxiosResponse> {
  try {
    const response: AxiosResponse = await baseUrl.post(
      `/likes/toggle/v/${videoId}`,
      {},
      {
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
 * Gets the number of likes for a video and checks if a specific user has liked it.
 * @param {string} videoId - The ID of the video.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<AxiosResponse>} The Axios response containing like information.
 * @throws {Error} Throws an error if the API request fails.
 */
export async function getVideoLikes({
  videoId,
  userId,
}: getVideoLikesParams): Promise<AxiosResponse> {
  try {
    const response: AxiosResponse = await baseUrl.get(
      `/likes/videoLikes/${videoId}`,
      {
        params: { userId: userId },
      }
    );
    return response;
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
}

/**
 * Toggles the like status for a comment.
 * @param {string} commentId - The ID of the comment to like or unlike.
 * @returns {Promise<AxiosResponse | null>} The Axios response from the API or null on failure.
 * @throws {Error} Throws an error if the API request fails.
 */
export async function toggleCommentLike(
  commentId: string
): Promise<AxiosResponse | null> {
  try {
    const response: AxiosResponse = await baseUrl.post(
      `/likes/toggle/c/${commentId}`,
      {},
      {
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
 * Gets the number of likes for a comment and checks if a specific user has liked it.
 * @param {string} commentId - The ID of the comment.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<AxiosResponse | null>} The Axios response or null on failure.
 * @throws {Error} Throws an error if the API request fails.
 */
export async function getCommentLikes({
  commentId,
  userId,
}: getCommentLikesParams): Promise<AxiosResponse | null> {
  try {
    const response: AxiosResponse = await baseUrl.get(
      `/likes/commentLikes/${commentId}`,
      {
        params: { userId: userId },
      }
    );
    return response;
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
}

/**
 * Fetches all videos liked by the current authenticated user.
 * @returns {Promise<AxiosResponse>} The Axios response containing the liked videos.
 * @throws {Error} Throws an error if the API request fails.
 */
export async function getLikedVideosOfUser(): Promise<AxiosResponse> {
  try {
    const res: AxiosResponse = await baseUrl.get("/likes/video", {
      withCredentials: true,
    });
    return res;
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
}
