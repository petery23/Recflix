import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Movie } from '@/api';

export default function ResultsScreen() {
  const params = useLocalSearchParams();
  const { movies: moviesString } = params;

  let movies: Movie[] = [];
  try {
    if (typeof moviesString === 'string') {
      movies = JSON.parse(moviesString);
    }
  } catch (e) {
    console.error("Failed to parse movies data:", e);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Recommendations', headerBackTitle: 'Back', headerTintColor: 'white', headerStyle: { backgroundColor: 'black' } }} />
      
      <FlatList
        data={movies}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <View style={styles.movieInfo}>
              <Text style={styles.movieTitle}>{item.title} ({item.year})</Text>
              <Text style={styles.movieDetails}>Genres: {item.genres.join(', ')}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.title}
        ListHeaderComponent={<Text style={styles.headerText}>Top Matches</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
  list: {
    width: '100%',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  movieItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  movieInfo: {
    flex: 1,
    marginRight: 10,
  },
  movieTitle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
    marginBottom: 4,
  },
  movieDetails: {
    color: '#8E8E93',
    fontSize: 12,
  },
  ratingContainer: {
    backgroundColor: 'red',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ratingText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});