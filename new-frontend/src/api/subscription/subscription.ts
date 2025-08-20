import baseUrl from "@/api/baseUrl/baseurl";
import type { AxiosResponse } from "axios";
import { handleAxiosError } from "../error/error";

/**
 * Toggles the subscription status for a channel.
 * @param {string} channelId - The ID of the channel to subscribe to.
 * @returns {Promise<AxiosResponse>} The Axios response from the API.
 */
export async function toggleSubscription(
  channelId: string
): Promise<AxiosResponse | null> {
  try {
    const response = baseUrl.post(
      `/subscriptions/c/${channelId}`,
      {},
      {
        params: { channelId },
        withCredentials: true,
      }
    );

    return response;
  } catch (error: unknown) {
    return handleAxiosError(error, false);
  }
}

/**
 * Checks if the current user is subscribed to a channel.
 * @param {string} channelId - The ID of the channel to subscribe to.
 * @returns {Promise<AxiosResponse>} The Axios response from the API.
 */
export async function isChannelSubscribed(
  channelId: string
): Promise<AxiosResponse | null> {
  try {
    const response = await baseUrl.get(
      `/subscriptions/c/getIsChannelSubscribed/${channelId}`,
      {
        withCredentials: true,
      }
    );

    return response;
  } catch (error: unknown) {
    return handleAxiosError(error, true);
  }
}

/**
 * Gets the subscribers of a channel.
 * @param {string} channelId - The ID of the channel to subscribe to.
 * @returns {Promise<AxiosResponse>} The Axios response from the API.
 */
export async function getSubscribersOfChannel(
  channelId: string
): Promise<AxiosResponse | null> {
  try {
    const response = await baseUrl.get(`/subscriptions/c/${channelId}`);

    return response;
  } catch (error) {
    return handleAxiosError(error, true);
  }
}

/**
 * Checks if the current user is subscribed to a channel.
 * @param {string} userId - The ID of the user to check subscriptions for.
 * @returns {Promise<AxiosResponse>} The Axios response from the API.
 */
export async function getSubscribedChannelOfUser(
  userId: string
): Promise<AxiosResponse | null> {
  try {
    const response = await baseUrl.get(`/subscriptions/u/${userId}`);
    return response;
  } catch (error) {
    return handleAxiosError(error, true);
  }
}
