import type { MenuModule } from "/@/router/types";
import { t } from "/@/hooks/web/useI18n";

const menu: MenuModule = {
  orderNo: 2000,
  menu: {
    name: t("routes.system.moduleName"),
    path: "/system",
    children: [
      {
        path: "account",
        name: t("routes.system.account"),
      },
      {
        path: "changePassword",
        name: t("routes.system.password"),
      },
    ],
  },
};
export default menu;
