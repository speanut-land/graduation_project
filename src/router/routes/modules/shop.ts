import type { AppRouteModule } from "/@/router/types";

import { LAYOUT } from "/@/router/constant";
import { t } from "/@/hooks/web/useI18n";

const dashboard: AppRouteModule = {
  path: "/shop",
  name: "Shop",
  component: LAYOUT,
  redirect: "/shop/list",
  meta: {
    icon: "ion:grid-outline",
    title: t("routes.shop.shop"),
  },
  children: [
    {
      path: "list",
      name: "List",
      component: () => import("/@/views/shop/list/index.vue"),
      meta: {
        affix: true,
        title: t("routes.shop.list"),
      },
    },
    {
      path: "detail",
      name: "Detail",
      component: () => import("/@/views/shop/detail/index.vue"),
      meta: {
        title: t("routes.shop.detail"),
      },
    },
  ],
};

export default dashboard;
