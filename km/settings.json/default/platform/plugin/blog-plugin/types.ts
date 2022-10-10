export interface RawgResponse {
  id: number;
  name: string;
  released: string;
  background_image: string;
  esrb_rating: {
    id: number;
    name: string;
    slug: string;
  };
  genres: {
    id: number;
    name: string;
    slug: string;
  }[];
  short_screenshots: {
    id: number;
    image: string;
  }[];
}

export interface YamlGame {
  name: string;
  platform: string;
  year: string;
}
