import type { MenuModule } from "/@/router/types";
import { t } from "/@/hooks/web/useI18n";

const menu: MenuModule = {
  orderNo: 500,
  menu: {
    name: t("routes.charts.chart"),
    path: "/charts",

    children: [
      {
        path: "echarts",
        name: "图表示例",
        children: [
          {
            path: "map",
            name: t("routes.charts.map"),
          },
          {
            path: "line",
            name: t("routes.charts.line"),
          },
          {
            path: "pie",
            name: t("routes.charts.pie"),
          },
        ],
      },
    ],
  },
};
export default menu;
