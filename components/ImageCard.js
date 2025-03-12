import { Image } from 'expo-image';
import {View,Text,TouchableOpacity} from 'react-native'
const ImageCard = ({ image, isFavorite, onToggleFavorite }) => (
  <View style={{ marginBottom: 10 }}>

<Image
  source={{
    uri: image.download_url,
  }}
  style={{ width: '100%', height: 200 }}
  contentFit="cover"
  cachePolicy="disk" // Ensure disk caching
  onLoad={() => console.log(`Image loaded (possibly from cache): ${image.download_url}`)}
  onError={() => console.log(`Failed to load: ${image.download_url}`)}
/>

    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text>{image.author}</Text>
      <TouchableOpacity onPress={() => onToggleFavorite(image)}>
        <Text style={{ color: isFavorite ? 'red' : 'gray', fontSize: 24 }}>
          {isFavorite ? '❤️' : '🤍'}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default ImageCard;