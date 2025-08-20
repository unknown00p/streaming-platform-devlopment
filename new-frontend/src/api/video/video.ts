import baseUrl from "@/api/baseUrl/baseurl";
import type { AxiosResponse } from "axios";
import { handleAxiosError } from "../error/error";
import type {
  getAllSearchVideosParams,
  getAllVideosOfaUserParams,
  postVideoParams,
  updateVideoParams,
} from "@/types/api/video.type";

/**
 * Deletes a video by its ID.
 * @param {string} videoId - The ID of the video to delete.
 * @returns {Promise<AxiosResponse | null>} The Axios response on success, or null on failure.
 */
export async function deleteVideo(
  videoId: string
): Promise<AxiosResponse | null> {
  try {
    const response = await baseUrl.delete(`/videos/${videoId}`, {
      withCredentials: true,
    });
    return response;
  } catch (error: unknown) {
    return handleAxiosError(error, false);
  }
}

/**
 * Fetches all videos belonging to a specific user.
 * @param {getAllVideosOfaUserParams} params - The parameters for filtering and pagination.
 * @returns {Promise<AxiosResponse | null>} The Axios response containing the videos, or null on failure.
 */
export async function getAllVideosOfaUser({
  userId,
  page = 1,
  limit = 10,
  sortBy = "isPublished",
  sortType = "ascending",
}: getAllVideosOfaUserParams): Promise<AxiosResponse | null> {
  try {
    const response = await baseUrl.get("/videos/getAllVideosOfaUser", {
      params: {
        userId,
        page,
        limit,
        sortType,
        sortBy,
      },
      withCredentials: true,
    });
    return response;
  } catch (error: unknown) {
    return handleAxiosError(error, true);
  }
}

/**
 * Fetches a single video by its ID.
 * @param {string} videoId - The ID of the video to fetch.
 * @returns {Promise<AxiosResponse | null>} The Axios response containing the video details, or null on failure.
 */
export async function getVideobyId(
  videoId: string
): Promise<AxiosResponse | null> {
  try {
    const response = await baseUrl.get(`/videos/${videoId}`, {
      params: {
        videoId,
      },
      withCredentials: true,
    });
    return response;
  } catch (error: unknown) {
    return handleAxiosError(error, true);
  }
}

/**
 * Updates an existing video's details.
 * @param {updateVideoParams} params - The video details to update.
 * @returns {Promise<AxiosResponse | null>} The Axios response on success, or null on failure.
 */
export async function updateVideo({
  videoId,
  title,
  description,
  thumbnail,
}: updateVideoParams): Promise<AxiosResponse | null> {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("thumbnail", thumbnail);
    const response = await baseUrl.patch(`/videos/${videoId}`, formData, {
      params: videoId,
      withCredentials: true,
    });
    return response;
  } catch (error: unknown) {
    return handleAxiosError(error, false);
  }
}

/**
 * Toggles the public status of a video (publish/unpublish).
 * @param {string} videoId - The ID of the video to update.
 * @returns {Promise<AxiosResponse | null>} The Axios response on success, or null on failure.
 */
export async function togglePublicStatus(
  videoId: string
): Promise<AxiosResponse | null> {
  try {
    const response = await baseUrl.patch(
      `/videos/toggle/publish/${videoId}`,
      {
        videoId,
      },
      { withCredentials: true }
    );
    return response;
  } catch (error: unknown) {
    return handleAxiosError(error, false);
  }
}

/**
 * Uploads a new video with its details and files.
 * @param {postVideoParams} params - The video details and files.
 * @returns {Promise<AxiosResponse | null>} The Axios response on success, or null on failure.
 */
export async function postVideo({
  title,
  description,
  videoFile,
  thumbnail,
}: postVideoParams): Promise<AxiosResponse | null> {
  let formData = new FormData();
  formData.append("videoFile", videoFile);
  formData.append("thumbnail", thumbnail);
  formData.append("title", title);
  formData.append("description", description);

  try {
    const response = await baseUrl.post("/videos", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return response;
  } catch (error: unknown) {
    return handleAxiosError(error, false);
  }
}

/**
 * Fetches videos based on a search query.
 * @param {getAllSearchVideosParams} params - The search query and filtering parameters.
 * @returns {Promise<AxiosResponse | null>} The Axios response with search results, or null on failure.
 */
export async function getAllSearchVideos({
  page = 1,
  limit = 10,
  sortBy = "isPublished",
  query,
}: getAllSearchVideosParams): Promise<AxiosResponse | null> {
  let queryToLower = query?.trim().toLowerCase();
  try {
    return await baseUrl.get("/videos/searchVideos", {
      params: {
        page,
        limit,
        sortBy,
        query: queryToLower,
      },
      withCredentials: true,
    });
  } catch (error: unknown) {
    return handleAxiosError(error, true);
  }
}

/**
 * Fetches all videos for the main feed with pagination.
 * @param {number} page - The page number to fetch.
 * @param {number} limit - The number of videos per page.
 * @returns {Promise<AxiosResponse | null>} The Axios response containing the videos, or null on failure.
 */
export async function getAllVideos(
  page: number = 1,
  limit: number = 10
): Promise<AxiosResponse | null> {
  try {
    return await baseUrl.get("/videos", {
      params: {
        page,
        limit,
      },
      withCredentials: true,
    });
  } catch (error: unknown) {
    return handleAxiosError(error, true);
  }
}

/**
 * Increments the view count for a specific video.
 * @param {string} videoId - The ID of the video to update.
 * @returns {Promise<AxiosResponse | null>} The Axios response on success, or null on failure.
 */
export async function addViews(videoId: string): Promise<AxiosResponse | null> {
  try {
    const response = await baseUrl.patch(`/videos/addViews/${videoId}`);
    return response;
  } catch (error: unknown) {
    return handleAxiosError(error, true);
  }
}
