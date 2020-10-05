const { Pool } = require("pg")

module.exports = new Pool ({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "my_teacher"
})
/*
CREATE TABLE my_teacher (
	id INT PRIMARY KEY,
  avatat_url TEXT NOT NULL,
  name TEXT NOT NULL,
  birth_date TIMESTAMP NOT NULL,
  education_level TEXT NOT NULL,
  class_type TEXT NOT NULL,
  subjects_taught TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL
);
*/

