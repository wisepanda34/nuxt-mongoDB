// server/api/birthdays.get.js
import birthdayModel from "@/server/models/Birthday.js";
import { fetchData } from "@/server/api/utils/data-fetcher";

export default defineEventHandler(async (event) => {
  return fetchData(birthdayModel, event);
});
