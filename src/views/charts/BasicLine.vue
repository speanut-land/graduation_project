<template>
  <div class="flex">
    <div class="w-1/3" :style="{ height: `calc(100vh - ${isDisplayJsonError ? 118 : 78}px)` }">
      <a-alert message="Json格式错误" type="error" v-if="isDisplayJsonError" />
      <CodeEditor :value="optionConfig" @change="handleChange" />
    </div>
    <a-divider type="vertical" class="bg-#7cb305" />
    <div ref="chartRef" :style="{ height }" class="bg-white w-2/3"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, Ref, onMounted } from "vue";

import { useECharts } from "/@/hooks/web/useECharts";
import { CodeEditor } from "/@/components/CodeEditor";
import { getLineData } from "./data";

export default defineComponent({
  components: { CodeEditor },
  props: {
    height: {
      type: String as PropType<string>,
      default: "calc(100vh - 78px)",
    },
  },
  setup() {
    const chartRef = ref<HTMLDivElement | null>(null);
    const { setOptions, echarts, chartInstance } = useECharts(chartRef as Ref<HTMLDivElement>);
    const { barData, lineData, category } = getLineData;
    let isDisplayJsonError = ref(false);
    let optionConfig = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
        },
      ],
    };

    function handleChange(e) {
      try {
        optionConfig = JSON.parse(e);
        isDisplayJsonError.value = false;
        setOptions(optionConfig);
      } catch (error) {
        isDisplayJsonError.value = true;
        console.log(error);
      }
    }
    onMounted(() => setOptions(optionConfig));
    return { chartRef, isDisplayJsonError, optionConfig, handleChange };
  },
});
</script>
