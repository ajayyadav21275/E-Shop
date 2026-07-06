const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "codeinit",
  password: "Ajay@21275",
  port: 5432,
});

pool
  .connect()
  .then(() => {
    console.log("✅ PostgreSQL Connected");
  })
  .catch((err) => {
    console.error("❌ Database Connection Error:", err);
  });

module.exports = pool;