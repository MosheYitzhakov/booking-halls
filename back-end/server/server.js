const express = require('express')
const app = express()
const { checkDBConnection } = require('../database/dbConnection')
const cors =require('cors')
// const path = require('path')
const clientR = require('./routers/client')
const loginR = require('./routers/manager/login')
const ordersR = require('./routers/manager/orders')
const settingR = require('./routers/manager/setting')
const invoicesR = require('./routers/manager/invoicess')
app.use(cors())
app.use(express.json())
// app.use(express.static(path.join(path.dirname(__dirname),'../',"fount-end",'react','build')));


app.use('/api/managers/login/', loginR)
app.use('/api/managers/orders/', ordersR)
app.use('/api/managers/settings/', settingR)
app.use('/api/managers/invoices/', invoicesR)

app.use('/api/',clientR)

// app.use(['/users/',"/posts/","/todos/","/comments/","/login/"] ,(req, res) => {
//     const htmlPath = path.join(path.dirname(__dirname),'../',"fount-end",'react', "build", "index.html")
//     res.sendFile(htmlPath);
// })


app.use('/*', (req, res) => res.send('not found'))






const connection = checkDBConnection()

if(connection){
 const port = process.env.PORT || 3335;
    app.listen(port, () => console.log(`Server is running on port ${port}`))
} else{
    console.log('Error al conectar a la base de datos')
}

