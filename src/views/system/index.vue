<template>
  <div>123123</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import { BasicTable, useTable, TableAction } from "/@/components/Table";

import { useModal } from "/@/components/Modal";

export default defineComponent({
  name: "DeptManagement",
  components: { BasicTable, DeptModal, TableAction },
  setup() {
    return {};
  },
});
</script>
