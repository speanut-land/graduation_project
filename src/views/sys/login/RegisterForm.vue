<template>
  <template v-if="getShow">
    <LoginFormTitle />
    <Form class="p-4" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="username">
        <Input
          size="large"
          v-model:value="formData.username"
          :placeholder="t('sys.login.userName')"
        />
      </FormItem>
      <FormItem name="email">
        <Input size="large" v-model:value="formData.email" :placeholder="t('sys.login.email')" />
      </FormItem>
      <FormItem name="emailCode">
        <CountdownInput
          size="large"
          v-model:value="formData.emailCode"
          :placeholder="t('sys.login.emailCode')"
        />
      </FormItem>
      <FormItem name="password">
        <StrengthMeter
          size="large"
          v-model:value="formData.password"
          autocomplete
          :placeholder="t('sys.login.password')"
        />
      </FormItem>
      <FormItem name="confirmPassword">
        <InputPassword
          size="large"
          visibilityToggle
          autocomplete
          v-model:value="formData.confirmPassword"
          :placeholder="t('sys.login.confirmPassword')"
        />
      </FormItem>

      <Button type="primary" size="large" block @click="handleRegister" :loading="loading">
        {{ t("sys.login.registerButton") }}
      </Button>
      <Button size="large" block class="mt-4" @click="handleBackLoginWrapper">
        {{ t("sys.login.backSignIn") }}
      </Button>
    </Form>
  </template>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, unref, computed, toRaw } from "vue";

import LoginFormTitle from "./LoginFormTitle.vue";
import { Form, Input, Button, Checkbox } from "ant-design-vue";
import { StrengthMeter } from "/@/components/StrengthMeter";
import { CountdownInput } from "/@/components/CountDown";

import { useI18n } from "/@/hooks/web/useI18n";
import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from "./useLogin";
import { useUserStore } from "/@/store/modules/user";

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
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      emailCode: "",
    });

    const { getFormRules } = useFormRules(formData);
    const { validForm } = useFormValid(formRef);

    const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER);

    function handleBackLoginWrapper() {
      formRef.value.resetFields();
      handleBackLogin();
    }

    async function handleRegister() {
      const data = await validForm();
      if (!data) return;
      try {
        loading.value = true;
        const code = await useUserStore().registerUser(
          toRaw({
            password: data.password,
            username: data.username,
            email: data.email,
            emailCode: data.emailCode,
          })
        );

        if (!code) handleBackLoginWrapper();
      } finally {
        loading.value = false;
      }
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
      handleBackLoginWrapper,
    };
  },
});
</script>
