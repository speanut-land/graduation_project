<template>
  <template v-if="getShow">
    <LoginFormTitle />
    <Form class="p-4" :model="formData" :rules="getFormRules" ref="formRef">
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

      <FormItem>
        <Button type="primary" size="large" block @click="handleReset" :loading="loading">
          {{ t("common.resetText") }}
        </Button>
        <Button size="large" block class="mt-4" @click="handleBackLoginWrapper">
          {{ t("sys.login.backSignIn") }}
        </Button>
      </FormItem>
    </Form>
  </template>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, computed, unref, toRaw } from "vue";

import LoginFormTitle from "./LoginFormTitle.vue";
import { Form, Input, Button } from "ant-design-vue";
import { CountdownInput } from "/@/components/CountDown";
import { StrengthMeter } from "/@/components/StrengthMeter";

import { useI18n } from "/@/hooks/web/useI18n";
import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from "./useLogin";
import { func } from "vue-types";
import { useUserStore } from "/@/store/modules/user";

export default defineComponent({
  name: "ForgetPasswordForm",
  components: {
    Button,
    Form,
    FormItem: Form.Item,
    Input,
    InputPassword: Input.Password,
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
      email: "",
      emailCode: "",
      password: "",
      confirmPassword: "",
    });

    const { getFormRules } = useFormRules(formData);
    const { validForm } = useFormValid(formRef);

    const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD);

    async function handleReset() {
      const data = await validForm();
      if (!data) return;
      try {
        loading.value = true;
        const code = await useUserStore().resetUserPwd(
          toRaw({
            password: data.password,
            email: data.email,
            emailCode: data.emailCode,
          })
        );

        if (!code) handleBackLoginWrapper();
      } finally {
        loading.value = false;
      }
    }

    function handleBackLoginWrapper() {
      formRef.value.resetFields();
      handleBackLogin();
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
      handleBackLoginWrapper,
    };
  },
});
</script>
