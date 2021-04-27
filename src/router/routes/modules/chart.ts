import type { AppRouteModule } from "/@/router/types";

import { LAYOUT, getParentLayout } from "/@/router/constant";
import { t } from "/@/hooks/web/useI18n";

const dashboard: AppRouteModule = {
  path: "/charts",
  name: "Charts",
  component: LAYOUT,
  redirect: "/charts/echarts/map",
  meta: {
    icon: "ion:bar-chart-outline",
    title: t("routes.charts.chart"),
  },
  children: [
    {
      path: "echarts",
      name: "Echarts",
      component: getParentLayout("Echarts"),
      meta: {
        title: "Echarts",
      },
      redirect: "/charts/echarts/map",
      children: [
        {
          path: "map",
          name: "Map",
          component: () => import("/@/views/charts/Map.vue"),
          meta: {
            title: t("routes.charts.map"),
          },
        },
        {
          path: "line",
          name: "Line",
          component: () => import("/@/views/charts/Line.vue"),
          meta: {
            title: t("routes.charts.line"),
          },
        },
        {
          path: "pie",
          name: "Pie",
          component: () => import("/@/views/charts/Pie.vue"),
          meta: {
            title: t("routes.charts.pie"),
          },
        },
      ],
    },
  ],
};

export default dashboard;
