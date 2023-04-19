import React from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { RunwayCardStyles as styles } from 'app_components/modules/tips';

function RunwayCard(props: any) {
  const { image_path, onPress } = props.content;

  const [loading, setLoading] = React.useState(false);

  console.log(image_path)

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: image_path }}
          style={styles.image}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          resizeMode="cover"
          blurRadius={20}
        >
          <ImageBackground
            source={{ uri: image_path }}
            style={styles.image}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            resizeMode="contain"
          >
            {loading && <ActivityIndicator />}
          </ImageBackground>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}

export default RunwayCard;
