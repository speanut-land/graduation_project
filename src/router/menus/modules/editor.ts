import type { MenuModule } from "/@/router/types";
import { t } from "/@/hooks/web/useI18n";

const menu: MenuModule = {
  orderNo: 50,
  menu: {
    name: t("routes.editor.editor"),
    path: "editor",
    children: [
      {
        path: "json",
        name: t("routes.editor.jsonEditor"),
      },
      {
        path: "markdown",
        name: t("routes.editor.markdown"),
        children: [
          {
            path: "index",
            name: t("routes.editor.tinymceBasic"),
          },
        ],
      },
      {
        path: "tinymce",
        name: t("routes.editor.tinymce"),
        children: [
          {
            path: "index",
            name: t("routes.editor.tinymceBasic"),
          },
        ],
      },
    ],
  },
};
export default menu;
