let pg = require('pg');
let Pool = new pg.Pool({
    user:'postgres',
    host:"localhost",
    database:"codeinit",
    password:"Ajay@21275",
    port:5432
})


  Pool.connect().then(()=>{
    console.log("Connected to postgresql database")
  })
  .catch((err)=>{
    console.log(err)
  })

  module.exports = Pool;