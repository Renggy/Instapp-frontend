<template>
  <div class="form-floating mb-3">
    <input
      :type="inputType"
      class="form-control"
      :class="{ 'is-invalid': error }"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="label"
      autocomplete="off"
    />
    <label>{{ label }}</label>
    <i
      v-if="isPassword"
      class="bi icon-end"
      :class="isPasswordVisible ? 'bi-eye' : 'bi-eye-slash'"
      @click="togglePasswordVisibility"
    ></i>
    <div v-if="error" class="invalid-feedback">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';

  const props = defineProps({
    modelValue: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    error: {
      type: String,
      default: '',
    },
  });

  defineEmits(['update:modelValue']);
  const isPasswordVisible = ref(false);
  const isPassword        = computed(() => props.type === 'password');
  const inputType         = computed(() => {
    if (isPassword.value) {
      return isPasswordVisible.value ? 'text' : 'password';
    }
    return props.type;
  });

  function togglePasswordVisibility() {
    isPasswordVisible.value = !isPasswordVisible.value;
  }
</script>

<style scoped>
  .icon-end {
    top: 50%;
    right: 15px;
    cursor: pointer;
    position: absolute;
    transform: translateY(-50%);
  }
</style>
