import React from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ImageCard from '../components/ImageCard';
import { toggleFavorite } from '../redux/slices/favouriteSlice';

const FavoritesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favorites);

  const handleToggleFavorite = (image) => {
    dispatch(toggleFavorite(image));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>🔙 Go Back</Text>
      </TouchableOpacity>

      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>💔 No favorites yet. Go add some!</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ImageCard
              image={item}
              isFavorite={true}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  backButton: {
    backgroundColor: '#ff6b81',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 18,
    color: '#555',
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default FavoritesScreen;
