import type { AppRouteModule } from "/@/router/types";

import { LAYOUT, getParentLayout } from "/@/router/constant";
import { t } from "/@/hooks/web/useI18n";

const dashboard: AppRouteModule = {
  path: "/editor",
  name: "EditorDemo",
  redirect: "/editor/markdown",
  component: LAYOUT,
  meta: {
    icon: "carbon:table-split",
    title: t("routes.editor.editor"),
  },
  children: [
    {
      path: "json",
      component: () => import("/@/views/editor/json/index.vue"),
      name: "JsonEditorDemo",
      meta: {
        title: t("routes.editor.jsonEditor"),
      },
    },
    {
      path: "markdown",
      component: import("/@/views/editor/markdown/index.vue"),
      name: "MarkdownDemo",
      meta: {
        title: t("routes.editor.markdown"),
      },
    },
    {
      path: "tinymce",
      component: () => import("/@/views/editor/tinymce/index.vue"),
      name: "TinymceDemo",
      meta: {
        title: t("routes.editor.tinymceBasic"),
      },
    },
    {
      path: "chartEditor",
      component: () => import("/@/views/editor/chartEditor/index.vue"),
      name: "chartEditor",
      meta: {
        title: t("routes.editor.chartEditor"),
      },
    },
  ],
};

export default dashboard;
