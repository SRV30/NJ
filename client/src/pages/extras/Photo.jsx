import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPhotos } from "@/store/extra/photoSlice";
import Loader from "../extras/Loader";
import MetaData from "../extras/MetaData";

const Photo = () => {
  const dispatch = useDispatch();
  const { photos, loading, error } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(fetchAllPhotos());
  }, [dispatch]);

  return (
    <>
      <MetaData title="Photo Gallery" description="View all uploaded photos" />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Photo Gallery ({photos.length}){" "}
        </h1>

        {loading && <Loader />}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {photos && photos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2">
            {photos.map((photo) => (
              <div
                key={photo._id}
                className="border border-amber-200/40 dark:border-gray-700/40 rounded-xl shadow-lg overflow-hidden group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-white dark:bg-gray-900"
              >
                <a href={photo.url} target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden aspect-square sm:aspect-[4/3] md:aspect-video lg:aspect-square">
                  <img
                    src={photo.url}
                    alt="Gallery"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </a>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p className="text-center">No photos available</p>
        )}
      </div>
    </>
  );
};

export default Photo;
