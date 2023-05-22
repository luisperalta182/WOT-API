import { getBooks } from "../utils/getDatabase";

export default async function handler(req, res) {
  const authors = await getBooks();

  res.status(200).json(authors);
}

