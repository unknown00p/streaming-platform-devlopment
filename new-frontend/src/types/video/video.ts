export interface HomeVideoDataTypes {
  _id: string;
  createdAt: string;
  description: string;
  duration: number;
  isPublished: boolean;
  owner: {
    _id: string,
    username:string,
    avatar:string
  };
  thumbnail: string;
  title: string;
  updatedAt: string;
  videoUrlId: string;
  views: number;
}

export type VideoDataType = {
  createdAt: string;
  description: string;
  duration: number;
  isPublished: boolean;
  owner: string;
  thumbnail: string;
  title: string;
  updatedAt: string;
  videoUrl: {
    auto: string;
    quality1080p: string;
    quality720p: string;
    quality480p: string;
    quality320p: string;
  };
  videoUrlId: string;
  views: number;
  _id: string;
};