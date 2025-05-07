import { collection, addDoc } from "firebase/firestore"
import { db } from '@/firebase/firebase'

const authors = [
    {
      "id": 1,
      "name": "J.R.R. Tolkien",
      "bio": "English writer, best known for 'The Hobbit' and 'The Lord of the Rings' series.",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/J._R._R._Tolkien_1963.jpg/800px-J._R._R._Tolkien_1963.jpg",
      "books": ["The Hobbit", "The Lord of the Rings"]
    },
    {
      "id": 2,
      "name": "Eric Evans",
      "bio": "Author and thought leader in software development, best known for 'Domain-Driven Design'.",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/EricEvans.jpg/800px-EricEvans.jpg",
      "books": ["Domain-Driven Design"]
    },
    {
      "id": 3,
      "name": "Anonymous",
      "bio": "Unknown author of numerous works, often without attribution.",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Anonymous_mask.jpg/800px-Anonymous_mask.jpg",
      "books": ["Beowulf"]
    },
    {
      "id": 4,
      "name": "Andrew George",
      "bio": "Scholar of ancient texts and translations, especially of Mesopotamian literature.",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Andrew_George.jpg/800px-Andrew_George.jpg",
      "books": ["The Epic of Gilgamesh"]
    },
    {
      "id": 5,
      "name": "Andy Hunt",
      "bio": "Co-author of 'The Pragmatic Programmer', focusing on software craftsmanship.",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/AndyHunt.jpg/800px-AndyHunt.jpg",
      "books": ["The Pragmatic Programmer"]
    },
    {
      "id": 6,
      "name": "David Thomas",
      "bio": "Co-author of 'The Pragmatic Programmer', dedicated to improving software development practices.",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/David_Thomas.jpg/800px-David_Thomas.jpg",
      "books": ["The Pragmatic Programmer"]
    },
    {
      "id": 7,
      "name": "Dave Thomas",
      "bio": "Influential author and speaker in the software development community.",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Dave_Thomas.jpg/800px-Dave_Thomas.jpg",
      "books": ["Pragmatic Version Control"]
    },
    {
      "id": 8,
      "name": "Andrew Hunt",
      "bio": "Co-author of 'The Pragmatic Programmer', passionate about pragmatic and effective software practices.",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/AndyHunt.jpg/800px-AndyHunt.jpg",
      "books": ["The Pragmatic Programmer"]
    },
    {
      "id": 9,
      "name": "Cormac McCarthy",
      "bio": "American novelist known for works like 'The Road' and 'No Country for Old Men'.",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Cormac_McCarthy_2015.jpg/800px-Cormac_McCarthy_2015.jpg",
      "books": ["The Road", "No Country for Old Men"]
    },
    {
      "id": 10,
      "name": "Tom Stechschulte",
      "bio": "Software developer and author known for contributions to software development education.",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Tom_Stechschulte.jpg/800px-Tom_Stechschulte.jpg",
      "books": ["TBD"]
    },
    {
      "id": 11,
      "name": "Unknown Author",
      "bio": "An author with no known details or attribution.",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Anonymous_mask.jpg/800px-Anonymous_mask.jpg",
      "books": ["Anonymous Works"]
    },
    {
      "id": 12,
      "name": "F. Scott Fitzgerald",
      "bio": "American author, widely regarded for his novel 'The Great Gatsby'.",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/F_Scott_Fitzgerald_1921.jpg/800px-F_Scott_Fitzgerald_1921.jpg",
      "books": ["The Great Gatsby", "Tender Is the Night"]
    },
    {
      "id": 13,
      "name": "Alexandre Dumas",
      "bio": "French writer best known for 'The Three Musketeers' and 'The Count of Monte Cristo'.",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Alexandre_Dumas_1845.jpg/800px-Alexandre_Dumas_1845.jpg",
      "books": ["The Three Musketeers", "The Count of Monte Cristo"]
    },
    {
      "id": 14,
      "name": "Фёдор Михайлович Достоевский",
      "bio": "Russian novelist, philosopher, and short story writer, known for works like 'Crime and Punishment'.",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Fyodor_Dostoevsky.jpg/800px-Fyodor_Dostoevsky.jpg",
      "books": ["Crime and Punishment", "The Brothers Karamazov"]
    },
    {
      "id": 15,
      "name": "Jon Duckett",
      "bio": "Author of books on web development, particularly known for 'HTML and CSS: Design and Build Websites'.",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Jon_Duckett.jpg/800px-Jon_Duckett.jpg",
      "books": ["HTML and CSS: Design and Build Websites"]
    },
    {
      "id": 16,
      "name": "Brian W. Kernighan",
      "bio": "Computer scientist and co-author of 'The C Programming Language'.",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Brian_Kernighan.jpg/800px-Brian_Kernighan.jpg",
      "books": ["The C Programming Language"]
    },
    {
      "id": 17,
      "name": "Dennis MacAlistair Ritchie",
      "bio": "Creator of the C programming language and co-author of 'The C Programming Language'.",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Dennis_Ritchie.jpg/800px-Dennis_Ritchie.jpg",
      "books": ["The C Programming Language"]
    },
    {
      "id": 18,
      "name": "John Steinbeck",
      "bio": "American author, best known for 'The Grapes of Wrath' and 'Of Mice and Men'.",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/John_Steinbeck_1940.jpg/800px-John_Steinbeck_1940.jpg",
      "books": ["The Grapes of Wrath", "Of Mice and Men"]
    },
    {
      "id": 19,
      "name": "Robert C. Martin",
      "bio": "Known for his work on Agile software development and author of 'Clean Code'.",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Robert_C_Martin.jpg/800px-Robert_C_Martin.jpg",
      "books": ["Clean Code", "The Clean Coder"]
    },
    {
      "id": 20,
      "name": "Лев Толстой",
      "bio": "Russian novelist, most famous for 'War and Peace' and 'Anna Karenina'.",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Leo_Tolstoy_1897.jpg/800px-Leo_Tolstoy_1897.jpg",
      "books": ["War and Peace", "Anna Karenina"]
    },
    {
      "id": 21,
      "name": "Martin Fowler",
      "bio": "Author and speaker, widely known for his work on software design and development practices.",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Martin_Fowler.jpg/800px-Martin_Fowler.jpg",
      "books": ["Refactoring", "Patterns of Enterprise Application Architecture"]
    },
    {
      "id": 22,
      "name": "Eric Elliott",
      "bio": "JavaScript expert and author of 'Programming JavaScript Applications'.",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Eric_Elliott.jpg/800px-Eric_Elliott.jpg",
      "books": ["Programming JavaScript Applications"]
    },
    {
      "id": 23,
      "name": "Sebastian Raschka",
      "bio": "Machine learning expert and author, known for his books on Python and data science.",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Sebastian_Raschka.jpg/800px-Sebastian_Raschka.jpg",
      "books": ["Python Machine Learning"]
    },
    {
      "id": 24,
      "name": "Yuval Noah Harari",
      "bio": "Historian and author, best known for his works 'Sapiens' and 'Homo Deus'.",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Yuval_Noah_Harari_%28Israel%29.jpg/800px-Yuval_Noah_Harari_%28Israel%29.jpg",
      "books": ["Sapiens", "Homo Deus"]
    },
    {
      "id": 25,
      "name": "Daniel Casanave",
      "bio": "Expert in software design and programming, known for his contributions to agile development.",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Daniel_Casanave.jpg/800px-Daniel_Casanave.jpg",
      "books": ["Domain-Driven Design"]
    },
    {
      "id": 26,
      "name": "David Vandermeulen",
      "bio": "Author and software developer known for his expertise in coding techniques and methodologies.",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/David_Vandermeulen.jpg/800px-David_Vandermeulen.jpg",
      "books": ["TBD"]
    }
  ]
  
  

const addAuthorsToFirestore = async () => {
  try {
    const authorsCollection = collection(db, "authors"); // The collection name is 'authors'
    for (let author of authors) {
      await addDoc(authorsCollection, {
        id: author.id,
        name: author.name,
        bio: author.bio,
        image: author.image,
        books: author.books,
      });
      console.log(`Added ${author.name} to Firestore`);
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

addAuthorsToFirestore();
