import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
    products:{
        type: [{
            product:{
                type: Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: Number
        }],
        price: Number,
        date: Date
    }
});

cartSchema.pre('findOne', function () {
    this.populate('products.product')
});

const cartsModel = model('carts', cartSchema)

export default cartsModel;