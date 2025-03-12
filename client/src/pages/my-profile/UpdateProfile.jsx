import { useState, useRef, useEffect } from "react";
import { User, Camera, Mail, Phone } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  updateProfile,
  getSingleDetail,
  uploadAvatar,
  logoutUser,
} from "@/store/auth-slice/user";
import { useNavigate } from "react-router-dom";
import { showJewelryToast } from "../extras/showJewelryToast";
import Breadcrumb from "../extras/Breadcrub";
import MetaData from "../extras/MetaData";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(
    user?.avatar || "https://placehold.co/150x150"
  );
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });

  useEffect(() => {
    dispatch(getSingleDetail());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
        avatar: user.avatar || null,
      });
      if (user.avatar) setProfileImage(user.avatar);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showJewelryToast("File size should be less than 5MB", "error");
        return;
      }
      if (!file.type.startsWith("image/")) {
        showJewelryToast("Please upload an image file", "error");
        return;
      }
      dispatch(uploadAvatar(file))
        .unwrap()
        .then(() => {
          showJewelryToast("Avatar updated successfully!", "success");
          navigate("/my-profile");
        })
        .catch((error) => {
          showJewelryToast(error || "Failed to update avatar", "error");
        });
    }
  };

  const handleImageClick = () => fileInputRef.current.click();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    if (!formData.name || !formData.email || !formData.mobile) {
      showJewelryToast("All fields are required", "error");
      return;
    }
    if (formData.mobile.length !== 10) {
      showJewelryToast("Mobile number must be 10 digits", "error");
      return;
    }

    Object.keys(formData).forEach((key) =>
      formDataToSend.append(key, formData[key])
    );
    if (formData.avatar) formDataToSend.append("avatar", formData.avatar);

    dispatch(updateProfile(formDataToSend))
      .unwrap()
      .then(() => {
        showJewelryToast(
          "Profile updated successfully. Please re-login.",
          "success"
        );
        dispatch(logoutUser());
        navigate("/login");
      })
      .catch((error) =>
        showJewelryToast(error.message || "Failed to update profile", "error")
      );
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "My Account", href: "/my-profile" },
    { label: "Update Profile" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10 bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950 text-amber-800 dark:text-amber-300">
      <MetaData title="Update Profile | Nandani Jewellers" />
      <motion.div
        className="w-full max-w-lg p-8 bg-white dark:bg-slate-950 backdrop-blur-lg rounded-3xl shadow-lg border border-amber-300 dark:border-amber-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Breadcrumb items={breadcrumbItems} />
        <h2 className="text-3xl font-bold text-center mb-6">Update Profile</h2>

        <div className="flex justify-center mb-6">
          <div className="relative w-28 h-28">
            <motion.img
              src={profileImage}
              alt="Profile"
              className="w-28 h-28 object-fit rounded-full border-4 border-amber-500 shadow-md"
              whileHover={{ scale: 1.05 }}
            />
            <button
              className="absolute bottom-0 right-0 bg-amber-600 text-white p-2 rounded-full shadow-md hover:bg-amber-700 transition-all"
              onClick={handleImageClick}
            >
              <Camera size={18} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            {
              name: "name",
              placeholder: "Full Name",
              icon: <User size={20} />,
            },
            { name: "email", placeholder: "Email", icon: <Mail size={20} /> },
            {
              name: "mobile",
              placeholder: "Mobile",
              icon: <Phone size={20} />,
            },
          ].map(({ name, placeholder, icon }, idx) => (
            <motion.div
              key={name}
              className="relative"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
              <input
                type={name === "email" ? "email" : "text"}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full px-5 py-3 pl-12 bg-white/30 dark:bg-slate-800 border border-amber-400 dark:border-amber-700 rounded-xl text-lg placeholder:text-amber-600 dark:placeholder:text-amber-400 focus:ring-2 focus:ring-amber-500 transition-all"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 dark:text-amber-400">
                {icon}
              </span>
            </motion.div>
          ))}

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white text-lg font-semibold rounded-xl shadow-lg transform active:scale-95 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? "Updating..." : "Update Profile"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateProfile;
