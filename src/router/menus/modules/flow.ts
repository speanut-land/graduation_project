import type { MenuModule } from "/@/router/types";
import { t } from "/@/hooks/web/useI18n";

const menu: MenuModule = {
  orderNo: 5000,
  menu: {
    name: t("routes.flow.name"),
    path: "/flow",
    children: [
      {
        path: "flowChart",
        name: t("routes.flow.flowChart"),
      },
    ],
  },
};
export default menu;
