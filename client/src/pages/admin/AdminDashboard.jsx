import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Package,
  Menu,
  X,
  Gem,
} from "lucide-react";
import AdminUsers from "./AdminUsers";
import { useNavigate } from "react-router-dom";
import AdminProducts from "./AdminProducts";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import AdminOrdersPage from "./AdminOrdersPage";
import AdminJewellery from "./AdminJewellery";
import ManageCategory from "./AdminCategory";
import { Category } from "@mui/icons-material";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return (
          <motion.div
            className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white p-6 rounded-2xl shadow-lg text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-3xl font-bold tracking-wide">
              👋 Welcome,{" "}
              <span className="bg-white text-amber-600 px-3 py-1 rounded-md shadow-sm">
                {user.name}
              </span>
            </h1>
          </motion.div>
        );
      case "Customers":
        return <AdminUsers />;
      case "Jewellery Type":
        return <AdminJewellery />;
      case "Category":
        return <ManageCategory />;
      case "Products":
        return <AdminProducts />;
      case "Orders":
        return <AdminOrdersPage />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: isSidebarOpen ? 0 : -250 }}
        transition={{ duration: 0.5 }}
        className={`fixed md:static z-40 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transition-all duration-300
          border-r border-gray-300 dark:border-gray-700 md:translate-x-0 flex flex-col
          backdrop-blur-xl bg-opacity-80 dark:bg-opacity-80`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-200">
            Admin Dashboard
          </h2>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
            <X className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {[
            { icon: LayoutDashboard, text: "Dashboard" },
            { icon: Users, text: "Customers" },
            { icon: Gem, text: "Jewellery Type" },
            { icon: Category, text: "Category" },
            { icon: ShoppingBag, text: "Products" },
            { icon: Package, text: "Orders" },
          ].map((item) => (
            <motion.button
              key={item.text}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSection(item.text)}
              className={`flex items-center w-full px-4 py-3 rounded-lg text-left space-x-3 font-medium
                ${
                  activeSection === item.text
                    ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-md"
                    : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                } transition-all duration-300`}
            >
              <item.icon className="w-6 h-6" />
              <span onClick={() => navigate(item.path)}>{item.text}</span>
            </motion.button>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex items-center justify-between px-5 shadow-md">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 md:hidden"
          >
            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
        </header>

        {/* Page Content */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 overflow-auto p-6 text-gray-900 dark:text-gray-200"
        >
          {renderContent()}
        </motion.main>
      </div>
    </div>
  );
};

export default AdminDashboard;
