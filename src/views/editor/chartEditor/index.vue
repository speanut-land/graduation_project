<template>
  <div class="flex">
    <div ref="chartRef" style="height: calc(100vh - 78px)" class="bg-white w-4/5"></div>
    <a-divider type="vertical" class="bg-#7cb305" />
    <div class="w-1/5 bg-white p-3" style="height: calc(100vh - 78px)">
      <div>
        <div class="mb-1">请选择数据集:</div>
        <a-select v-model:value="datasetIdValue" style="width: 100%">
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
      <div class="mt-3" v-if="chartType === 'line'">
        <div class="mb-1">线条类型是否平滑:</div>
        <a-radio-group name="radioGroup" v-model:value="isSmooth">
          <a-radio :value="true">是</a-radio>
          <a-radio :value="false">否</a-radio>
        </a-radio-group>
      </div>
      <div class="mt-3" v-if="chartType === 'line'">
        <div class="mb-1">是否线条面积图:</div>
        <a-radio-group name="radioGroup" v-model:value="isArea">
          <a-radio :value="true">是</a-radio>
          <a-radio :value="false">否</a-radio>
        </a-radio-group>
      </div>
      <div class="mt-3">
        <div class="mb-1">请选择x-axis:</div>
        <a-select v-model:value="xAxisType" style="width: 100%">
          <a-select-option
            v-for="item in xDimension.filter((item) => item !== yAxisType)"
            :key="item"
          >
            {{ item }}
          </a-select-option>
        </a-select>
      </div>
      <div class="mt-3">
        <div class="mb-1">请选择y-axis:</div>
        <a-select v-model:value="yAxisType" style="width: 100%">
          <a-select-option
            v-for="item in yDimension.filter((item) => item !== xAxisType)"
            :key="item"
          >
            {{ item }}
          </a-select-option>
        </a-select>
      </div>
      <div class="mt-3">
        <div class="mb-1">
          <a-button class="mb-1 w-full" type="primary" @click="renderChart">渲染</a-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, Ref, onMounted, toRaw, computed, watch, unref } from "vue";
import type { EChartsOption } from "echarts";

import { useECharts } from "/@/hooks/web/useECharts";
import { CodeEditor } from "/@/components/CodeEditor";
import { getDatasetList } from "/@/api/sys/dataset";
import { DatasetModel } from "/@/api/sys/model/datasetModel";
import { values } from "lodash";
export default defineComponent({
  components: { CodeEditor },
  setup() {
    const chartRef = ref<HTMLDivElement | null>(null);
    const { setOptions, echarts, chartInstance } = useECharts(chartRef as Ref<HTMLDivElement>);
    const datasetOptionList = ref<DatasetModel>([]);
    const datasetIdValue = ref<number>();
    const chartTypeOptionList = [
      { name: "线图", type: "line" },
      { name: "柱状图", type: "bar" },
    ];

    const chartType = ref<string>("line");
    const xAxisType = ref<string>("");
    const yAxisType = ref<string>("");
    const isSmooth = ref<boolean>(false);
    const isArea = ref<boolean>(false);
    const currentDataset = ref<object[]>([]);
    const xDimension = computed(() =>
      currentDataset.value.length ? Object.keys(currentDataset.value[0]) : []
    );
    const yDimension = computed(() => {
      if (!currentDataset.value.length) return [];
      const dataset = currentDataset.value[0];
      const dimension = [];
      for (const [key, value] of Object.entries(dataset)) {
        if (typeof value !== "string") dimension.push(key);
      }
      return dimension;
    });
    const optionConfig = ref<EChartsOption>({
      title: {
        text: "",
      },
      legend: {
        data: yDimension,
      },
      tooltip: {},
      dataset: {
        source: currentDataset,
        dimensions: xDimension,
      },
      xAxis: [{ type: "category" }],
      yAxis: {},
      series: [
        {
          type: chartType,
          smooth: isSmooth,
          encode: {
            x: xAxisType,
            y: yAxisType,
          },
        },
      ],
    });
    onMounted(async () => {
      const { result } = await getDatasetList({ user_id: 1 });
      datasetOptionList.value = result;
      datasetIdValue.value = result[0].id;
      currentDataset.value = JSON.parse(result[0].dataset);
      xAxisType.value = xDimension.value[0];
      yAxisType.value = yDimension.value[1];
      optionConfig.value.title.text = result[0].title;
      console.log(unref(optionConfig));
      renderChart();
    });
    function renderChart() {
      optionConfig.value.series[0].areaStyle = unref(isArea) ? {} : null;
      setOptions(unref(optionConfig));
    }
    watch(optionConfig, (val, preVal) => {
      console.log(val, preVal);
    });
    return {
      chartRef,
      optionConfig,
      datasetIdValue,
      currentDataset,
      chartType,
      chartTypeOptionList,
      datasetOptionList,
      xAxisType,
      yAxisType,
      renderChart,
      xDimension,
      yDimension,
      isSmooth,
      isArea,
    };
  },
});
</script>
