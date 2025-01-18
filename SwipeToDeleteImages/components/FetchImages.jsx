import * as MediaLibrary from 'expo-media-library';
var CurrentImageIndex = 0;

export async function FetchImagesFromGallery(status){
    console.log('FetchImagesFromGallery');
    console.log('CurrentImageIndex:', CurrentImageIndex);
    CurrentImageIndex += 1;
    try {


      let media = [];
      let hasNextPage = true;
      let after = null;
  
      while (hasNextPage) {
        const result = await MediaLibrary.getAssetsAsync({
          mediaType: 'photo',
          first: 100, // Fetch 100 assets at a time
          after: after,
        });
  
        media = media.concat(result.assets);
        hasNextPage = result.hasNextPage;
        after = result.endCursor;
      }

    } catch (error) {
      console.error('Error picking random image:', error);
    }   

    console.log('media:', media);
    return media[CurrentImageIndex];
    
}