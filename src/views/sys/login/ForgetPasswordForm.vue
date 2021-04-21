<template>
  <template v-if="getShow">
    <LoginFormTitle />
    <Form class="p-4" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="account">
        <Input
          size="large"
          v-model:value="formData.account"
          :placeholder="t('sys.login.userName')"
        />
      </FormItem>

      <FormItem name="sms">
        <CountdownInput
          size="large"
          v-model:value="formData.sms"
          :placeholder="t('sys.login.emailCode')"
        />
      </FormItem>

      <FormItem name="password">
        <StrengthMeter
          size="large"
          autocomplete
          v-model:value="formData.password"
          :placeholder="t('sys.login.password')"
        />
      </FormItem>

      <FormItem>
        <Button type="primary" size="large" block @click="handleReset" :loading="loading">
          {{ t("common.resetText") }}
        </Button>
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t("sys.login.backSignIn") }}
        </Button>
      </FormItem>
    </Form>
  </template>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, computed, unref } from "vue";

import LoginFormTitle from "./LoginFormTitle.vue";
import { Form, Input, Button } from "ant-design-vue";
import { CountdownInput } from "/@/components/CountDown";
import { StrengthMeter } from "/@/components/StrengthMeter";

import { useI18n } from "/@/hooks/web/useI18n";
import { useLoginState, useFormRules, LoginStateEnum } from "./useLogin";

export default defineComponent({
  name: "ForgetPasswordForm",
  components: {
    Button,
    Form,
    FormItem: Form.Item,
    Input,
    StrengthMeter,
    CountdownInput,
    LoginFormTitle,
  },
  setup() {
    const { t } = useI18n();
    const { handleBackLogin, getLoginState } = useLoginState();
    const { getFormRules } = useFormRules();

    const formRef = ref();
    const loading = ref(false);

    const formData = reactive({
      account: "",
      mobile: "",
      sms: "",
    });

    const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD);

    async function handleReset() {
      const form = unref(formRef);
      if (!form) return;
      await form.resetFields();
    }

    return {
      t,
      formRef,
      formData,
      getFormRules,
      handleReset,
      loading,
      handleBackLogin,
      getShow,
    };
  },
});
</script>
