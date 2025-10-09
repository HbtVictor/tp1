export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: "admin" | "user"; 
}

export interface Article {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
}
