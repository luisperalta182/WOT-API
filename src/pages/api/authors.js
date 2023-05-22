import { getAuthors } from "../../utils/getDatabase";

export default async function handler(req, res) {
  const authors = await getAuthors();

  res.status(200).json(authors);
}

