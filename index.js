const express = require("express");
const connection = require("./utils/database");

const app = express();

app.use(express.json());

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const userRoute = require('./routes/user');

app.use('/admin',adminRoute);
app.use('/shop',shopRoute);
app.use('/user',userRoute);

connection.connect(() => {
  app.listen(3000, () => {
    console.log("Server Started");
  });
});
