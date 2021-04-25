<template>
  <div>123</div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import { Card } from "ant-design-vue";
import { PageWrapper } from "/@/components/Page";
import WorkbenchHeader from "./components/WorkbenchHeader.vue";
import ProjectCard from "./components/ProjectCard.vue";
import QuickNav from "./components/QuickNav.vue";
import DynamicInfo from "./components/DynamicInfo.vue";
import SaleRadar from "./components/SaleRadar.vue";

export default defineComponent({
  components: {
    PageWrapper,
    WorkbenchHeader,
    ProjectCard,
    QuickNav,
    DynamicInfo,
    SaleRadar,
    Card,
  },
  setup() {
    const loading = ref(true);

    setTimeout(() => {
      loading.value = false;
    }, 1500);

    return {
      loading,
    };
  },
});
</script>
