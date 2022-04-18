/* eslint-disable @typescript-eslint/naming-convention */
export interface ResponseImage {
  data: data;
  success: boolean;
  status: number;
}

export interface data {
  id: string;
  title: string;
  url_viewer: string;
  url: string;
  display_url: string;
  size: number;
  time: string;
  expiration: string;
  is_360: number;
  image: image;
  thumb: image;
  delete_url: string;
}
export interface image {
  filename: string;
  name: string;
  mime: string;
  extension: string;
  url: string;
}
