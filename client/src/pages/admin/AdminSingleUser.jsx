import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  deleteUser,
  getSingleUser,
  updateUserRole,
  updateUserStatus,
} from "@/store/auth-slice/user";
import ConfirmationModal from "../extras/ConfirmationModel";
import { ArrowLeft, Delete, Edit, Copy } from "lucide-react";
import { Update } from "@mui/icons-material";
import PropTypes from "prop-types";
import { showJewelryToast } from "../extras/showJewelryToast";
import MetaData from "../extras/MetaData";
import Loader from "../extras/Loader";

const AdminSingleUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { singleUser, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getSingleUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleUser) {
      setSelectedStatus(singleUser.status);
      setSelectedRole(singleUser.role);
    }
  }, [singleUser]);

  const handleStatusChange = async () => {
    try {
      await dispatch(updateUserStatus({ userId: id, status: selectedStatus }));
      showJewelryToast("Status updated successfully", "success");
    } catch (err) {
      showJewelryToast(err || "Failed to update status", "error");
    }
  };

  const handleRoleChange = async () => {
    try {
      await dispatch(
        updateUserRole({ email: singleUser.email, role: selectedRole })
      );
      showJewelryToast("Role updated successfully", "success");
    } catch (error) {
      showJewelryToast(error || "Failed to update role", "error");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteUser(id));
      showJewelryToast("User deleted successfully", "success");
      navigate("/admin/dashboard");
    } catch (error) {
      showJewelryToast(error?.message || "Failed to delete user", "error");
    } finally {
      setShowDeleteModal(false);
    }
  };

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl text-red-500 max-w-md mx-auto border border-red-200 dark:border-red-800"
        >
          <h3 className="font-semibold mb-2">Error Occurred</h3>
          <p>{error}</p>
        </motion.div>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950 p-4 md:p-8"
    >
      <MetaData title="User Details" />

      <div className="max-w-4xl mx-auto">
        <motion.button
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-amber-800 dark:text-amber-300 mb-8 font-medium group"
        >
          <ArrowLeft className="transition-transform duration-300 group-hover:scale-110" />
          <span>Back to Users</span>
        </motion.button>

        {singleUser && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-200 to-amber-100 dark:from-amber-900 dark:to-amber-950 rounded-bl-full opacity-30" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-200 to-amber-100 dark:from-amber-900 dark:to-amber-950 rounded-tr-full opacity-30" />

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-100 dark:border-amber-800 pb-4">
                    <motion.h1
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="text-3xl font-bold text-amber-800 dark:text-amber-300 mb-4 sm:mb-0"
                    >
                      {singleUser.name}
                    </motion.h1>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowDeleteModal(true)}
                      className="relative px-5 py-2.5 rounded-full bg-red-500 text-white font-medium flex items-center gap-2 transition-all duration-300 ease-in-out hover:bg-red-600 hover:shadow-lg"
                    >
                      <span className="tracking-wide">Delete User</span>
                      <Delete size={18} />
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <DetailItem
                      label="Email"
                      value={singleUser.email}
                      icon={
                        <motion.div
                          animate={{ y: [0, -2, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-1.5 h-1.5 rounded-full bg-amber-400 dark:bg-amber-600 mr-2"
                        />
                      }
                    />

                    <DetailItem
                      label="User ID"
                      value={singleUser._id}
                      copyable
                      icon={
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 3 }}
                          className="w-1.5 h-1.5 rounded-full bg-amber-400 dark:bg-amber-600 mr-2"
                        />
                      }
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="flex items-center gap-2 text-sm font-medium text-amber-800 dark:text-amber-300">
                          <motion.div
                            animate={{ rotate: [0, 180, 360] }}
                            transition={{
                              repeat: Infinity,
                              duration: 5,
                              ease: "linear",
                            }}
                          >
                            <div className="w-2 h-2 bg-amber-500 dark:bg-amber-500 rounded-full" />
                          </motion.div>
                          Status
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full p-3 rounded-lg border border-amber-200 dark:border-amber-800 bg-transparent text-amber-800 dark:text-amber-300 focus:ring-2 focus:ring-amber-500 outline-none appearance-none"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d97706'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 10px center",
                              backgroundSize: "20px",
                            }}
                          >
                            <option value="Active">Active</option>
                            <option value="Warning">Warning</option>
                            <option value="Suspended">Suspended</option>
                          </select>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleStatusChange}
                            className="relative sm:flex-shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-400 dark:from-amber-600 dark:to-amber-500 text-white font-semibold shadow-md transition-all duration-300 ease-in-out hover:shadow-lg"
                          >
                            <span className="tracking-wide">Update</span>
                            <Update fontSize="small" />
                          </motion.button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="flex items-center gap-2 text-sm font-medium text-amber-800 dark:text-amber-300">
                          <motion.div
                            animate={{ rotate: [0, 180, 360] }}
                            transition={{
                              repeat: Infinity,
                              duration: 5,
                              ease: "linear",
                            }}
                          >
                            <div className="w-2 h-2 bg-amber-500 dark:bg-amber-500 rounded-full" />
                          </motion.div>
                          Role (Refresh the page after updating role)
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="w-full p-3 rounded-lg border border-amber-200 dark:border-amber-800 bg-transparent text-amber-800 dark:text-amber-300 focus:ring-2 focus:ring-amber-500 outline-none appearance-none"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d97706'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 10px center",
                              backgroundSize: "20px",
                            }}
                          >
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                            <option value="MANAGER">Main Admin</option>
                          </select>
                          <p>Only Main Admin can change role</p>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleRoleChange}
                            className="relative sm:flex-shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-400 dark:from-amber-600 dark:to-amber-500 text-white font-semibold shadow-md transition-all duration-300 ease-in-out hover:shadow-lg"
                          >
                            <span className="tracking-wide">Update</span>
                            <Edit size={18} />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    <DetailItem
                      label="Mobile"
                      value={singleUser.mobile || "N/A"}
                      icon={
                        <motion.div
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-1.5 h-1.5 rounded-full bg-amber-400 dark:bg-amber-600 mr-2"
                        />
                      }
                    />

                    <DetailItem
                      label="Registered At"
                      value={new Date(singleUser.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                      icon={
                        <motion.div
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                            delay: 1,
                          }}
                          className="w-1.5 h-1.5 rounded-full bg-amber-400 dark:bg-amber-600 mr-2"
                        />
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
      />
    </motion.div>
  );
};

const DetailItem = ({ label, value, copyable = false, icon }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-3 border-b border-amber-100 dark:border-amber-800/30"
    >
      <div className="flex justify-between items-center mb-1">
        <span className="flex items-center text-sm font-medium text-amber-700 dark:text-amber-400">
          {icon}
          {label}
        </span>
        {copyable && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCopy}
            className="text-amber-800 dark:text-amber-300 hover:text-amber-600 dark:hover:text-amber-500 text-sm flex items-center gap-1"
          >
            {copied ? "Copied!" : "Copy"}
            <Copy size={14} />
          </motion.button>
        )}
      </div>
      <p className="text-amber-800 dark:text-amber-300 font-medium break-all">
        {value}
      </p>
    </motion.div>
  );
};

DetailItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  copyable: PropTypes.bool,
  icon: PropTypes.node,
};

export default AdminSingleUser;
