import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addPrice, getPrice, updatePrice, clearError, clearSuccess } from "@/store/product-slice/priceSlice";
import { motion } from "framer-motion";
import { Loader2, Plus, Trash } from "lucide-react";
import { showJewelryToast } from "../extras/showJewelryToast";

const metals = ["Gold", "Silver", "Diamond", "Other"];

const PriceManagement = () => {
  const dispatch = useDispatch();
  const { priceData, loading, error, success } = useSelector((state) => state.price);
  
  const [metal, setMetal] = useState("Gold");
  const [prices, setPrices] = useState([]);
  // Updated to use "metalName" instead of "name" for consistency with the API
  const [otherDetails, setOtherDetails] = useState({ metalName: "", size: "", price: "" });

  useEffect(() => {
    dispatch(getPrice(metal));
  }, [dispatch, metal]);

  useEffect(() => {
    // Use "priceDetails" field from the response instead of "prices"
    if (priceData && priceData.data?.priceDetails) {
      setPrices(priceData.data.priceDetails);
    } else {
      setPrices([]);
    }
  }, [priceData]);

  useEffect(() => {
    if (error) {
      showJewelryToast(error, "error");
      dispatch(clearError());
    }
    if (success) {
      showJewelryToast("Price updated successfully!", "success");
      dispatch(clearSuccess());
    }
  }, [error, success, dispatch]);

  const handleAddPrice = () => {
    if (metal === "Other") {
      dispatch(addPrice({ metal, priceDetails: [otherDetails] }));
    } else {
      dispatch(addPrice({ metal, priceDetails: prices }));
    }
  };

  const handleUpdate = () => {
    dispatch(updatePrice({ metal, formData: { priceDetails: prices } }));
  };

  const addPriceField = () => {
    setPrices([...prices, { carat: "", price: "" }]);
  };

  const updatePriceField = (index, field, value) => {
    const updatedPrices = [...prices];
    updatedPrices[index][field] = value;
    setPrices(updatedPrices);
  };

  const removePriceField = (index) => {
    setPrices(prices.filter((_, i) => i !== index));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
      className="min-h-screen p-8 bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 dark:from-slate-950 dark:via-amber-950 dark:to-amber-950 text-amber-800 dark:text-amber-300"
    >
      <div className="max-w-3xl mx-auto">
        <div className="shadow-xl p-6 border-2 border-amber-300 dark:border-amber-700 rounded-xl bg-white dark:bg-slate-900">
          <div className="text-center text-2xl font-semibold mb-4 text-amber-800 dark:text-amber-300">
            Manage Jewelry Prices
          </div>
          <select 
            value={metal} 
            onChange={(e) => setMetal(e.target.value)}
            className="w-full p-2 border rounded-lg border-amber-400 dark:border-amber-600"
          >
            {metals.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          {metal !== "Other" ? (
            <>
              {prices.map((entry, index) => (
                <div key={index} className="flex gap-2 mt-4">
                  <input 
                    type="text" 
                    placeholder="Carat" 
                    value={entry.carat}
                    onChange={(e) => updatePriceField(index, "carat", e.target.value)}
                    className="w-1/2 p-2 border rounded-lg" 
                  />
                  <input 
                    type="number" 
                    placeholder="Price" 
                    value={entry.price}
                    onChange={(e) => updatePriceField(index, "price", e.target.value)}
                    className="w-1/2 p-2 border rounded-lg" 
                  />
                  <button onClick={() => removePriceField(index)} className="text-red-500">
                    <Trash size={20} />
                  </button>
                </div>
              ))}
              <button onClick={addPriceField} className="flex items-center text-green-600 mt-2">
                <Plus size={20} className="mr-1" /> Add More
              </button>
            </>
          ) : (
            <>
              <input 
                type="text" 
                placeholder="Metal Name" 
                value={otherDetails.metalName}
                onChange={(e) => setOtherDetails({ ...otherDetails, metalName: e.target.value })}
                className="w-full p-2 border rounded-lg mt-4" 
              />
              <input 
                type="text" 
                placeholder="Size" 
                value={otherDetails.size}
                onChange={(e) => setOtherDetails({ ...otherDetails, size: e.target.value })}
                className="w-full p-2 border rounded-lg mt-4" 
              />
              <input 
                type="number" 
                placeholder="Price" 
                value={otherDetails.price}
                onChange={(e) => setOtherDetails({ ...otherDetails, price: e.target.value })}
                className="w-full p-2 border rounded-lg mt-4" 
              />
            </>
          )}

          <div className="grid grid-cols-2 gap-4 mt-4">
            <button 
              onClick={handleAddPrice} 
              disabled={loading}
              className="p-2 rounded-lg bg-green-600 text-white hover:shadow-md"
            >
              {loading ? <Loader2 className="animate-spin mx-auto" /> : "Add Price"}
            </button>
            <button 
              onClick={handleUpdate} 
              disabled={loading}
              className="p-2 rounded-lg bg-amber-600 text-white hover:shadow-md"
            >
              {loading ? <Loader2 className="animate-spin mx-auto" /> : "Update Price"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PriceManagement;
