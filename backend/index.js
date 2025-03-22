const express = require('express') ;
const cors = require('cors') ;
const sequelize = require('./config/db') ;

const cartRoutes = require('./routes/cartRoutes') ;
const authRoutes = require('./routes/authRoutes') ;
const productRoutes = require('./routes/productRoutes') ;


const app = express() ;

app.use(cors()) ;
app.use(express.json()) ;

app.use("/api/cart" , cartRoutes) ;
app.use("/api/auth" , authRoutes) ;
app.use("/api/products" , productRoutes) ;


app.get('/' , (req , res) => {
      res.send('Welcome to the server') ;
}) ;


sequelize.sync().then(() => {
    console.log('Database synced') ;
}) ;

app.listen(5000 , async () => {
    console.log('Server is running on port 5000') ;
}) ;

