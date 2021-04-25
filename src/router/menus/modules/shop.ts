import type { MenuModule } from "/@/router/types";
import { t } from "/@/hooks/web/useI18n";

const menu: MenuModule = {
  orderNo: 10,
  menu: {
    name: t("routes.shop.shop"),
    path: "/shop",
    children: [
      {
        path: "list",
        name: t("routes.shop.list"),
      },
    ],
  },
};
export default menu;
