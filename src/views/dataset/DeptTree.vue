<template>
  <div class="bg-white mr-4 overflow-hidden">
    <BasicTree
      v-if="isTreeDataExist"
      title="数据集列表"
      :treeData="treeData"
      :actionList="actionList"
      :replaceFields="{ key: 'id' }"
      @select="handleSelect"
    />
    <a-empty v-else />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, toRaw, computed, h } from "vue";
import { BasicTree, TreeItem } from "/@/components/Tree";
import { DeleteOutlined } from "@ant-design/icons-vue";
import { DatasetModel } from "/@/api/sys/model/datasetModel";

export default defineComponent({
  name: "DeptTree",
  components: { BasicTree },
  props: {
    treeData: {
      type: Object as PropType<DatasetModel[]>,
      default: () => [],
    },
  },
  emits: ["select", "delete"],
  setup(props, { emit }) {
    const isTreeDataExist = computed(() => toRaw(props.treeData.length));
    const actionList: ActionItem[] = [
      {
        render: (node) => {
          return h(DeleteOutlined, {
            class: "mr-2",
            onClick: () => {
              emit("delete", node.id);
            },
          });
        },
      },
    ];
    function handleSelect(keys: string, e) {
      emit("select", keys[0]);
    }
    return { handleSelect, actionList, isTreeDataExist };
  },
});
</script>
