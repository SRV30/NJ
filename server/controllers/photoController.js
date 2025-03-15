import Photo from "../models/photoModel.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import { createNotification } from "../controllers/dashboardController.js";

export const uploadPhoto = catchAsyncErrors(async (req, res) => {
  try {
    const image = req.file;
    if (!image) {
      return res.status(400).json({
        message: "No image file provided",
        success: false,
      });
    }

    const upload = await uploadImage(image);
    if (!upload || !upload.url) {
      return res.status(500).json({
        message: "Image upload failed",
        success: false,
      });
    }

    let photoGallery = await Photo.findOne();
    if (!photoGallery) {
      photoGallery = new Photo({ images: [] });
    }

    photoGallery.images.push({
      public_id: upload.public_id,
      url: upload.url,
    });
    await photoGallery.save();

    await createNotification("New photo uploaded");
    return res.status(200).json({
      message: "Photo uploaded successfully",
      success: true,
      data: { public_id: upload.public_id, url: upload.url },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
});

export const deletePhoto = catchAsyncErrors(async (req, res) => {
  try {
    const photoId = req.params.id;

    const photoGallery = await Photo.findOne();
    if (!photoGallery) {
      return res.status(404).json({
        message: "Photo Gallery not found",
        success: false,
      });
    }

    const photoIndex = photoGallery.images.findIndex(
      (img) => img._id.toString() === photoId
    );
    if (photoIndex === -1) {
      return res.status(404).json({
        message: "Photo not found",
        success: false,
      });
    }

    const { public_id } = photoGallery.images[photoIndex];

    try {
      const cloudinaryResponse = await deleteImage(public_id);
    } catch (error) {
      console.log("Cloudinary deletion failed, continuing:", error.message);
    }

    photoGallery.images.splice(photoIndex, 1);
    await photoGallery.save();

    await createNotification("Photo deleted");

    return res.status(200).json({
      message: "Photo deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
});

export const getAllPhotos = catchAsyncErrors(async (req, res) => {
  const photoGallery = await Photo.findOne();

  const randomPhotos = photoGallery.images.sort(() => 0.5 - Math.random());
  return res.status(200).json({
    message: "Photos fetched successfully",
    success: true,
    data: randomPhotos,
  });
});
