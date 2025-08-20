import type { AxiosResponse } from "axios";
import baseUrl from "@/api/baseUrl/baseurl";
import { handleAxiosError } from "@/api/error/error";

/**
 * Creates a new playlist with the given name.
 * @param {string} name - The name of the new playlist.
 * @returns {Promise<AxiosResponse>} The Axios response from the API.
 */
export async function createPlaylist(name: string): Promise<AxiosResponse | null> {
  try {
    const res: AxiosResponse = await baseUrl.post(
      "/playlist",
      { name },
      { withCredentials: true }
    );
    return res;
  } catch (error: unknown) {
    return handleAxiosError(error, false)
  }
}

/**
 * Fetches all playlists for a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<AxiosResponse>} The Axios response containing the user's playlists.
 */
export async function getPlaylistsOfUser(
  userId: string
): Promise<AxiosResponse | null> {
  try {
    const res: AxiosResponse = await baseUrl.get(`/playlist/user/${userId}`, {
      withCredentials: true,
    });
    return res;
  } catch (error: unknown) {
    return handleAxiosError(error, true)
  }
}

/**
 * Adds a video to a specific playlist.
 * @param {string} playlistId - The ID of the playlist.
 * @param {string} videoId - The ID of the video to add.
 * @returns {Promise<AxiosResponse>} The Axios response from the API.
 * @throws {unknown} Throws an error if the API request fails.
 */
export async function addVideoToPlaylist(
  playlistId: string,
  videoId: string
): Promise<AxiosResponse | null> {
  try {
    const res: AxiosResponse = await baseUrl.post(
      `/playlist/add/${videoId}/${playlistId}`,
      {},
      { withCredentials: true }
    );
    return res;
  } catch (error: unknown) {
    return handleAxiosError(error, false) 
  }
}

/**
 * Fetches a playlist by its ID.
 * @param {string} playlistId - The ID of the playlist to fetch.
 * @returns {Promise<AxiosResponse>} The Axios response containing the playlist details.
 * @throws {unknown} Throws an error if the API request fails.
 */
export async function getPlaylistById(
  playlistId: string
): Promise<AxiosResponse | null> {
  try {
    const res: AxiosResponse = await baseUrl.get(`/playlist/${playlistId}`, {
      withCredentials: true,
    });
    return res;
  } catch (error: unknown) {
    return handleAxiosError(error, true)
  }
}
