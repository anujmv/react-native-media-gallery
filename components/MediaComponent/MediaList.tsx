import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from 'react';
import MediaListItem from './MediaListItem';
import {
  Image,
  MediaActionTypes,
  MediaContext,
  MediaDispatchContext,
} from '../Media';

const MediaList = forwardRef((props, ref) => {
  const dispatch = useContext(MediaDispatchContext);
  const media = useContext(MediaContext);
  const handleSelectedImages = (image: Image) => {
    if (dispatch) {
      dispatch({
        type: MediaActionTypes.SelectedImages,
        id: image.id,
      });
    }
  };
  const handleSelectedImage = (image: Image) => {
    if (dispatch) {
      dispatch({
        type: MediaActionTypes.SelectedImage,
        id: image.id,
      });
      //open media viewer if not open
      if (!media?.mediaViewerVisible) {
        dispatch({
          type: MediaActionTypes.OpenMediaViewer,
        });
      }
    }
    scrollToIndex(image.id);
  };
  const flatListRef = useRef<FlatList>(null);
  const scrollToIndex = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    }
  };

  useImperativeHandle(ref, () => ({
    scrollToIndex: (index: number) => scrollToIndex(index),
  }));

  return (
    <FlatList
      ref={flatListRef}
      data={media?.images}
      horizontal
      renderItem={({item}) => (
        <View
          style={[
            styles.imageBox,
            media?.selectedImage?.id === item.id
              ? styles.imageBoxSelected
              : null,
          ]}
          key={item.id}>
          <TouchableOpacity
            onPress={() => handleSelectedImage(item)}
            onLongPress={() => handleSelectedImages(item)}>
            <MediaListItem image={item} />
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={item => item.id}
      // onViewableItemsChanged={handleViewableItemsChanged}
      viewabilityConfig={{itemVisiblePercentThreshold: 50}}
    />
  );
});

export default MediaList;

const styles = StyleSheet.create({
  imageBox: {
    marginLeft: 10,
    marginRight: 10,
  },
  imageBoxSelected: {
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 2,
  },
});
