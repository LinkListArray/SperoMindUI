<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';

import { computed, onMounted, ref, h } from 'vue';

import { AuthenticationLogin, VbenInput, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { getCaptchaApi } from '#/api/core';
import { useAuthStore } from '#/store';

defineOptions({ name: 'Login' });

const authStore = useAuthStore();
const captchaKey = ref('');
const captchaImage = ref('');

// 生成验证码
const generateCaptcha = async () => {
  captchaKey.value = Date.now().toString();
  try {
    const captcha = await getCaptchaApi(captchaKey.value);
    captchaImage.value = captcha;
  } catch (error) {
    console.error('Failed to generate captcha:', error);
  }
};

onMounted(() => {
  generateCaptcha();
});

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('authentication.usernameTip'),
      },
      fieldName: 'username',
      label: $t('authentication.username'),
      rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: $t('authentication.password'),
      },
      fieldName: 'password',
      label: $t('authentication.password'),
      rules: z.string().min(1, { message: $t('authentication.passwordTip') }),
    },
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: '请输入验证码',
      },
      fieldName: 'captcha',
      label: '验证码',
      rules: z.string().min(1, { message: '请输入验证码' }),
    },
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: '验证码',
        readonly: true,
        value: captchaImage.value,
      },
      fieldName: 'captchaDisplay',
      label: '验证码图片',
      renderComponentContent: () => {
        return {
          suffix: () => {
            return h('img', {
              src: captchaImage.value,
              alt: '验证码',
              style: 'cursor: pointer; height: 32px;',
              onClick: generateCaptcha,
            });
          },
        };
      },
    },
    {
      component: 'VbenInput',
      componentProps: {
        type: 'hidden',
        value: captchaKey.value,
      },
      fieldName: 'captchaKey',
      label: '',
    },
  ];
});
</script>

<template>
  <AuthenticationLogin
    :form-schema="formSchema"
    :loading="authStore.loginLoading"
    @submit="authStore.authLogin"
  />
</template>
