import { FormSchema } from "/@/components/Form";

export const schemas: FormSchema[] = [
  {
    field: "title",
    component: "Input",
    label: "数据集名称",
    componentProps: {
      placeholder: "请输入数据集名称",
    },
    required: true,
  },
  {
    field: "disclosure",
    component: "Upload",
    label: "Excel数据",
    required: true,
  },
];
