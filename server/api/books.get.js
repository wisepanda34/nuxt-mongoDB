// server/api/books.get.js

import bookModel from "@/server/models/Book";
import { fetchData } from "~/server/api/utils/data-fetcher";

export default defineEventHandler(async (event) => {

  return fetchData(bookModel, event);
});