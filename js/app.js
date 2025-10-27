import { ProductPage } from './controllers/productController.js';
import { router } from './router/index.js';

router({
  '/': () => ProductPage(), // Forside
}, '#app');