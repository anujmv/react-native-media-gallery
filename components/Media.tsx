import {View} from 'react-native';
import React, {createContext, useReducer, useRef} from 'react';

import MediaList from './MediaComponent/MediaList';

import MediaDialog from './MediaComponent/MediaDialog';

const initialMediaState = {
  images: [
    {
      id: 0,
      url: 'https://picsum.photos/id/237/500/1000',
      thumbnailUrl: 'https://picsum.photos/id/237/800/500',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      type: 'video',
    },
    {
      id: 1,
      url: 'https://picsum.photos/id/238/500/1000',
      thumbnailUrl: 'https://picsum.photos/id/238/90/90',
    },
    {
      id: 2,
      url: 'https://picsum.photos/id/239/500/1000',
      thumbnailUrl: 'https://picsum.photos/id/239/90/90',
    },
    // Add more images here
    {
      id: 3,
      url: 'https://picsum.photos/id/240/500/1000',
      thumbnailUrl: 'https://picsum.photos/id/240/90/90',
    },
    {
      id: 4,
      url: 'https://picsum.photos/id/241/500/1000',
      thumbnailUrl: 'https://picsum.photos/id/241/90/90',
    },
    {
      id: 5,
      url: 'https://picsum.photos/id/242/500/1000',
      thumbnailUrl: 'https://picsum.photos/id/242/90/90',
    },
    {
      id: 6,
      url: 'https://picsum.photos/id/243/500/1000',
      thumbnailUrl: 'https://picsum.photos/id/243/90/90',
    },
    {
      id: 7,
      url: 'https://picsum.photos/id/244/500/1000',
      thumbnailUrl: 'https://picsum.photos/id/244/90/90',
    },
  ],
  selectedImage: null,
  mediaViewerVisible: false,
  selectedImagesIndex: [],
};

export const MediaContext = createContext<MediaState | null>(null);
export const MediaDispatchContext =
  createContext<React.Dispatch<MediaAction> | null>(null);

export type Image = {
  id: number;
  url: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  type?: string;
};

type MediaState = {
  images: Image[];
  selectedImage?: Image | null;
  selectedImagesIndex: number[];
  mediaViewerVisible: boolean;
};

export enum MediaActionTypes {
  Added = 'added',
  SelectedImage = 'selectedImage',
  OpenMediaViewer = 'openMediaViewer',
  CloseMediaViewer = 'closeMediaViewer',
  Removed = 'removed',
  Updated = 'updated',
  SelectedImages = 'selectedImages',
}

type MediaAction = {
  type: MediaActionTypes;
  id?: number;
  url?: string;
  mediaViewerVisible?: boolean;
};

function mediaReducer(state: MediaState, action: MediaAction) {
  switch (action.type) {
    case MediaActionTypes.SelectedImage: {
      console.log('Selected image: ' + action.id);
      return {
        ...state,
        selectedImage: state.images.find(
          (item: Image) => item.id === action.id,
        ),
      };
    }

    case MediaActionTypes.SelectedImages: {
      return {
        ...state,
        selectedImagesIndex: state.selectedImagesIndex.includes(action.id || 0)
          ? state.selectedImagesIndex.filter(
              index => index !== (action.id || 0),
            )
          : [...state.selectedImagesIndex, action.id || 0],
      };
    }

    case MediaActionTypes.OpenMediaViewer: {
      return {
        ...state,
        mediaViewerVisible: true,
      };
    }

    case MediaActionTypes.CloseMediaViewer: {
      return {
        ...state,
        mediaViewerVisible: false,
      };
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const Media = () => {
  const [media, dispatch] = useReducer(mediaReducer, initialMediaState);
  console.log(media.selectedImage);
  const mediaRef = useRef(null);

  // const scrollToIndex = index => {
  //   if (mediaRef.current) {
  //     mediaRef.current.scrollToIndex(index || 0);
  //   }
  // };

  // useEffect(() => {
  //   if (media.selectedImage?.id) scrollToIndex(media.selectedImage?.id);
  // }, [media.selectedImage?.id]);

  return (
    <View>
      <MediaContext.Provider value={media}>
        <MediaDispatchContext.Provider value={dispatch}>
          <MediaList ref={mediaRef} />
          <MediaDialog />
        </MediaDispatchContext.Provider>
      </MediaContext.Provider>
    </View>
  );
};

export default Media;
