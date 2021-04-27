import type { AppRouteModule } from "/@/router/types";

import { LAYOUT } from "/@/router/constant";
import { t } from "/@/hooks/web/useI18n";

const system: AppRouteModule = {
  path: "/system",
  name: "System",
  component: LAYOUT,
  redirect: "/system/account",
  meta: {
    icon: "ion:settings-outline",
    title: t("routes.system.moduleName"),
  },
  children: [
    {
      path: "account",
      name: "AccountManagement",
      meta: {
        title: t("routes.system.account"),
        ignoreKeepAlive: true,
      },
      component: () => import("/@/views/system/account/index.vue"),
    },
    {
      path: "changePassword",
      name: "ChangePassword",
      meta: {
        title: t("routes.system.password"),
        ignoreKeepAlive: true,
      },
      component: () => import("/@/views/system/password/index.vue"),
    },
  ],
};

export default system;
