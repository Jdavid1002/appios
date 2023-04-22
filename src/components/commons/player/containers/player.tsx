import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import Video from 'react-native-video';
// import VideoPlayer from 'react-native-video-controls';

import {PlayerStyles as styles} from 'app_components/commons/player';

class Player extends Component<any, any> {
  player: any = null;
  state = {
    loading: true,
  };

  constructor(props: any) {
    super(props);
  }

  onBuffer = ({isBuffering}) => {
    this.setState({
      loading: isBuffering,
    });
  };

  onLoad = () => {
    this.setState({
      loading: false,
    });
  };

  onEnd = () => {};
  videoError = () => {};

  render = () => {
    return (
      <View style={styles.container}>
        <Video
          source={{
            uri: this.props.link,
          }}
          ref={(ref: any) => {
            this.player = ref;
          }} // Store reference
          style={styles.backgroundVideo}
          resizeMode="contain"
          controls={true}
          // fullscreen={true}
          onBuffer={this.onBuffer}
          onEnd={this.onEnd}
          onLoad={this.onLoad}
          onError={this.videoError}
        />
        {this.state.loading && (
          <View style={styles.overlay}>
            <ActivityIndicator color="white" />
          </View>
        )}
      </View>
    );
  };
}

export default Player;
