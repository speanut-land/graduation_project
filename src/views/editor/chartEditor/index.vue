<template>
  <div class="flex">
    <div ref="chartRef" :style="{ height }" class="bg-white w-4/5"></div>
    <a-divider type="vertical" class="bg-#7cb305" />
    <div class="w-1/5 bg-white p-3" :style="{ height }">
      <div>
        <div class="mb-1">请选择数据集:</div>
        <a-select v-model:value="datasetValue" style="width: 100%">
          <a-select-option v-for="item in datasetOptionList" :key="item.id">
            {{ item.title }}
          </a-select-option>
        </a-select>
      </div>
      <div class="mt-3">
        <div class="mb-1">请选择图表类型:</div>
        <a-select v-model:value="chartType" style="width: 100%">
          <a-select-option v-for="item in chartTypeOptionList" :key="item.type">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </div>
      <div class="mt-3">
        <div class="mb-1">请选择x-axis:</div>
        <a-select v-model:value="xAxisType" style="width: 100%">
          <a-select-option v-for="item in xAxisOptionList" :key="item">
            {{ item }}
          </a-select-option>
        </a-select>
      </div>
      <div class="mt-3">
        <div class="mb-1">请选择y-axis:</div>
        <a-select v-model:value="yAxisType" style="width: 100%">
          <a-select-option v-for="item in yAxisOptionList" :key="item">
            {{ item }}
          </a-select-option>
        </a-select>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, Ref, onMounted } from "vue";

import { useECharts } from "/@/hooks/web/useECharts";
import { CodeEditor } from "/@/components/CodeEditor";
import { getDatasetList } from "/@/api/sys/dataset";
import { DatasetModel } from "/@/api/sys/model/datasetModel";

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
    const datasetOptionList = ref<DatasetModel>([]);
    const datasetValue = ref<number>();
    const chartTypeOptionList = [
      { name: "线图", type: "line" },
      { name: "柱状图", type: "bar" },
    ];
    const xAxisOptionList = ref<string>([]);
    const yAxisOptionList = ref<string>([]);
    const chartType = ref<string>("line");
    const xAxisType = ref<string>("");
    const yAxisType = ref<string>("");
    onMounted(async () => {
      const { result } = await getDatasetList({ user_id: 1 });
      datasetOptionList.value = result;
      datasetValue.value = result[0].id;
      setOptions(optionConfig);
    });
    let optionConfig = {
      xAxis: {
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {},
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
        },
      ],
    };

    return {
      chartRef,
      optionConfig,
      datasetValue,
      chartType,
      chartTypeOptionList,
      datasetOptionList,
      xAxisOptionList,
      yAxisOptionList,
      xAxisType,
      yAxisType,
    };
  },
});
</script>
