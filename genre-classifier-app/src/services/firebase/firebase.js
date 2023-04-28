import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getBlob,
} from "firebase/storage";
import { storage } from "../../../firebase.config";

const uploadFile = async (
  file,
  onUploadProgress,
  onUploadComplete,
  onError
) => {
  const storagePath = `audio/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, storagePath);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onUploadProgress(progress);
    },
    (error) => {
      onError(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        onUploadComplete({
          fileUrl: downloadURL,
          storagePath,
        });
      });
    }
  );
};

const downloadFile = async (storagePath) => {
  const storageRef = ref(storage, storagePath);
  const blob = await getBlob(storageRef);
  return blob;
};

const firebaseService = {
  uploadFile,
  downloadFile,
};

export default firebaseService;
