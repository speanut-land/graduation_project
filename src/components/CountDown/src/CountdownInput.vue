<template>
  <AInput v-bind="$attrs" :class="prefixCls" :size="size" :value="state">
    <template #addonAfter>
      <CountButton :size="size" :count="count" :value="state" :beforeStartFunc="sendCodeApi" />
    </template>
  </AInput>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

import { Input } from "ant-design-vue";
import CountButton from "./CountButton.vue";

import { propTypes } from "/@/utils/propTypes";
import { useDesign } from "/@/hooks/web/useDesign";

import { useRuleFormItem } from "/@/hooks/component/useFormItem";

export default defineComponent({
  name: "CountDownInput",
  components: { [Input.name]: Input, CountButton },
  inheritAttrs: false,
  props: {
    value: propTypes.string,
    size: propTypes.oneOf(["default", "large", "small"]),
    count: propTypes.number.def(60),
    sendCodeApi: {
      type: Function as PropType<() => boolean>,
      default: null,
    },
  },
  setup(props) {
    const { prefixCls } = useDesign("countdown-input");
    const [state] = useRuleFormItem(props);
    return { prefixCls, state };
  },
});
</script>
<style lang="less">
@prefix-cls: ~"countdown-input";

.@{prefix-cls} {
  .ant-input-group-addon {
    padding-right: 0;
    background-color: transparent;
    border: none;

    button {
      font-size: 14px;
    }
  }
}
</style>
