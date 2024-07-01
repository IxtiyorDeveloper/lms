export type SourceType = {
  slug?: string;
  data?: {
    id: number;
    name: string;
    type: number;
    using_place: number;
    slug: string;
    iconFile: {
      base_url: string;
      full_url: string;
      id: number;
      path: string;
      resolution: string;
    };
  }[];
};
