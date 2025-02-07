import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import CartProductModel from "../models/cartModel.js";
import UserModel from "../models/userModel.js";

export const addToCartItemController = catchAsyncErrors(async (req, res) => {
  try {
    const userId = req.user;
    const { productId } = req.body;

    if (!productId) {
      return res.status(402).json({
        message: "Please provide productId",
        error: true,
        success: false,
      });
    }

    const checkItemCart = await CartProductModel.findOne({
      userId: userId,
      productId: productId,
    });

    if (checkItemCart) {
      return res.status(400).json({
        message: "Item already in cart",
        error: true,
        success: false,
      });
    }

    const cartItem = new CartProductModel({
      quantity: 1,
      userId: userId,
      productId: productId,
    });
    const savedCartItem = await cartItem.save();

    const updateCartUser = await UserModel.updateOne(
      { _id: userId },
      {
        $addToSet: {
          shopping_cart: productId,
        },
      }
    );

    if (!updateCartUser.nModified) {
      return res.status(500).json({
        message: "Failed to update user cart",
        error: true,
        success: false,
      });
    }

    return res.json({
      data: savedCartItem,
      message: "Item added to cart successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
});

export const getCartItemController = catchAsyncErrors(async (req, res) => {
  try {
    const userId = req.user;

    const cartItems = await CartProductModel.find({
      userId: userId,
    }).populate("productId");

    if (cartItems.length === 0) {
      return res.status(404).json({
        message: "No items found in the cart",
        error: true,
        success: false,
      });
    }

    return res.json({
      data: cartItems,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
});

export const updateCartItemQtyController = catchAsyncErrors(
  async (req, res) => {
    try {
      const userId = req.user;
      const { _id, qty } = req.body;

      if (!_id || !qty) {
        return res.status(400).json({
          message: "Please provide _id and qty",
          error: true,
          success: false,
        });
      }

      const updatedCartItem = await CartProductModel.updateOne(
        {
          _id: _id,
          userId: userId,
        },
        {
          quantity: qty,
        },
        { new: true }
      );

      if (!updatedCartItem) {
        return res.status(404).json({
          message: "Cart item not found",
          error: true,
          success: false,
        });
      }

      return res.json({
        message: "Cart updated successfully",
        success: true,
        error: false,
        data: updatedCartItem,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Internal Server Error",
        error: true,
        success: false,
      });
    }
  }
);

export const deleteCartItemQtyController = catchAsyncErrors(
  async (req, res) => {
    try {
      const userId = req.user;
      const { _id } = req.body;

      if (!_id) {
        return res.status(400).json({
          message: "Please provide _id",
          error: true,
          success: false,
        });
      }

      const deleteResult = await CartProductModel.deleteOne({
        _id: _id,
        userId: userId,
      });

      if (deleteResult.deletedCount === 0) {
        return res.status(404).json({
          message: "Cart item not found",
          error: true,
          success: false,
        });
      }

      return res.json({
        message: "Item removed from cart successfully",
        error: false,
        success: true,
        data: deleteResult,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Internal Server Error",
        error: true,
        success: false,
      });
    }
  }
);
