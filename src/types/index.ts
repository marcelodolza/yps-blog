export type Article = {
  id: string;
  author: string;
  image: string;
  title: string;
  intro: string;
  text: string;
  createdAt: string;
  active?: boolean;
};

export type OptsFetch = {
  limit?: number;
  page?: number;
};
