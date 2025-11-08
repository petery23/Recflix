import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Movie } from '@/api';

export default function ResultsScreen() {
  const params = useLocalSearchParams();
  const { 
    movies: moviesString, 
    sortTime, 
    algorithm, 
    otherSortTime, 
    otherAlgorithm 
  } = params;

  let movies: Movie[] = [];
  let sortTimeMs = 0;
  let algorithmName = 'Merge Sort';
  let otherSortTimeMs = 0;
  let otherAlgorithmName = 'Quick Sort';
  
  try {
    if (typeof moviesString === 'string') {
      movies = JSON.parse(moviesString);
    }
    
    if (typeof sortTime === 'string') {
      sortTimeMs = parseFloat(sortTime) * 1000;
    }
    
    if (typeof algorithm === 'string') {
      if (algorithm === 'quick') {
        algorithmName = 'Quick Sort';
      } else {
        algorithmName = 'Merge Sort';
      }
    }
    
    if (typeof otherSortTime === 'string') {
      otherSortTimeMs = parseFloat(otherSortTime) * 1000;
    }
    
    if (typeof otherAlgorithm === 'string') {
      if (otherAlgorithm === 'quick') {
        otherAlgorithmName = 'Quick Sort';
      } else {
        otherAlgorithmName = 'Merge Sort';
      }
    }
  } catch (e) {
    console.error("Failed to parse movies data:", e);
  }

  const formatTime = (ms: number): string => {
    if (ms < 1) {
      const microseconds = ms * 1000;
      return `${microseconds.toFixed(2)} µs`;
    } else if (ms < 1000) {
      return `${ms.toFixed(2)} ms`;
    } else {
      const seconds = ms / 1000;
      return `${seconds.toFixed(2)} s`;
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Recommendations', 
          headerBackTitle: 'Back', 
          headerTintColor: 'white', 
          headerStyle: { backgroundColor: 'black' } 
        }} 
      />
      
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
        ListHeaderComponent={
          <View>
            <Text style={styles.headerText}>Top Matches</Text>
            <View style={styles.timeContainer}>
              <Text style={styles.timeLabel}>Selected Algorithm: {algorithmName}</Text>
              <Text style={styles.timeValue}>Sort Time: {formatTime(sortTimeMs)}</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeLabel}>Comparison: {otherAlgorithmName}</Text>
              <Text style={styles.timeValue}>Sort Time: {formatTime(otherSortTimeMs)}</Text>
            </View>
          </View>
        }
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
    marginTop: 20,
    marginBottom: 10,
  },
  timeContainer: {
    backgroundColor: '#1C1C1E',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  timeLabel: {
    color: '#8E8E93',
    fontSize: 14,
    marginBottom: 5,
  },
  timeValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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