const API_URL = "http://localhost:3001/recommendations";

export interface Movie {
    title: string; 
    genres: string[];
    rating: number;
    length: number;
    year: number;
    score: number;
}

export const getRecommendations = async (prefs: any): Promise<Movie[]> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(prefs),
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

