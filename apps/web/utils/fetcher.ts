export const fetcher = async (url: string): Promise<unknown> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("An error occurred while fetching the data");
  }

  return response.json();
};
