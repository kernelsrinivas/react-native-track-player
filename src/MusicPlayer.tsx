import React, { useCallback, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import TrackPlayer from './internals';
//import TrackPlayer, { TrackPlayerEvents, STATE_PLAYING } from './internals';

interface Props {
  trackId: string;
  trackName: string;
  trackArtist: string;
  url: string;
  image: string;
}

const MusicPlayer = (props:Props): React.ReactNode => {
  
  useEffect(() => {
    setupPlayer();
    return () => TrackPlayer.destroy();
  }, [props.url]);

  const setupPlayer = useCallback(async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add({
      id: props.trackId,
      url: props.url,
      title: 'Your Audio Track Title',
      artist: 'Your Artist Name',
    });
    // TrackPlayer.addEventListener(TrackPlayerEvents.PLAYBACK_STATE, ({ state }) => {
    //   if (state === STATE_PLAYING) {
    //     console.log('Track is playing');
    //   }
    // });
  }, [props]);

  const playTrack = async () => {
    await TrackPlayer.play();
  };

  const pauseTrack = async () => {
    await TrackPlayer.pause();
  };

  return (
    <View style={styles.container}>
      <View style={styles.albumArtContainer}>
        <Image source={props.image} style={styles.albumArt} />
      </View>
      <Text style={styles.trackTitle}>{props.trackName}</Text>
      <Text style={styles.artist}>{props.trackArtist}</Text>
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlButtonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={playTrack}>
          <Text style={styles.controlButtonText}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={pauseTrack}>
          <Text style={styles.controlButtonText}>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumArtContainer: {
    marginBottom: 20,
  },
  albumArt: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  trackTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  artist: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  controlButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  controlButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MusicPlayer;
