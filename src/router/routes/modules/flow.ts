import type { AppRouteModule } from "/@/router/types";

import { LAYOUT } from "/@/router/constant";
import { t } from "/@/hooks/web/useI18n";

const charts: AppRouteModule = {
  path: "/flow",
  name: "FlowDemo",
  component: LAYOUT,
  redirect: "/flow/flowChart",
  meta: {
    icon: "tabler:chart-dots",
    title: t("routes.flow.name"),
  },
  children: [
    {
      path: "flowChart",
      name: "flowChartDemo",
      component: () => import("/@/views/flow-chart/index.vue"),
      meta: {
        title: t("routes.flow.flowChart"),
      },
    },
  ],
};

export default charts;
