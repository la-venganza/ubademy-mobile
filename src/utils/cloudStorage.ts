import { utils } from '@react-native-firebase/app';
// import storage from '@react-native-firebase/storage';
// import { ref, StorageReference} from 'firebase/storage';
import {
  ref, getStorage, uploadBytes, getDownloadURL,
} from 'firebase/storage';

const upload = async (file) => {
  const filename = file.name + Date.now();
  const storage = getStorage();
  const storageRef = ref(storage, filename);
  const snapshot = uploadBytes(storageRef, file);
  return filename;
};

const downloadUrl = async (filename) => {
  const storage = getStorage();
  const url = await getDownloadURL(ref(storage, filename));
  return url;
};

export default { upload, downloadUrl };
