<template>
  <a-button type="primary">创建商品</a-button>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item label="商品名称" name="goods_name">
      <a-input v-model:value="formState.goods_name" />
    </a-form-item>
    <a-form-item label="商品余量" name="good_count">
      <a-input-number name="good_count" :min="0" :defaultValue="0"> </a-input-number>
    </a-form-item>
    <a-form-item label="商品价格" name="goods_price">
      <a-input-number v-model:value="formState.goods_price" :min="0" /> 元
    </a-form-item>
    <a-form-item label="商品保质期" name="goods_life">
      <a-input-number v-model:value="formState.goods_life" /> 天
    </a-form-item>
    <a-form-item label="商品生产日期" name="goods_birth_time">
      <a-date-picker v-model:value="formState.goods_birth_time" defaultPickerValue />
    </a-form-item>
    <a-form-item label="商品类别" name="goods_category">
      <a-select v-model:value="formState.goods_category">
        <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
          {{ (i + 9).toString(36) + i }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="商品制造商" name="goods_from">
      <a-input v-model:value="formState.goods_from" />
    </a-form-item>
    <a-form-item label="商品背景图URL地址" name="goods_img_url"
      ><a-input v-model:value="formState.goods_img_url" />
    </a-form-item>
    <a-row>
      <a-col :offset="4">
        <a-button>取消</a-button>
        <a-button type="primary" class="ml-8" @click="onSubmit">确定</a-button>
      </a-col>
    </a-row>
  </a-form>
</template>
<script lang="ts">
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import moment from "moment";
import { defineComponent, reactive, ref, toRaw, UnwrapRef } from "vue";
import { GoodsModel } from "/@/api/sys/model/goodsModel";

export default defineComponent({
  setup() {
    const formRef = ref();
    const formState: UnwrapRef<GoodsModel> = reactive({
      goods_count: 0,
      goods_life: 0,
      goods_price: 0,
      goods_name: "",
      goods_from: "",
      goods_birth_time: moment(new Date()),
      goods_category: "",
      goods_img_url: "",
    });
    const rules = {
      goods_name: [{ required: true, message: "请输入商品名称", trigger: "change" }],
      goods_from: [{ required: true, message: "请输入商品制造商", trigger: "change" }],
      goods_img_url: [{ required: true, message: "请输入商品背景图URL地址", trigger: "change" }],
    };
    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log("values", formState, toRaw(formState));
        })
        .catch((error: ValidateErrorEntity<FormState>) => {
          console.log("error", error);
        });
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };
    return {
      formRef,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formState,
      rules,
      onSubmit,
      resetForm,
    };
  },
});
</script>
