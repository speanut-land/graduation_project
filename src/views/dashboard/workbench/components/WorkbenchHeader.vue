<template>
  <div class="flex">
    <Avatar :src="headerImg" :size="72" class="!mx-auto !block" />
    <div class="md:ml-6 flex flex-col mt-2 flex-1">
      <h1 class="md:text-lg text-md">早安, Vben, 开始您一天的工作吧！</h1>
      <span class="text-secondary"> 今日晴，20℃ - 32℃！ </span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import { Avatar } from "ant-design-vue";

import headerImg from "/@/assets/images/header.jpg";
export default defineComponent({
  components: { Avatar },
  setup() {
    return { headerImg };
  },
});
</script>
