import React, { useEffect, useState } from 'react';
import {
  View,
  SectionList,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchImages,
  incrementPage,
} from '../redux/slices/imageSlice';
import {
  toggleFavorite,
  loadFavoritesFromStorage,
} from '../redux/slices/favouriteSlice';
import ImageCard from '../components/ImageCard';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data: images, status, page } = useSelector((state) => state.images);
  const { favorites } = useSelector((state) => state.favorites);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      await dispatch(loadFavoritesFromStorage());
      dispatch(fetchImages(page));
    };
    loadData();
  }, []);

  const handleToggleFavorite = (image) => {
    dispatch(toggleFavorite(image));
  };

  const isFavorite = (id) => {
    return favorites.some((fav) => fav.id.toString() === id.toString());
  };

  // Filter images based on search query (by author or ID)
  const filteredImages = images.filter((image) => {
    const query = searchQuery.toLowerCase();
    return (
      image.author.toLowerCase().includes(query) ||
      image.id.toString().includes(query)
    );
  });

  // Group filtered images by author for sections
  const groupByAuthor = () => {
    const groups = filteredImages.reduce((acc, image) => {
      const author = image.author || 'Unknown';
      if (!acc[author]) {
        acc[author] = [];
      }
      acc[author].push(image);
      return acc;
    }, {});

    return Object.keys(groups).map((author) => ({
      title: author,
      data: groups[author],
    }));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.favoritesButton}
        onPress={() => navigation.navigate('Favorites')}
      >
        <Text style={styles.favoritesButtonText}>❤️ View Favorites</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Search by author or ID..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        style={styles.searchInput}
        placeholderTextColor="#888"
      />

      <SectionList
        sections={groupByAuthor()}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <ImageCard
            image={item}
            isFavorite={isFavorite(item.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        onEndReached={() => {
          dispatch(incrementPage());
          dispatch(fetchImages(page + 1));
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={status === 'loading' && <ActivityIndicator size="large" color="#1e90ff" />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {searchQuery ? '🔍 No images found.' : '⏳ Loading images...'}
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  favoritesButton: {
    backgroundColor: '#ff6b81',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  favoritesButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  searchInput: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    padding: 10,
    backgroundColor: '#1e90ff',
    borderRadius: 5,
    marginBottom: 5,
  },
  sectionHeaderText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
});

export default HomeScreen;
