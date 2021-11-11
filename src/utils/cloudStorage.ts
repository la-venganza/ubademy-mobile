import {
  ref, getStorage, uploadBytes, getDownloadURL,
} from 'firebase/storage';

const upload = async (file, mediaType) => {
  const filename = `${mediaType}/${Date.now().toString()}-${file.uri.split('/').pop()}`;
  const storage = getStorage();
  const storageRef = ref(storage, filename);
  const response = await fetch(file.uri);
  const blob = await response.blob();
  uploadBytes(storageRef, blob);
  return filename;
};

const downloadUrl = async (filename) => {
  const storage = getStorage();
  const url = await getDownloadURL(ref(storage, filename));
  return url;
};

export default { upload, downloadUrl };
