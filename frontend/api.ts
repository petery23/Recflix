const API_URL = "http://localhost:3001";

export interface Movie {
    title: string;
    genres: string[];
    rating: number;
    length: number;
    year: number;
    region: string;
    score: number;
}


export const searchMovies = async (query: string): Promise<string[]> => {
    try {
        const response = await fetch(`${API_URL}/search`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({search_query: query}),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error searching movies:", error);
        throw error;
    }
};

export const getRecommendations = async (title: string): Promise<Movie[]> => {
    try {
        const response = await fetch(`${API_URL}/recommend`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ target_title: title }),
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Movie[] = await response.json();
        return data;
        } catch (error) {
            console.error("Error fetching recommendations:", error);
            throw error;
        }
};

