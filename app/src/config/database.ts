import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL!, { // DATABASE_URl from docker-compose.yml
  dialect: "postgres",
  logging: false,
});


export default sequelize;

