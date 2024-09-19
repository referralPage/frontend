import { createWebHistory, createRouter } from "vue-router";
import routes from "./routes";
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if (from.path === '/404') {
    next(false);
  } else {
    next();
  }
});
export default router;
