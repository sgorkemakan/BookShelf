import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Book } from "../interfaces/Book";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  endpoints: (builder) => ({
    books: builder.query<Book[], void>({
      query: () => "/books",
    }),
  }),
});

export const { useBooksQuery } = booksApi;
