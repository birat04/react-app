import { Client, Databases, ID, Query } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

if (!PROJECT_ID || !DATABASE_ID || !COLLECTION_ID) {
  console.error('Missing Appwrite environment variables. Please check your .env file.');
  throw new Error("Missing Appwrite environment variables.");
}

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(PROJECT_ID);

const database = new Databases(client);

const retry = async (fn, maxRetries = 3, delay = 1000) => {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }
  throw lastError;
};

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    const result = await retry(() => 
      database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal('searchTerm', searchTerm),
      ])
    );

    if (result.documents.length > 0) {
      const doc = result.documents[0];

      await retry(() => 
        database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
          count: doc.count + 1,
        })
      );
    } else {
      const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Poster';

      await retry(() => 
        database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
          searchTerm,
          count: 1,
          movie_id: movie.id,
          poster_url: posterUrl,
        })
      );
    }
  } catch (error) {
    console.error("Error updating search count:", error);
    throw new Error("Failed to update search count. Please try again later.");
  }
};

export const getTrendingMovies = async () => {
  try {
    const result = await retry(() => 
      database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.limit(5),
        Query.orderDesc("count"),
      ])
    );

    return result.documents;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};
