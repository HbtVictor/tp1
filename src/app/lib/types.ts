export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
}
