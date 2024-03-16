import React, {useContext, useRef} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Image as RNImage,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {IconButton, MD2Colors} from 'react-native-paper';
import MediaList from './MediaList';
import {
  Image,
  MediaActionTypes,
  MediaContext,
  MediaDispatchContext,
} from '../Media';
import VideoPlayer from 'react-native-video-player';

interface MediaViewerProps {
  images: Image[];
  isVisible: boolean;
  onClose: () => void;
}

type MediaList = {
  scrollToIndex: (index: number) => void;
};

const MediaViewer: React.FC<MediaViewerProps> = ({
  images,
  isVisible,
  onClose,
}) => {
  const media = useContext(MediaContext);
  const dispatch = useContext(MediaDispatchContext);
  const mediaRef = useRef<MediaList>(null);

  const handleOnChange = (i: number) => {
    if (dispatch) {
      dispatch({type: MediaActionTypes.SelectedImage, id: i});
    }
    scrollToIndex(i);
  };

  const scrollToIndex = (index: number) => {
    if (mediaRef.current) {
      mediaRef.current?.scrollToIndex(index);
    }
  };

  return (
    <Modal visible={isVisible} transparent={true} onRequestClose={onClose}>
      <ImageViewer
        imageUrls={images}
        index={media?.selectedImage?.id}
        enableSwipeDown={true}
        onSwipeDown={onClose}
        onChange={(i: number | undefined) => handleOnChange(i || 0)}
        footerContainerStyle={styles.footerContainer}
        renderImage={props =>
          media?.selectedImage?.type === 'video' ? (
            <>
              <View style={styles.videoContainer}>
                <View style={styles.videoWrapper}>
                  <VideoPlayer
                    video={{
                      uri: media.selectedImage?.videoUrl,
                    }}
                    autoplay={false}
                    thumbnail={{uri: media.selectedImage?.thumbnailUrl}}
                  />
                </View>
              </View>
            </>
          ) : (
            <RNImage {...props} />
          )
        }
        renderFooter={() => (
          <View>
            <MediaList ref={mediaRef} />
            <TouchableOpacity onPress={onClose}>
              <View style={styles.buttonGroup}>
                <IconButton
                  icon="close"
                  iconColor={MD2Colors.black}
                  mode="contained"
                  size={30}
                  onPress={() => onClose()}
                />
                <IconButton
                  icon="trash-can-outline"
                  iconColor={MD2Colors.black}
                  mode="contained"
                  size={30}
                  onPress={() => onClose()}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  videoWrapper: {position: 'absolute', width: '100%'},
});

export default MediaViewer;
