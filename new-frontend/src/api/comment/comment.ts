import type { AxiosResponse } from "axios";
import baseUrl from "@/api/baseUrl/baseurl";
import type { ApiError } from "@/types/api/error.type";
/**
 * Fetches all comments for a specific video.
 * @param {string} videoId The ID of the video to get comments for.
 * @returns {Promise<AxiosResponse>} The Axios response containing the video comments.
 * @throws {Error} Throws an error if the API request fails.
 */
export async function getVideoComments(
  videoId: string
): Promise<AxiosResponse> {
  try {
    const response: AxiosResponse = await baseUrl.get(`/comments/${videoId}`);
    return response;
  } catch (error: unknown) {
    console.error("Error fetching video comments:", error);
    throw error;
  }
}

/**
 * Posts a new comment on a video.
 * @param {string} videoId The ID of the video to comment on.
 * @param {string} content The content of the comment.
 * @returns {Promise<AxiosResponse>} The Axios response after making the comment.
 * @throws {Error} Throws an error if the API request fails.
 */
export async function makeComment(
  videoId: string,
  content: string
): Promise<AxiosResponse> {
  try {
    const response: AxiosResponse = await baseUrl.post(
      `/comments/${videoId}`,
      { content },
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error: unknown) {
    console.error("Error making a comment:", error);
    throw error;
  }
}
