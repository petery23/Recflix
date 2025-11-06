import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { Movie } from '@/api';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState<number>();
  const [algorithm, setAlgorithm] = useState<string>();
  const router = useRouter();

  const handleGetRecommendations = () => {
    setLoading(true);
    setTimeout(() => {
      const dummyMovies: Movie[] = [
        {title: 'Movie 1', year: 2020, rating: 7.5, genres: ['Action', 'Adventure'], length: 120, score: 100},
        {title: 'Movie 2', year: 2021, rating: 8.0, genres: ['Drama', 'Romance'], length: 120, score: 100},
        {title: 'Movie 3', year: 2022, rating: 8.5, genres: ['Sci-Fi', 'Thriller'], length: 120, score: 100},
        {title: 'Movie 4', year: 2023, rating: 9.0, genres: ['Comedy', 'Drama'], length: 120, score: 100},
        {title: 'Movie 5', year: 2024, rating: 9.5, genres: ['Action', 'Adventure'], length: 120, score: 100},
      ];
      
      router.push({
        pathname: "/results",
        params: { movies: JSON.stringify(dummyMovies) },
      });
      setLoading(false);
    }, 500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundShape} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Recflix</Text>
        <TextInput 
          style={styles.input}
          placeholder="Genre (e.g. Action, Drama, Comedy)"
          value={genre}
          onChangeText={setGenre}
        />
        <TextInput
          style={styles.input}
          placeholder="Year (e.g. 2020)"
          value={year?.toString()}
          onChangeText={(text) => setYear(parseInt(text) || 0)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Algorithm (e.g. quick, merge)"
          value={algorithm}
          onChangeText={setAlgorithm}
        />
        {loading ? (
          <ActivityIndicator style={{ marginTop: 10 }} size="large" color="red" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleGetRecommendations}>
            <Text style={styles.buttonText}>Get Recommendations</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  backgroundShape:{
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '50%',
    backgroundColor: 'black',
    borderColor: 'red', 
    borderWidth: 10,
    borderRadius: 1000,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1, 
    paddingTop: 50, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'red',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white',
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 20,
    width: '40%',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});