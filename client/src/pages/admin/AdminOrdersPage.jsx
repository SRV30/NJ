import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  deleteOrder,
  getAllOrders,
  updateOrderStatus,
  deleteAllOrders,
} from "@/store/order-slice/AdminOrderSlice";
import { Link } from "react-router-dom";
import MetaData from "../extras/MetaData";
import Loader from "../extras/Loader";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const AdminOrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.adminOrders);

  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openDeleteAllDialog, setOpenDeleteAllDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updateStatus, setUpdateStatus] = useState("");
  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleUpdateClick = (order) => {
    setSelectedOrder(order);
    setUpdateStatus(order.orderStatus);
    setOpenUpdateDialog(true);
  };

  const handleUpdateSubmit = () => {
    if (selectedOrder) {
      const payload = {
        orderId: selectedOrder._id,
        orderStatus: updateStatus,
      };
      dispatch(updateOrderStatus(payload)).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          setOpenUpdateDialog(false);
          dispatch(getAllOrders());
        }
      });
    }
  };

  const handleDeleteClick = (orderId) => {
    setDeleteOrderId(orderId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteOrderId) {
      dispatch(deleteOrder(deleteOrderId)).then(() => {
        setOpenDeleteDialog(false);
        dispatch(getAllOrders());
      });
    }
  };

  const handleDeleteAllConfirm = () => {
    dispatch(deleteAllOrders()).then(() => {
      setOpenDeleteAllDialog(false);
      dispatch(getAllOrders());
    });
  };

  const filterOrders = () => {
    let filtered = [...orders];
    if (statusFilter !== "ALL") {
      filtered = filtered.filter((order) => order.orderStatus === statusFilter);
    }
    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.user?.email
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order.trackingId?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered.sort((a, b) => {
      const fieldA = new Date(
        sortField === "createdAt" ? a.createdAt : a.deliveryDate || 0
      );
      const fieldB = new Date(
        sortField === "createdAt" ? b.createdAt : b.deliveryDate || 0
      );
      return sortOrder === "asc" ? fieldA - fieldB : fieldB - fieldA;
    });
  };

  const sortedAndFilteredOrders = filterOrders();
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedAndFilteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(sortedAndFilteredOrders.length / ordersPerPage);

  const toggleSort = (field) => {
    setSortField(field);
    setSortOrder(sortField === field && sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950 text-amber-800 dark:text-amber-300 p-4 sm:p-6 lg:p-8"
    >
      <MetaData title="Admin Orders Dashboard | Nandani Jewellers" />
      <motion.header
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-amber-50 dark:bg-amber-900 shadow-xl rounded-xl p-6 mb-8"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center font-serif">
          Orders Management
        </h1>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-amber-50 dark:bg-amber-900/80 shadow-lg rounded-xl p-6 mb-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <label className="block font-medium">Filter by Status</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2 rounded-lg border-2 border-amber-300 bg-amber-50 dark:bg-amber-900/50 dark:border-amber-700 focus:ring-2 focus:ring-amber-500"
            >
              <option value="ALL">All Orders</option>
              <option value="BOOKED">Booked</option>
              <option value="PURCHASED">Purchased</option>
              <option value="EXPIRED">Expired</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Search Orders</label>
            <input
              type="text"
              placeholder="Search by ID, Name, Email..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2 rounded-lg border-2 border-amber-300 bg-amber-50 dark:bg-amber-900/50 dark:border-amber-700 focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Sort By</label>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleSort("createdAt")}
                className="flex-1 p-2 rounded-lg border-2 border-amber-500 bg-amber-100 dark:bg-amber-800 hover:bg-amber-200 dark:hover:bg-amber-700 text-sm"
              >
                Asc{" "}
                {sortField === "createdAt" && `(${sortOrder.toUpperCase()})`}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleSort("deliveryDate")}
                className="flex-1 p-2 rounded-lg border-2 border-amber-500 bg-amber-100 dark:bg-amber-800 hover:bg-amber-200 dark:hover:bg-amber-700 text-sm"
              >
                Des{" "}
                {sortField === "deliveryDate" && `(${sortOrder.toUpperCase()})`}
              </motion.button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpenDeleteAllDialog(true)}
            disabled={loading || orders.length === 0}
            className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-medium disabled:opacity-50"
          >
            Delete All Orders
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-amber-50 dark:bg-amber-900/80 shadow-xl rounded-xl overflow-hidden"
      >
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader />
          </div>
        ) : error ? (
          <p className="text-center text-red-500 py-10 text-sm">{error}</p>
        ) : sortedAndFilteredOrders.length === 0 ? (
          <p className="text-center py-10 text-amber-600 dark:text-amber-400">
            No orders found matching your criteria
          </p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-amber-600 text-amber-50">
                  <tr>
                    <th className="p-4 text-left font-medium">Order ID</th>
                    <th className="p-4 text-left font-medium">Customer</th>
                    <th className="p-4 text-left font-medium hidden lg:table-cell">
                      Date
                    </th>
                    <th className="p-4 text-left font-medium">Status</th>
                    <th className="p-4 text-center font-medium">Details</th>
                    <th className="p-4 text-center font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {currentOrders.map((order) => (
                      <motion.tr
                        key={order._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="border-b border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-800/50"
                      >
                        <td className="p-4 max-w-[180px] truncate font-mono text-sm">
                          {order._id}
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {order.user?.name}
                            </span>
                            <span className="text-xs text-amber-600 dark:text-amber-400">
                              {order.user?.email}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                          {new Date(order.createdAt).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              order.orderStatus === "BOOKED"
                                ? "bg-amber-200 dark:bg-amber-700"
                                : order.orderStatus === "PURCHASED"
                                ? "bg-green-200 dark:bg-green-700"
                                : "bg-red-200 dark:bg-red-700"
                            }`}
                          >
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <Link
                            to={`/order/${order._id}`}
                            className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-medium"
                          >
                            View
                          </Link>
                        </td>
                        <td className="p-4 text-center space-x-3">
                          {order.orderStatus !== "EXPIRED" &&
                            order.orderStatus !== "CANCELLED" && (
                              <button
                                onClick={() => handleUpdateClick(order)}
                                className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300"
                              >
                                Edit
                              </button>
                            )}
                          <button
                            onClick={() => handleDeleteClick(order._id)}
                            className="text-red-600 hover:text-red-800 dark:text-red-400"
                          >
                            Delete
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            <div className="flex justify-center items-center p-4 border-t border-amber-200 dark:border-amber-800">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`mx-1 px-3 py-1 rounded-lg ${
                    currentPage === i + 1
                      ? "bg-amber-600 text-white"
                      : "bg-amber-100 hover:bg-amber-200 dark:bg-amber-800/50 dark:hover:bg-amber-700"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </motion.div>

      <Dialog
        open={openUpdateDialog}
        onClose={() => setOpenUpdateDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle className="bg-amber-600 text-amber-50 p-4">
          Update Order Status
        </DialogTitle>
        <DialogContent className="bg-amber-50 dark:bg-amber-900 p-6 space-y-4">
          <div>
            <label className="block mb-2 font-medium">Select New Status</label>
            <select
              value={updateStatus}
              onChange={(e) => setUpdateStatus(e.target.value)}
              className="w-full p-2 rounded-lg border-2 border-amber-300 bg-amber-50 dark:bg-amber-900/50 dark:border-amber-700"
            >
              <option value="BOOKED">BOOKED</option>
              <option value="PURCHASED">PURCHASED</option>
              <option value="EXPIRED">EXPIRED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>
        </DialogContent>
        <DialogActions className="bg-amber-50 dark:bg-amber-900 p-4">
          <button
            onClick={() => setOpenUpdateDialog(false)}
            className="px-4 py-2 text-amber-600 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-800 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateSubmit}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg"
          >
            Update Status
          </button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle className="bg-red-600 text-red-50 p-4">
          Confirm Deletion
        </DialogTitle>
        <DialogContent className="bg-amber-50 dark:bg-amber-900 p-6">
          <p className="text-center">Permanently delete this order?</p>
        </DialogContent>
        <DialogActions className="bg-amber-50 dark:bg-amber-900 p-4">
          <button
            onClick={() => setOpenDeleteDialog(false)}
            className="px-4 py-2 text-amber-600 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-800 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            Confirm Delete
          </button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteAllDialog}
        onClose={() => setOpenDeleteAllDialog(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle className="bg-red-600 text-red-50 p-4">
          Delete All Orders
        </DialogTitle>
        <DialogContent className="bg-amber-50 dark:bg-amber-900 p-6">
          <p className="text-center text-red-600 dark:text-red-400 font-medium">
            Warning: This will permanently delete all orders!
          </p>
        </DialogContent>
        <DialogActions className="bg-amber-50 dark:bg-amber-900 p-4">
          <button
            onClick={() => setOpenDeleteAllDialog(false)}
            className="px-4 py-2 text-amber-600 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-800 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteAllConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            Delete All
          </button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default AdminOrdersPage;
