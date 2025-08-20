export interface getAllVideosOfaUserParams {
    userId: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortType?: string;
}

export interface updateVideoParams {
    videoId: string;
    title: string;
    description: string;
    thumbnail: File;
}

export interface postVideoParams {
  title: string;
  description: string;
  videoFile: File;
  thumbnail: File;
}

export interface getAllSearchVideosParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  query?: string;
}