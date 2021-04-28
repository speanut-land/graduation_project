<template>
  <div class="h-full">
    <CodeMirrorEditor :value="getValue" @change="handleValueChange" />
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import CodeMirrorEditor from "./codemirror/CodeMirror.vue";
import { isString } from "/@/utils/is";
export default defineComponent({
  name: "CodeEditor",
  components: { CodeMirrorEditor },
  props: {
    value: {
      type: [Object, String],
    },
  },
  emits: ["change"],
  setup(props, { emit }) {
    const getValue = computed(() => {
      const { value } = props;

      return isString(value)
        ? JSON.stringify(JSON.parse(value), null, 2)
        : JSON.stringify(value, null, 2);
    });

    function handleValueChange(v) {
      emit("change", v);
    }

    return {
      handleValueChange,
      getValue,
    };
  },
});
</script>
