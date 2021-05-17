<template>
  <PageWrapper title="MarkDown组件示例">
    <MarkDown :value="value" @change="handleChange" ref="markDownRef" />
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, ref, unref } from "vue";
import { MarkDown, MarkDownActionType } from "/@/components/Markdown";
import { PageWrapper } from "/@/components/Page";

export default defineComponent({
  components: { MarkDown, PageWrapper },
  setup() {
    const markDownRef = ref<Nullable<MarkDownActionType>>(null);
    const valueRef = ref(`
# title

# content
`);

    function handleChange(v: string) {
      valueRef.value = v;
    }

    return {
      value: valueRef,
      markDownRef,
      handleChange,
    };
  },
});
</script>
