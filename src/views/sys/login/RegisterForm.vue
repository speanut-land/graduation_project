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
      <FormItem name="mobile">
        <Input size="large" v-model:value="formData.mobile" :placeholder="t('sys.login.mobile')" />
      </FormItem>
      <FormItem name="sms">
        <CountdownInput
          size="large"
          v-model:value="formData.sms"
          :placeholder="t('sys.login.smsCode')"
        />
      </FormItem>
      <FormItem name="password">
        <StrengthMeter
          size="large"
          v-model:value="formData.password"
          :placeholder="t('sys.login.password')"
        />
      </FormItem>
      <FormItem name="confirmPassword">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.confirmPassword"
          :placeholder="t('sys.login.confirmPassword')"
        />
      </FormItem>

      <Button type="primary" size="large" block @click="handleRegister" :loading="loading">
        {{ t("sys.login.registerButton") }}
      </Button>
      <Button size="large" block class="mt-4" @click="handleBackLogin">
        {{ t("sys.login.backSignIn") }}
      </Button>
    </Form>
  </template>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, unref, computed } from "vue";

import LoginFormTitle from "./LoginFormTitle.vue";
import { Form, Input, Button, Checkbox } from "ant-design-vue";
import { StrengthMeter } from "/@/components/StrengthMeter";
import { CountdownInput } from "/@/components/CountDown";

import { useI18n } from "/@/hooks/web/useI18n";
import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from "./useLogin";

export default defineComponent({
  name: "RegisterPasswordForm",
  components: {
    Button,
    Form,
    FormItem: Form.Item,
    Input,
    InputPassword: Input.Password,
    Checkbox,
    StrengthMeter,
    CountdownInput,
    LoginFormTitle,
  },
  setup() {
    const { t } = useI18n();
    const { handleBackLogin, getLoginState } = useLoginState();

    const formRef = ref();
    const loading = ref(false);

    const formData = reactive({
      account: "",
      password: "",
      confirmPassword: "",
      mobile: "",
      sms: "",
      policy: false,
    });

    const { getFormRules } = useFormRules(formData);
    const { validForm } = useFormValid(formRef);

    const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER);

    async function handleRegister() {
      const data = await validForm();
      if (!data) return;
      console.log(data);
    }

    return {
      t,
      formRef,
      formData,
      getFormRules,
      handleRegister,
      loading,
      handleBackLogin,
      getShow,
    };
  },
});
</script>
