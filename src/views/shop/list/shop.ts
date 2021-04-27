import { computed, unref } from "vue";

export function useFormRules() {
  const getGoodsNameFormRule = computed(() => createRule("请输入商品名称"));
  const getGoodsFromFormRule = computed(() => createRule("请输入商品制造商"));
  const getGoodsBgUrlFormRule = computed(() => createRule("请输入商品背景图URL地址"));

  const getFormRules = computed(() => {
    const goodsNameFormRule = unref(getGoodsNameFormRule);
    const goodsFromFormRule = unref(getGoodsFromFormRule);
    const goodsBgUrlFormRule = unref(getGoodsBgUrlFormRule);
    return {
      goods_name: goodsNameFormRule,
      goods_from: goodsFromFormRule,
      goods_img_url: goodsBgUrlFormRule,
    };
  });
  return { getFormRules };
}

function createRule(message: string) {
  return [
    {
      required: true,
      message,
      trigger: "change",
    },
  ];
}
