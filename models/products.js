import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    id: {
        type : Number,
        required : true,
        unique : true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    category: {
      type: String,
      required: true,
      enum: ['Electronics', 'Clothing', 'Books', 'Home', 'Beauty', 'Sports', 'Other']
    },
    brand: {
      type: String,
      default: 'Generic'
    },
    stock: {
      type: Number,
      required: true,
      default: 0
    },
    imageUrl: {
      type: String,
      required: true
    },
    inStock: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true ,
    versionKey: false
  }
);

const AllProduct = mongoose.model('AllProduct', productSchema);

export default AllProduct;