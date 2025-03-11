import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Package,
  Menu,
  X,
  Gem,
  Bell,
  LogOut,
  Check,
  Trash2,
  Contact,
} from "lucide-react";
import AdminUsers from "./AdminUsers";
import AdminProducts from "./AdminProducts";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import AdminOrdersPage from "./AdminOrdersPage";
import AdminJewellery from "./AdminJewellery";
import ManageCategory from "./AdminCategory";
import { Category } from "@mui/icons-material";
import { getProducts } from "@/store/product-slice/product";
import { fetchJewelleryCategories } from "@/store/product-slice/jewelleryType";
import { fetchCategories } from "@/store/product-slice/category";
import { getAllUsers, logoutUser } from "@/store/auth-slice/user";
import { showJewelryToast } from "../extras/showJewelryToast";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "../extras/DarkModeToggle";
import {
  fetchNotifications,
  fetchLowStockProducts,
  markNotificationAsRead,
  deleteNotification,
} from "@/store/extra/dashboardSlice";
import AdminContact from "./AdminGetInTouch";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { products = [] } = useSelector((state) => state.product || {});
  const { users = [] } = useSelector((state) => state.auth || {});
  const { categories: jewelleryType = [] } = useSelector(
    (state) => state.category || {}
  );
  const { categories: productCategory = [] } = useSelector(
    (state) => state.category || {}
  );
  const { notifications, lowStockProducts } = useSelector(
    (state) => state.dashboard
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUsers({ page, search }));
    dispatch(getProducts());
    dispatch(fetchJewelleryCategories());
    dispatch(fetchCategories());
    dispatch(fetchNotifications());
    dispatch(fetchLowStockProducts());
  }, [dispatch, page, search]);

  const handleLogout = () => {
    dispatch(logoutUser());
    showJewelryToast("Logged out successfully!", "success");
    navigate("/");
  };

  const dashboardStats = [
    {
      title: "Users",
      count: users.length,
      icon: Users,
      color: "indigo",
    },
    {
      title: "Products",
      count: products.length,
      icon: ShoppingBag,
      color: "yellow",
    },
    {
      title: "Jewellery Types",
      count: jewelleryType.length,
      icon: Gem,
      color: "amber",
    },
    {
      title: "Categories",
      count: productCategory.length,
      icon: Category,
      color: "blue",
    },
    {
      title: "Orders",
      count: 245,
      icon: Package,
      newCount: 18,
      color: "green",
    },
    {
      title: "Unread Notifications",
      count: notifications.filter((n) => !n.read).length,
      icon: Bell,
      color: "red",
    },
  ];

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
    setTimeout(() => {
      setIsOpen(false);
    }, 5000);
  };

  const handleMarkAsRead = (id) => {
    dispatch(markNotificationAsRead(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteNotification(id));
  };

  const unreadNotifications = notifications.filter((n) => !n.read);
  const limitedNotifications =
    unreadNotifications.length > 0
      ? unreadNotifications
      : notifications.slice(0, 3);

  const displayedNotifications = showAll ? notifications : limitedNotifications;

  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return (
          <div className="space-y-8">
            <motion.div
              className="bg-gradient-to-r from-amber-100 to-amber-300 dark:from-amber-900 dark:to-amber-700 p-8 rounded-2xl shadow-lg text-center relative overflow-hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-pattern opacity-10"></div>
              <h1 className="text-3xl font-bold tracking-wide text-amber-800 dark:text-amber-100">
                👋 Welcome,{" "}
                <span className="bg-white dark:bg-amber-950 text-amber-600 dark:text-amber-300 px-4 py-1 rounded-full shadow-md capitalize">
                  {user.name}
                </span>
              </h1>
              <p className="mt-2 text-amber-700 dark:text-amber-200">
                Managing your jewelry store has never been easier
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardStats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border-l-4 border-${stat.color}-500 hover:shadow-lg transition-all duration-300`}
                >
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <p
                        className={`text-sm font-medium text-${stat.color}-600 dark:text-${stat.color}-400`}
                      >
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                        {stat.count}
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900 text-${stat.color}-600 dark:text-${stat.color}-300`}
                    >
                      <stat.icon className="w-7 h-7" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Low Stock Alert
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Products with stock less than 5
                </p>
              </div>
              <div className="p-5">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          View Product
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {lowStockProducts.map((product, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200">
                            {product.name}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                            ₹{product.price}
                          </td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                              {product.stock} left
                            </span>
                          </td>
                          <td className="px-10 py-3 text-sm font-medium text-gray-800 dark:text-gray-200">
                            <button
                              onClick={() =>
                                navigate(`/products/${product._id}`)
                              }
                              className="text-amber-800 hover:text-amber-700 dark:text-amber-300 dark:hover:text-amber-100"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>
        );
      case "Users":
        return <AdminUsers />;
      case "Jewellery Type":
        return <AdminJewellery />;
      case "Category":
        return <ManageCategory />;
      case "Products":
        return <AdminProducts />;
      case "Orders":
        return <AdminOrdersPage />;
      case "Contact Form":
        return <AdminContact />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: isSidebarOpen ? 0 : -250 }}
        transition={{ duration: 0.5 }}
        className={`fixed md:static z-40 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transition-all duration-300
          border-r border-gray-200 dark:border-gray-700 md:translate-x-0 flex flex-col
          backdrop-blur-xl bg-opacity-90 dark:bg-opacity-90`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Gem className="h-6 w-6 text-amber-500" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-200">
              Nandani Jewellers Admin Panel
            </h2>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
            <X className="w-6 h-6 text-gray-700 dark:text-stone-200" />
          </button>
        </div>

        {/* Admin Profile */}
        <div className="flex items-center space-x-3 px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="w-10 h-10 rounded-full bg-amber-200 dark:bg-amber-800 flex items-center justify-center">
            <span className="text-amber-800 dark:text-amber-200 font-semibold text-lg uppercase">
              {user.name?.charAt(0) || "A"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate capitalize">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              Administrator
            </p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {[
            { icon: LayoutDashboard, text: "Dashboard" },
            { icon: Users, text: "Users" },
            { icon: Gem, text: "Jewellery Type" },
            { icon: Category, text: "Category" },
            { icon: ShoppingBag, text: "Products" },
            { icon: Package, text: "Orders" },
            { icon: Contact, text: "Contact Form" },
          ].map((item) => (
            <motion.button
              key={item.text}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveSection(item.text)}
              className={`flex items-center w-full px-4 py-3 rounded-lg text-left space-x-3 font-medium
                ${
                  activeSection === item.text
                    ? "bg-gradient-to-r from-amber-100 to-amber-300 dark:from-amber-900 dark:to-amber-700 text-amber-800 dark:text-amber-100 shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                } transition-all duration-200`}
            >
              <item.icon
                className={`w-5 h-5 ${
                  activeSection === item.text
                    ? "text-amber-600 dark:text-amber-300"
                    : ""
                }`}
              />
              <span className="text-sm">{item.text}</span>
            </motion.button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <DarkModeToggle />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center w-full px-4 py-2 rounded-lg text-left space-x-3 font-medium
              text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Logout</span>
          </motion.button>
        </div>
      </motion.aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-5 shadow-sm">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
            >
              <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          <div className="relative z-50">
            <button
              className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-all duration-200 focus:outline-none"
              onClick={toggleNotifications}
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifications.length > 0 && (
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
              )}
            </button>

            {/* Notification Dropdown */}
            {isOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 transform transition-all duration-200 z-50">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-gray-800 dark:text-gray-200 font-semibold">
                    Notifications
                  </h3>
                </div>

                {displayedNotifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-6">
                    <Bell className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      No new notifications
                    </p>
                  </div>
                ) : (
                  <div>
                    <ul className="max-h-64 overflow-y-auto">
                      {displayedNotifications.map((notification, index) => (
                        <li
                          key={index}
                          className={`p-4 border-b border-gray-100 dark:border-gray-700 text-sm hover:bg-gray-200 
                          dark:hover:bg-gray-700  transition-colors duration-150 ${
                            !notification.read
                              ? "bg-blue-50 dark:bg-blue-900/20"
                              : ""
                          }`}
                        >
                          <div className="flex justify-between">
                            <p className="text-gray-800 dark:text-gray-200 font-medium">
                              {notification.message}
                            </p>
                            {!notification.read && (
                              <button
                                onClick={() =>
                                  handleMarkAsRead(notification._id)
                                }
                              >
                                <Check className="w-4 h-4 text-green-500 hover:text-green-700" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(notification._id)}
                            >
                              <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
                            </button>
                          </div>
                          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                            <span className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                              {new Date(
                                notification.createdAt
                              ).toLocaleString()}
                            </span>
                          </p>
                        </li>
                      ))}
                    </ul>

                    {notifications.length > 3 && (
                      <div className="p-3 text-center border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={() => setShowAll(!showAll)}
                          className="text-sm text-amber-500 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-100 font-medium"
                        >
                          {showAll ? "Show less" : "View all notifications"}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 overflow-auto p-6 text-gray-900 dark:text-gray-200"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {activeSection}
              </h1>
              <div className="text-sm breadcrumbs text-gray-500 dark:text-gray-400">
                <span>Admin</span>
                <span> / </span>
                <span>{activeSection}</span>
              </div>
            </div>
            {renderContent()}
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default AdminDashboard;
