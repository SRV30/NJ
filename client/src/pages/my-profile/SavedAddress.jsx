import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  userAddress,
  updateUserAddress,
  deleteUserAddress,
  addUserAddress,
} from "@/store/address-slice/addressSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Country, State, City } from "country-state-city";
import {
  Trash,
  Edit,
  PlusCircle,
  MapPin,
  X,
  Home,
  AlertCircle,
} from "lucide-react";
import PropTypes from "prop-types";
import { showJewelryToast } from "../extras/showJewelryToast";
import MetaData from "../extras/MetaData";
import Breadcrumb from "../extras/Breadcrub";
import Loader from "../extras/Loader";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const modalVariants = {
  hidden: { opacity: 0, y: -40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 30 },
  },
  exit: { opacity: 0, y: -40, scale: 0.95, transition: { duration: 0.2 } },
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "My Account", href: "/my-profile" },
  { label: "Addresses" },
];

const InputField = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
}) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:outline-none ${
        error
          ? "border-red-500 bg-red-50 dark:bg-red-900/20"
          : "border-gray-300 dark:border-gray-600"
      }`}
    />
    {error && (
      <p className="mt-1 text-sm text-red-500 dark:text-red-400 flex items-center">
        <AlertCircle size={14} className="mr-1" /> {error}
      </p>
    )}
  </div>
);
InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

const SelectField = ({ label, name, value, onChange, options, error }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:outline-none ${
        error
          ? "border-red-500 bg-red-50 dark:bg-red-900/20"
          : "border-gray-300 dark:border-gray-600"
      }`}
    >
      <option value="">{`Select ${label}`}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && (
      <p className="mt-1 text-sm text-red-500 dark:text-red-400 flex items-center">
        <AlertCircle size={14} className="mr-1" /> {error}
      </p>
    )}
  </div>
);
SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  error: PropTypes.string,
};

