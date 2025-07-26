export interface Author {
  name: string;
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  author?: {
    name: string;
  };
}
