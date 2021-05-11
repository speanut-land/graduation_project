<template>
  <PageWrapper
    title="数据集列表"
    content="用户的所有数据集"
    contentFullHeight
    fixedHeight
    contentClass="flex"
  >
    <DeptTree class="w-1/5" @select="handleSelect" :treeData="datasetList" @delete="handleDelete" />
    <BasicTable @register="registerTable" class="w-4/5">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增数据集</a-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { BasicTable, useTable } from "/@/components/Table";
import { PageWrapper } from "/@/components/Page";
import DeptTree from "./DeptTree.vue";
import { getDatasetList, deleteDataset } from "/@/api/sys/dataset";
import { DatasetModel } from "/@/api/sys/model/datasetModel";
import { useMessage } from "/@/hooks/web/useMessage";
import { PageEnum } from "/@/enums/pageEnum";
import router from "/@/router";

export default defineComponent({
  components: { BasicTable, PageWrapper, DeptTree },
  setup() {
    const [registerTable, { reload, setProps, setColumns }] = useTable({
      title: "数据集",
      bordered: true,
    });

    const datasetList = ref<DatasetModel[]>([]);
    const datasetIndex = ref<number>(0);

    const { createMessage } = useMessage();
    onMounted(async () => {
      const { result } = await getDatasetList({ user_id: 1 });
      datasetList.value = result;
      setTableProps(0, datasetList.value);
    });

    function handleCreate() {
      router.replace(PageEnum.UPLOAD_DATASET);
    }

    function setTableProps(index: number, datasetList: DatasetModel[]) {
      const dataSource = JSON.parse(datasetList[index].dataset);
      const columns = Object.keys(dataSource[0]).map((item) => ({
        title: item,
        dataIndex: item,
        key: item,
      }));
      setProps({ dataSource });
      setColumns(columns);
    }

    async function handleDelete(id: number) {
      const { code, message } = await deleteDataset({ id });
      if (!code) {
        createMessage.success(message);
        datasetIndex.value = 0;
        datasetList.value = datasetList.value.filter((item) => item.id !== id);
        setTableProps(0, datasetList.value);
      }
    }

    function handleSelect(index) {
      datasetIndex.value = index - 1;
    }

    return {
      registerTable,
      handleCreate,
      handleDelete,
      handleSelect,
      datasetList,
    };
  },
});
</script>