const AddressCard = ({ address, onEdit, onDelete }) => (
  <motion.div
    key={address._id}
    className="flex flex-col md:flex-row justify-between items-start md:items-center p-5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200"
    variants={itemVariants}
  >
    <div className="flex items-start space-x-3 mb-3 md:mb-0">
      <div className="mt-1">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
          <Home size={16} />
        </div>
      </div>
      <div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          {address.address_line}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {address.city}, {address.state}, {address.pincode}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Phone: {address.mobile}
        </p>
      </div>
    </div>
    <div className="flex space-x-2 w-full md:w-auto">
      <motion.button
        onClick={() => onEdit(address)}
        className="flex-1 md:flex-initial flex items-center justify-center space-x-1 py-2 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Edit size={16} />
        <span className="text-sm">Edit</span>
      </motion.button>
      <motion.button
        onClick={() => onDelete(address._id)}
        className="flex-1 md:flex-initial flex items-center justify-center space-x-1 py-2 px-4 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Trash size={16} />
        <span className="text-sm">Delete</span>
      </motion.button>
    </div>
  </motion.div>
);
AddressCard.propTypes = {
  address: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    address_line: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    pincode: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const SavedAddress = () => {
  const dispatch = useDispatch();
  const { address, loading, error } = useSelector((state) => state.address);
  const [editData, setEditData] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({
    // address_line: "",
    // city: "",
    // state: "",
    // pincode: "",
    mobile: "",
    // country: "IN",
  });
  const [formErrors, setFormErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    dispatch(userAddress());
    setCountries(Country.getAllCountries());
    setStates(State.getStatesOfCountry("IN"));
  }, [dispatch]);

  useEffect(() => {
    if (formData.state) {
      setCities(City.getCitiesOfState("IN", formData.state));
    }
  }, [formData.state]);

  const validateForm = () => {
    const errors = {};
    // if (!formData.address_line.trim())
    //   errors.address_line = "Address is required";
    // if (!formData.city) errors.city = "City is required";
    // if (!formData.state) errors.state = "State is required";
    // if (!formData.pincode) errors.pincode = "Pincode is required";
    // else if (formData.pincode.length !== 6)
    //   errors.pincode = "Pincode must be 6 digits";
    if (!formData.mobile) errors.mobile = "Mobile number is required";
    else if (formData.mobile.length !== 10)
      errors.mobile = "Mobile number must be 10 digits";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  };

  const openEditModal = (item) => {
    setEditData(item);
    setFormData({
      ...item,
      // pincode: String(item.pincode),
      mobile: String(item.mobile),
    });
    setIsEditing(true);
    setFormErrors({});
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setFormData({
      // address_line: "",
      // city: "",
      // state: "",
      // pincode: "",
      mobile: "",
      country: "IN",
    });
    setFormErrors({});
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!editData?._id) {
      showJewelryToast("Address ID is missing. Cannot update.", "error");
      return;
    }
    dispatch(updateUserAddress({ ...formData, _id: editData._id }))
      .unwrap()
      .then(() => {
        showJewelryToast("Address updated successfully!", "success");
        window.location.reload();
        closeEditModal();
      })
      .catch((err) =>
        showJewelryToast(err || "Failed to update address", "error")
      );
  };

  const confirmDelete = (id) => {
    setDeleteConfirm(id);
  };

  const handleDelete = (id) => {
    dispatch(deleteUserAddress(id))
      .unwrap()
      .then(() => {
        showJewelryToast("Address deleted successfully!", "success");
        setDeleteConfirm(null);
        window.location.reload();
      })
      .catch((err) =>
        showJewelryToast(err || "Failed to delete address", "error")
      );
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    dispatch(addUserAddress(formData))
      .unwrap()
      .then(() => {
        showJewelryToast("Address added successfully!", "success");
        window.location.reload();
        setIsAdding(false);
        setFormData({
          // address_line: "",
          // city: "",
          // state: "",
          // pincode: "",
          mobile: "",
          country: "IN",
        });
        setFormErrors({});
      })
      .catch((err) =>
        showJewelryToast(err || "Failed to add address", "error")
      );
  };

  return (
    <motion.div
      className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-amber-50 via-white to-amber-50 dark:from-gray-950 dark:via-gray-900 dark:to-amber-950 text-gray-900 dark:text-gray-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <MetaData title="Saved Addresses | Nandani Jewellers" />

      <div className="max-w-4xl mx-auto">
        <Breadcrumb items={breadcrumbItems} />

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Saved Addresses
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Manage your delivery addresses
              </p>
            </div>

            <motion.button
              onClick={() => setIsAdding(true)}
              className="flex items-center justify-center space-x-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-medium rounded-lg transition-colors shadow-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <PlusCircle size={18} />
              <span>Add New Address</span>
            </motion.button>
          </div>

          <div className="p-6">
            {loading && <Loader />}

            {error && error !== "No addresses found" && (
              <div className="py-8 px-6 bg-red-50 dark:bg-red-900/20 rounded-lg flex flex-col items-center justify-center text-center">
                <AlertCircle
                  size={40}
                  className="text-red-500 dark:text-red-400 mb-3"
                />
                <h3 className="text-lg font-medium text-red-800 dark:text-red-300">
                  No Address Found
                </h3>
              </div>
            )}

            {!loading && (!error || error === "No addresses found") && (
              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {address?.length > 0 ? (
                  address.map((item) => (
                    <AddressCard
                      key={item._id}
                      address={item}
                      onEdit={openEditModal}
                      onDelete={confirmDelete}
                    />
                  ))
                ) : (
                  <div className="py-16 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 mb-4">
                      <MapPin
                        size={24}
                        className="text-amber-500 dark:text-amber-400"
                      />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                      No addresses found
                    </h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md">
                      You haven&apos;t added any delivery addresses yet. Add a
                      new address to get started.
                    </p>
                    <motion.button
                      onClick={() => setIsAdding(true)}
                      className="mt-5 flex items-center space-x-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-medium rounded-lg transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <PlusCircle size={18} />
                      <span>Add New Address</span>
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAdding(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Add New Address
                </h2>
                <button
                  onClick={() => setIsAdding(false)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X size={20} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="p-5">
                <form onSubmit={handleAddAddress} className="space-y-4">
                  <span className="text-sm font-semibold text-gray-700 bg-yellow-100 px-2 py-1 rounded-md">
                    Currently Delivered in India Only
                  </span>

                  <SelectField
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    error={formErrors.country}
                    options={countries.map((country) => ({
                      value: country.isoCode,
                      label: country.name,
                    }))}
                  />

                  <SelectField
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    error={formErrors.state}
                    options={states.map((state) => ({
                      value: state.isoCode,
                      label: state.name,
                    }))}
                  />

                  <SelectField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    error={formErrors.city}
                    options={cities.map((city) => ({
                      value: city.name,
                      label: city.name,
                    }))}
                  />

                  <InputField
                    label="Address"
                    name="address_line"
                    type="text"
                    placeholder="Enter complete address"
                    value={formData.address_line}
                    onChange={handleChange}
                    error={formErrors.address_line}
                  />

                  <InputField
                    label="Pincode"
                    name="pincode"
                    type="text"
                    placeholder="6-digit pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    error={formErrors.pincode}
                  />

                  <InputField
                    label="Mobile"
                    name="mobile"
                    type="text"
                    placeholder="10-digit mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    error={formErrors.mobile}
                  />

                  <div className="flex space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => closeEditModal()}
                      className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
                    >
                      Add Address
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isEditing && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => closeEditModal()}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Edit Address
                </h2>
                <button
                  onClick={() => closeEditModal()}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X size={20} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="p-5">
                <form onSubmit={handleUpdate} className="space-y-4">
                  <SelectField
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    error={formErrors.country}
                    options={countries.map((country) => ({
                      value: country.isoCode,
                      label: country.name,
                    }))}
                  />

                  <SelectField
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    error={formErrors.state}
                    options={states.map((state) => ({
                      value: state.isoCode,
                      label: state.name,
                    }))}
                  />

                  <SelectField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    error={formErrors.city}
                    options={cities.map((city) => ({
                      value: city.name,
                      label: city.name,
                    }))}
                  />

                  <InputField
                    label="Address"
                    name="address_line"
                    type="text"
                    placeholder="Enter complete address"
                    value={formData.address_line}
                    onChange={handleChange}
                    error={formErrors.address_line}
                  />

                  <InputField
                    label="Pincode"
                    name="pincode"
                    type="text"
                    placeholder="6-digit pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    error={formErrors.pincode}
                  />

                  <InputField
                    label="Mobile"
                    name="mobile"
                    type="text"
                    placeholder="10-digit mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    error={formErrors.mobile}
                  />

                  <div className="flex space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => closeEditModal()}
                      className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
                    >
                      Update Address
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 text-center">
                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 mb-5">
                  <Trash size={28} className="text-red-500 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Delete Address
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Are you sure you want to delete this address? This action
                  cannot be undone.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteConfirm)}
                    className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SavedAddress;
