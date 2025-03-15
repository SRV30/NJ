import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../extras/Loader";
import MetaData from "../extras/MetaData";
import { showJewelryToast } from "../extras/showJewelryToast";
import {
  uploadPhoto,
  deletePhoto,
  fetchAllPhotos,
} from "@/store/extra/photoSlice";
import ConfirmationModal from "../extras/ConfirmationModel";

const AdminPhoto = () => {
  const dispatch = useDispatch();
  const { photos, loading } = useSelector((state) => state.photo);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [deletePhotoId, setDeletePhotoId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllPhotos());
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [dispatch, preview]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      showJewelryToast("Please select a file to upload", "error");
      return;
    }
    await dispatch(uploadPhoto(selectedFile));
    dispatch(fetchAllPhotos());
    setSelectedFile(null);
    setPreview(null);
  };

  const confirmDelete = (photoId) => {
    setDeletePhotoId(photoId);
  };

  const handleDelete = () => {
    if (deletePhotoId) {
      dispatch(deletePhoto(deletePhotoId));
      setDeletePhotoId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-amber-100 dark:from-slate-950 dark:to-amber-950 text-amber-800 dark:text-amber-300">
      <MetaData
        title="Admin Photo Management"
        description="Manage gallery photos"
      />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Photo Gallery Management
        </h1>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-medium mb-4 border-b pb-2">
            Upload New Photo
          </h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-full md:w-2/3">
                <label className="block mb-2 font-medium">Select Image</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full border rounded p-1"
                />
              </div>
              <div className="w-full md:w-1/3 flex justify-center">
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-32 w-32 rounded"
                  />
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!selectedFile}
                className="bg-amber-600 text-white px-6 py-2 rounded"
              >
                Upload Photo
              </button>
            </div>
          </form>
        </div>

        {loading ? (
          <div className="flex justify-center my-12">
            <Loader />
          </div>
        ) : photos && photos.length > 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-medium mb-6 border-b pb-2">
              Gallery Photos ({photos.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {photos.map((photo) => (
                <div
                  key={photo._id}
                  className="group relative bg-amber-50 dark:bg-slate-800 rounded-lg shadow-md"
                >
                  <img
                    src={photo.url}
                    alt="Gallery"
                    className="w-full h-48 rounded"
                  />
                  <button
                    onClick={() => confirmDelete(photo._id)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 text-center">
            <p className="text-lg italic">No photos available in the gallery</p>
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={!!deletePhotoId}
        onClose={() => setDeletePhotoId(null)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this photo?"
      />
    </div>
  );
};

export default AdminPhoto;
