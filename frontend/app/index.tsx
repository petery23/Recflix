import React, { useState , useEffect} from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, TextInput , FlatList, Alert} from 'react-native';
import { searchMovies, getRecommendations } from '@/api';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (searchQuery.length < 3) {
      setSuggestions([]);
      return;
    };

    const handler = setTimeout(() => {
      const fetchSuggestions = async () => {
        try {
          const results = await searchMovies(searchQuery);
          if (results.length === 0) {
            setSuggestions(['No results found']);
          } else {
            setSuggestions(results);
          }
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        }
      };
      fetchSuggestions();
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const handleSelectMovie = async (title: string) => {
    if (!title || title === 'No results found') return;
    
    setLoading(true);
    setSuggestions([]);
    try {
      const recommendations = await getRecommendations(title);
      if(recommendations.length > 0){
        router.push({
          pathname: "/results",
          params: { movies: JSON.stringify(recommendations) },
        })
      }
      else{
        Alert.alert("No recommendations found", "Please try a different movie.");
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      Alert.alert("Error", "Failed to fetch recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const populateSearchBox = (title: string) => {
    setSearchQuery(title);
    setSuggestions([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundShape} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Recflix</Text>
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.input}
            placeholder="Search for a movie..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.submitButton} onPress={() => handleSelectMovie(searchQuery)}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator style={{ marginTop: 20 }} size="large" color="red" />
        ) : (
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              if (item === 'No results found') {
                return (
                  <View style={styles.suggestionItem}>
                    <Text style={styles.suggestionText}>{item}</Text>
                  </View>
                );
              }
              return (
                <TouchableOpacity style={styles.suggestionItem} onPress={() => populateSearchBox(item)}>
                  <Text style={styles.suggestionText}>{item}</Text>
                </TouchableOpacity>
              );
            }}
            style={styles.suggestionsContainer}
          />
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
    backgroundColor: 'red',
  },
  backgroundShape:{
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 1000,
  },
  contentContainer: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1, 
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'red',
  },
  input: {
    height: 40,
    flex: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 10,
    color: 'black',
    borderRadius: 8,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  suggestionsContainer: {
    width: '100%',
    maxHeight: 200,
    backgroundColor: 'white',
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ffebee',
  },
  suggestionText: {
    color: 'black',
  },
});