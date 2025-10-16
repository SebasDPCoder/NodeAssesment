// app/src/scripts/syncAndSeed.ts

import sequelize from "../config/database";
import { applyAssociations } from "../models/associations";
import { runAllSeeders } from "../seeders";

const syncAndSeed = async () => {
  try {
    console.log("🔄 Connecting to database...");
    await sequelize.authenticate();
    console.log("✅ Database connection established");

    console.log("🔗 Applying model associations...");
    applyAssociations();
    console.log("✅ Associations applied");

    console.log("🗄️ Synchronizing database schema...");
    await sequelize.sync({ force: true }); // WARNING: This drops all tables
    console.log("✅ Database synchronized");

    console.log("🌱 Starting seeding process...");
    await runAllSeeders();
    console.log("✅ Seeding completed successfully");

    console.log("🎉 Database setup completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during database setup:", error);
    process.exit(1);
  }
};

syncAndSeed();