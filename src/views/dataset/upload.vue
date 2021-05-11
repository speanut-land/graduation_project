<template>
  <PageWrapper title="excel数据导入" contentBackground contentClass="pt-10">
    <BasicForm @register="register" @submit="handleSubmit" />
    <BasicTable
      v-for="(table, index) in tableListRef"
      :key="index"
      title="数据集预览"
      :columns="table.columns"
      :dataSource="table.dataSource"
      :pagination="false"
      :showIndexColumn="false"
    />
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, unref, ref, h, toRaw, computed } from "vue";

import { ImpExcel, ExcelData } from "/@/components/Excel";
import { BasicTable, BasicColumn } from "/@/components/Table";
import { PageWrapper } from "/@/components/Page";
import { BasicForm, useForm, useComponentRegister } from "/@/components/Form";
import { useMessage } from "/@/hooks/web/useMessage";
import { schemas } from "./data";
import { createDataset } from "/@/api/sys/dataset";
import { useUserStore } from "/@/store/modules/user";
import { PageEnum } from "/@/enums/pageEnum";
import router from "/@/router";

export default defineComponent({
  components: { BasicForm, BasicTable, ImpExcel, PageWrapper },

  setup() {
    const { createMessage } = useMessage();
    useComponentRegister("ImpExcel", ImpExcel);
    const [register, { validate, setProps, resetFields }] = useForm({
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 10,
      },
      schemas: [
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
          field: "ImpExcel",
          component: "ImpExcel",
          label: "Excel数据上传",
          componentProps: {
            onSuccess: loadDataSuccess,
          },
        },
      ],
      actionColOptions: {
        offset: 8,
      },
      submitButtonOptions: {
        text: "提交",
      },
    });

    const tableListRef = ref<
      {
        title: string;
        columns?: any[];
        dataSource?: any[];
      }[]
    >([]);

    const userInfo = computed(() => useUserStore.getUserInfo);

    function loadDataSuccess(excelDataList: ExcelData[]) {
      tableListRef.value = [];
      for (const excelData of excelDataList) {
        const {
          header,
          results,
          meta: { sheetName },
        } = excelData;
        const columns: BasicColumn[] = [];
        for (const title of header) {
          columns.push({ title, dataIndex: title });
        }
        tableListRef.value.push({ title: sheetName, dataSource: results, columns });
      }
    }

    async function handleSubmit(values: any) {
      try {
        setProps({
          submitButtonOptions: {
            loading: true,
          },
        });
        const data = {
          title: values.title,
          dataset: toRaw(tableListRef.value[0].dataSource),
          user_id: 1,
        };
        const { code } = createDataset(data);
        if (!code) {
          setProps({
            submitButtonOptions: {
              loading: false,
            },
          });
          tableListRef.value = [];
          await resetFields();
          createMessage.success("提交成功！");
          router.replace(PageEnum.BASE_DATASETLIST);
        }
      } catch (error) {
        console.log(error);
      }
    }

    return {
      loadDataSuccess,
      tableListRef,
      register,
      handleSubmit,
    };
  },
});
</script>
