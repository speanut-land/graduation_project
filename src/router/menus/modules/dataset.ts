import type { MenuModule } from "/@/router/types";
import { t } from "/@/hooks/web/useI18n";

const menu: MenuModule = {
  orderNo: 30,
  menu: {
    name: t("routes.dataset.dataset"),
    path: "/dataset",
    children: [
      {
        path: "list",
        name: t("routes.dataset.list"),
      },
      {
        path: "upload",
        name: t("routes.dataset.upload"),
      },
    ],
  },
};
export default menu;
