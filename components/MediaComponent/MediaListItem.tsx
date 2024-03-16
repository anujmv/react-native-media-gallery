import {Image as RNImage, StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import {MediaContext, type Image} from '../Media';
import {Icon, MD2Colors} from 'react-native-paper';

const MediaListItem = ({image}: {image: Image}) => {
  const media = useContext(MediaContext);
  return (
    <View style={[styles.container]}>
      <View
        style={[
          media?.selectedImagesIndex.includes(image.id)
            ? styles.backgroundOverlay
            : styles.hide,
        ]}>
        <Icon source="check" color={MD2Colors.white} size={30} />
      </View>
      <RNImage style={styles.tinyLogo} source={{uri: image.thumbnailUrl}} />
    </View>
  );
};

export default MediaListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundOverlay: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    width: 90,
    height: 90,
    backgroundColor: 'rgba(20, 205, 200, 0.5)',
    zIndex: 10,
  },
  hide: {
    display: 'none',
  },
  tinyLogo: {
    width: 90,
    height: 90,
  },
});
