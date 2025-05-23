export interface Book {
    docID: string;
    isbn13: string;
    title: string;
    authors?: string[];
    cover: string;
    categories?: string[];
    price: number;
    description: string;
  }
export interface Author {
    docID: string;
    id : number;
    name: string;
    bio: string;
    image: string;
    books: string[];
  }

export interface Wishlist{
    userId: string; 
    bookId: string[];
  }


export interface Cart{
  userId: string; 
  books: {
    bookId: string;
    quantity: number;
  }[];
  
}
