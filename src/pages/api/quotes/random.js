import { getRandom } from "../../utils/getDatabase";

export default async function handler(req, res) {
  const quote = await getRandom();

  res.status(200).json(quote);
}
