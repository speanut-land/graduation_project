<template>
  <LoginFormTitle v-show="getShow" />
  <Form class="p-4" :model="formData" :rules="getFormRules" ref="formRef" v-show="getShow">
    <FormItem name="username">
      <Input
        size="large"
        v-model:value="formData.username"
        :placeholder="t('sys.login.userName')"
      />
    </FormItem>
    <FormItem name="password">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        autocomplete
        :placeholder="t('sys.login.password')"
      />
    </FormItem>

    <ARow>
      <ACol :span="12">
        <FormItem>
          <Checkbox v-model:checked="formData.isRemember" size="small">
            {{ t("sys.login.rememberMe") }}
          </Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="12">
        <FormItem class="text-right">
          <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
            {{ t("sys.login.forgetPassword") }}
          </Button>
        </FormItem>
      </ACol>
    </ARow>

    <ARow class="flex justify-between">
      <ACol :span="11">
        <Button type="primary" block @click="handleLogin" :loading="loading">
          {{ t("sys.login.loginButton") }}
        </Button>
      </ACol>
      <ACol :span="11">
        <Button block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{ t("sys.login.registerButton") }}
        </Button>
      </ACol>
    </ARow>
  </Form>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRaw, unref, computed } from "vue";

import { Checkbox, Form, Input, Row, Col, Button, Divider } from "ant-design-vue";
import LoginFormTitle from "./LoginFormTitle.vue";

import { useI18n } from "/@/hooks/web/useI18n";
import { useMessage } from "/@/hooks/web/useMessage";

import { useUserStore } from "/@/store/modules/user";
import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from "./useLogin";
import { useDesign } from "/@/hooks/web/useDesign";
import { onKeyStroke } from "@vueuse/core";

export default defineComponent({
  name: "LoginForm",
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    Checkbox,
    Button,
    Form,
    FormItem: Form.Item,
    Input,
    Divider,
    LoginFormTitle,
    InputPassword: Input.Password,
  },
  setup() {
    const { t } = useI18n();
    const { notification } = useMessage();
    const userStore = useUserStore();

    const { setLoginState, getLoginState } = useLoginState();
    const { getFormRules } = useFormRules();

    const formRef = ref();
    const loading = ref(false);

    const formData = reactive({
      username: "",
      password: "",
      isRemember: false,
    });

    const { validForm } = useFormValid(formRef);

    onKeyStroke("Enter", handleLogin);

    const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

    async function handleLogin() {
      const data = await validForm();
      if (!data) return;
      try {
        loading.value = true;
        const userInfo = await userStore.login(
          toRaw({
            password: data.password,
            username: data.username,
            isRemember: data.isRemember,
          })
        );
        if (userInfo) {
          notification.success({
            message: t("sys.login.loginSuccessTitle"),
            description: `${t("sys.login.loginSuccessDesc")}: ${userInfo.username}`,
            duration: 3,
          });
        }
      } finally {
        loading.value = false;
      }
    }

    return {
      t,
      formRef,
      formData,
      getFormRules,
      handleLogin,
      loading,
      setLoginState,
      LoginStateEnum,
      getShow,
    };
  },
});
</script>
