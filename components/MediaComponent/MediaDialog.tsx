import {View} from 'react-native';
import React, {useContext} from 'react';

import MediaViewer from './MediaViewer';
import {MediaActionTypes, MediaContext, MediaDispatchContext} from '../Media';

const MediaDialog = () => {
  const media = useContext(MediaContext);
  const dispatch = useContext(MediaDispatchContext);

  const handleClose = () => {
    if (dispatch) {
      dispatch({type: MediaActionTypes.CloseMediaViewer});
    }
  };

  return (
    <View>
      <MediaViewer
        images={media?.images || []}
        isVisible={media?.mediaViewerVisible || false}
        onClose={() => handleClose()}
      />
    </View>
  );
};

export default MediaDialog;
