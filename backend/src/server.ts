// import path from "path";
// import express from "express";
// import dotenv from "dotenv";
// import colors from "colors";
// import cors from "cors";
// import morgan from "morgan";
// import connectDB from "./config/db.js";
// import productRoutes from "./routes/productRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";
// import contactUsRoutes from "./routes/contactusRouter.js";
// import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
// import newsletterRoutes from "./routes/newsletterRoutes.js";
// import merchant from "./routes/merchant.js";

// connectDB();

// const app = express();

// SETTINGS IN DEVELOPMENT EVN
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

// app.use(express.json());
// app.use(cors());

// //ROUTES
// app.use("/api/products", productRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/upload", uploadRoutes);
// app.use("/api/merchant", merchant);
// app.use("/api/contact", contactUsRoutes);

// //PAYPAL
// app.get("/api/config/paypal", (req, res) =>
//   res.send(process.env.PAYPAL_CLIENT_ID)
// );

// //UPLOAD
// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// SETTINGS IN PRODUCTION EVN
// if (process.env.NODE_ENV === "production") {
//   //BULDING FRONT END CODE AND SENDING IT OTHERWISE PRINT A MESSAGE
//   app.use(express.static(path.join(__dirname, "/frontend/build")));
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running....");
//   });
// }

//NOT FOUND AND ERROR HANDLER
// app.use(notFound);
// app.use(errorHandler);

//PORT AND LISTENING
// const PORT = process.env.PORT || 5000;

// app.listen(
//   PORT,
//   console.log(
//     `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
//   )
// );



import 'reflect-metadata'; // We need this in order to use @Decorators


import express from 'express';
import { LoggerInstance  as Logger} from '@src/loaders/logger_loader';
import { config } from '@src/config';


async function startServer() {
  const app = express();

  /**
   * NOTE:Import/Export can only be used in 'top-level code'
   TOCHECK: In node 10 without babel and at the time of writing we are using good old require. If updated check
   **/
  await require('./loaders').default({ expressApp: app });

  app.listen(config.port, () => {
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
  }).on('error', err => {
    Logger.error(err);
    process.exit(1);
  });

}

startServer();