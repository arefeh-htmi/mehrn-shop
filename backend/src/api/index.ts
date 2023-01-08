import { Router } from 'express';
import auth from './routes/authentication_route';
import { userRute as user } from './routes/user_route';
import { agendaInstanceRoute as agendash } from './routes/agendash_route';
import { productRute as product } from './routes/product_route';
import { BrandRoute as brand } from './routes/brand_route';
import { CategorRoute as category } from './routes/category_route';
import { ReviewRute as review } from './routes/review_route';
import { paymentRoute as payments } from './routes/pyament_route';
import { newsletterRoute as newsletters } from './routes/newsletter_route';
import { merchantRoute as merchants } from './routes/merchant_route';
import { OrderRoute as order } from './routes/order_route';

export default (): Router => {
  const app = Router();
  auth(app);
  user(app);
  product(app);
  brand(app);
  category(app);
  review(app);
  newsletters(app);
  payments(app);
  order(app);
  merchants(app);
  agendash(app);

  return app;
};
