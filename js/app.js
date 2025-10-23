import { HomePage } from './controllers/homeController.js';
import { ProductPage } from './controllers/productController.js';
import { router } from './router/index.js';

router({
  '/': () => HomePage(), // Forside
  '/produkter': () => ProductPage(), // Produkter
}, '#app');