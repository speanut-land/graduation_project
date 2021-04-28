<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex"> 123123</PageWrapper>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import { BasicTable, useTable, TableAction } from "/@/components/Table";
import { getAccountList } from "/@/api/demo/system";
import { PageWrapper } from "/@/components/Page";
import DeptTree from "./DeptTree.vue";

import { useModal } from "/@/components/Modal";
import AccountModal from "./AccountModal.vue";

import { columns, searchFormSchema } from "./account.data";

export default defineComponent({
  name: "asd",
  components: {},
  setup() {
    return {};
  },
});
</script>
