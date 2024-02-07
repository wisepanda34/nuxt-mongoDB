// server/api/books.get.js

import AuthorModel from "@/server/models/Author.js";
import { fetchData } from "@/server/api/utils/data-fetcher.js";

export default defineEventHandler(async (event) => {

  return fetchData(AuthorModel, event);
  // return null
});