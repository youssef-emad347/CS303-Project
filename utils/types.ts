export interface Book {
    docID: string;
    isbn13: string;
    title: string;
    authors: string[];
    cover: string;
    categories: string[];
    price: number;
    description: string;
  }
export interface Author {
    id : number;
    name: string;
    bio: string;
    image: string;
    books: string[];
  }