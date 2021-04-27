import type { AppRouteModule } from "/@/router/types";

import { LAYOUT } from "/@/router/constant";
import { t } from "/@/hooks/web/useI18n";

const dashboard: AppRouteModule = {
  path: "/dataset",
  name: "Dataset",
  component: LAYOUT,
  redirect: "/dataset/list",
  meta: {
    icon: "bx:bxs-data",
    title: t("routes.dataset.dataset"),
  },
  children: [
    {
      path: "list",
      name: "List",
      component: () => import("/@/views/dataset/index.vue"),
      meta: {
        title: t("routes.dataset.list"),
      },
    },
    {
      path: "upload",
      name: "Upload",
      component: () => import("/@/views/dataset/upload.vue"),
      meta: {
        title: t("routes.dataset.upload"),
      },
    },
  ],
};

export default dashboard;
