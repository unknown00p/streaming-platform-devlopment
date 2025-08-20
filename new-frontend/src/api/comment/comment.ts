import type { AxiosResponse } from "axios";
import baseUrl from "@/api/baseUrl/baseurl";
import { handleAxiosError } from "@/api/error/error";
/**
 * Fetches all comments for a specific video.
 * @param {string} videoId The ID of the video to get comments for.
 * @returns {Promise<AxiosResponse>} The Axios response containing the video comments.
 */
export async function getVideoComments(
  videoId: string
): Promise<AxiosResponse | null> {
  try {
    const response: AxiosResponse = await baseUrl.get(`/comments/${videoId}`);
    return response;
  } catch (error: unknown) {
    return handleAxiosError(error, false);
  }
}

/**
 * Posts a new comment on a video.
 * @param {string} videoId The ID of the video to comment on.
 * @param {string} content The content of the comment.
 * @returns {Promise<AxiosResponse>} The Axios response after making the comment.
 */
export async function makeComment(
  videoId: string,
  content: string
): Promise<AxiosResponse | null> {
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
    return handleAxiosError(error, false)
  }
}
