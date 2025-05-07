import { db } from "@/firebase/firebase"
import { collection, addDoc } from "firebase/firestore";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
// 📚 Fetch Book from Open Library
const fetchBookByISBN = async (isbn: string) => {
  const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;
  const res = await fetch(url);
  const data = await res.json();
  const book = data[`ISBN:${isbn}`];

  if (!book) return null;

  const randomPrice = parseFloat((Math.random() * (50 - 5) + 5).toFixed(2));

  let description: string = "No description available";
      if (data.description) {
        description = typeof data.description === "string"
          ? data.description
          : data.description.value;
      } else if (data.works && data.works.length > 0) {
        const workRes = await fetch(`https://openlibrary.org${data.works[0].key}.json`);
        const workData = await workRes.json();
        if (workData.description) {
          description = typeof workData.description === "string"
            ? workData.description
            : workData.description.value;
        }
      }
      
  return {
    isbn13: isbn,
    title: data.title || "Unknown Title",
    authors: data.authors?.map((a: any) => a.name || "Unknown Author") || ["Unknown Author"],
    cover: `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`,
    categories: data.subjects?.map((s: any) => s.name) ?? [],
    price: randomPrice,
    description,
  };
};

// 🔁 Seed Books
const seedBooks = async () => {
    const isbns = [
        "9780451526534", "9780140328721", "9780261103573", "9780439554930",
        "9780307277671", "9780140449266", "9780061120084", "9780142437230",
        "9780141439600", "9780316769488", "9780743273565", "9780140187397",
        "9780140449136", "9780140449266", "9781593279509", "9781491950296",
        "9780596007126", "9780132350884", "9780134685991", "9780262033848",
        "9780201633610", "9781492078005", "9780596517748", "9781118531648",
        "9780321125217", "9781789955750", "9781449355739", "9781492045526",
        "9780131103627", "9780131101630", "9780201616224", "9781491954249",
        "9780201485677", "9780465026562", "9780192833983", "9780143105138",
        "9780140449334", "9780143106296", "9780141441146", "9780140449198",
        "9780140442106", "9780140449266", "9780140449136", "9780307387899",
        "9780062316097", "9780143127741", "9780307474278", "9780143039952",
        "9780307271037", "9780399590504"
      ];

  for (const isbn of isbns) {
    const book = await fetchBookByISBN(isbn);
    if (book) {
      await addDoc(collection(db, "books"), book);
      console.log(`✅ Added: ${book.title}`);
    } else {
      console.warn(`❌ Not found: ISBN ${isbn}`);
    }
    await delay(1000);
  }
  console.log("✅ Seeding completed.");
  process.exit(0);
};

seedBooks();
