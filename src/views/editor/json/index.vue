<template>
  <PageWrapper title="JSON代码编辑器组件Demo" contentFullHeight fixedHeight contentBackground>
    <CodeEditor :value="value" @change="handleChange" />
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { CodeEditor } from "/@/components/CodeEditor";
import { PageWrapper } from "/@/components/Page";

const jsonData = '{"name":"BeJson","url":"http://www.xxx.com"}';
export default defineComponent({
  components: { CodeEditor, PageWrapper },
  setup() {
    const value = ref(jsonData);

    watch(value, (curr, prevCount) => {
      console.log(curr, prevCount);
    });
    function handleChange(e) {
      console.log(JSON.parse(e));
    }
    return { value, handleChange };
  },
});
</script>
