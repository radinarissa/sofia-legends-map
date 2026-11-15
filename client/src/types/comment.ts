export interface CommentAuthor {
  _id: string;
  name: string;
}

export interface LegendComment {
  _id: string;
  legend: string;
  author: CommentAuthor | null; 
  text: string;
  createdAt: string;
  updatedAt: string;
}