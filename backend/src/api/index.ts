import { Router } from 'express';
import auth from './routes/authentication_route';
import { userRute as user } from './routes/user_route';
import { agendaInstanceRoute as agendash } from './routes/agendash_route';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  auth(app);
  user(app);
  agendash(app);

  return app;
};

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
