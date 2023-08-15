<template>
  <label class="switch">
    <input
      type="checkbox"
      :checked="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      :disabled="disabled"
    />
    <span class="slider"></span>
  </label>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: Boolean
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss">
@import '@/assets/scss/colors';

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 3.75rem;
  height: 2.125rem;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $toggle-red;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 2.125rem;
}

.slider:before {
  position: absolute;
  content: '';
  height: 1.625rem;
  width: 1.625rem;
  left: 0.25rem;
  bottom: 0.25rem;
  background-color: $white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: $toggle-green;
}

input:focus + .slider {
  box-shadow: 0 0 1px $toggle-green;
}

input:checked + .slider:before {
  -webkit-transform: translateX(1.625rem);
  -ms-transform: translateX(1.625rem);
  transform: translateX(1.625rem);
}
</style>
