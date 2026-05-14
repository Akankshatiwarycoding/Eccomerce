import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],

    address: {
        city: String,
        state: String,
        pincode: String
    },

    totalAmount: {
        type: Number,
        required: true
    },

    paymentMethod: {
        type: String,
        default: 'COD'
    },

    status: {
        type: String,
        default: 'Placed'
    }

},
{ timestamps: true }
);

export default mongoose.model('Order', OrderSchema);