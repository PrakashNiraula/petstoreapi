const express = require('express');//import
const mongoose = require('mongoose');
const app = express();// initialize
const path = require('path');
const cors = require('cors');

const User = require('./model/User');
const Cart = require('./model/Cart');
const Category = require('./model/Category');
const Order = require('./model/Order');
const Product = require('./model/Product');
const auth=require("./Router/auth")

const UserRouter = require('./Router/UserRouter');
const ProductRouter = require('./Router/ProductRouter');
const OrderRouter = require('./Router/OrderRouter');
const CartRouter = require('./Router/CartRouter');
const CategoryRouter = require('./Router/CategoryRouter');
const uploadRouter = require('./Router/upload');
const SalesRouter=require('./Router/MysalesRouter');
//const auth = require('./Router/auth');


//connection
mongoose.connect('mongodb://127.0.0.1/petstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true
})
  .then(() => console.log('Database server connected'))
  .catch((err) => console.log(err));

app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//callback 
app.get('/', (req, res, next) => {
  res.send('Server is running');

});
app.use('/mysales', SalesRouter);
app.use('/product', ProductRouter);
//app.use('/cart', CartRouter);
 app.use('/category', CategoryRouter);
 //app.use('/order', OrderRouter);
app.use('/user', UserRouter);// for login
//image upload 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/upload', uploadRouter);
app.use('/cart',auth.verifyUser, CartRouter);
app.use('/order',auth.verifyUser, OrderRouter);
//error handling
app.use((req, res, next) => {
  let err = new Error('Not found');
  err.status = 404;
  next(err);
})
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.status || 500); //default error
  res.json({
    status: 'error',
    message: err.message
  });
})






app.listen(3001, () => {
  console.log('Server is running at localhost:3001');
});