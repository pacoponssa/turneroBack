const express = require("express")
const cors = require('cors');  // npm i cors
const app = express();

app.use(cors());
 
const port = 3000

// permitir que lleguen los json por las url
app.use(express.json());

// Rutas de autenticación
const authRoutes = require('./router/auth.routes');
app.use('/auth', authRoutes);

//app.use('/auth-clientes', authRoutes);

// llamar a base de datos
const db = require("./models/index");
// conectar al motor de DB
// para sincronizar cambios en la DB, usar:   .sync({alter:true})
db.sequelize.sync({alter:true})  
  .then(() => {
    console.log("Base de datos conectada");
  })
  .catch((error) => {
    console.log("Error al conectar a la base de datos: ", error);
  });

// importar rutas
require("./router/index.routes")(app);


app.listen(port, () => {
  console.log("El servidor esta corriendo en el puerto ", port)
});

 
