import { createRouter, createWebHistory } from '@ionic/vue-router';
import { routes } from "@/router/routes/rotes";
import { apiController } from "@/api/api";
import { Network } from '@capacitor/network';

import { PrivateRoutesMiddleware } from "@/router/middlewares/PrivateRoutesMiddleware";
import { AuthMiddleware } from "@/router/middlewares/AuthMiddleware";
import { DropErrorsMiddleware } from "@/router/middlewares/DropErrorsMiddleware.js";


const middlewares = {
  PrivateRoutesMiddleware,
  AuthMiddleware,
  DropErrorsMiddleware,
};

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  await apiController.abortRequest();
  const status = await Network.getStatus();

  if (to.name === "disconnect") {
    return next();
  }
  if (!status.connected) {
    return next(
      {
        name: "disconnect"
      }
    )
  }

  if (to.name === "registration" && !from.name) {
    return next(
        { 
          name: "login" 
        }
    );
  }

  if ((to.name === "settings_sub" || to.name === "wallets_sub" || to.name === "connection_sub" || to.name === "watcher_sub") && !to.query.group_id) {
    return next(
        {
          name: "settings_sublist"
        }
    );
  }

  if(to.name === 'worker' && !from.name) {
    return next({
      name: "workers"
    })
  }



  const routeMiddleware = to.meta.middleware;

  if (!routeMiddleware) {
    return next();
  }

  const middlewareFunctions = routeMiddleware.map(
      (name) => middlewares[name]
  );
  
  for (let i = 0; i < middlewareFunctions.length; i++) {
    if (middlewareFunctions[i]) {
      await middlewareFunctions[i](to, router);
    }
  }

  return next();
});

export default router;
