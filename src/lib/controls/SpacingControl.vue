<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  modelValue: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  title: string;
  type: 'space-x' | 'space-y' | 'gap';
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: { mobile: string; tablet: string; desktop: string; }): void;
}>();

const selectedBreakpoint = ref<'mobile' | 'tablet' | 'desktop'>('desktop');

const spacingOptions = [
  { value: '0', label: '0' },
  { value: '4', label: '4px' },
  { value: '8', label: '8px' },
  { value: '12', label: '12px' },
  { value: '16', label: '16px' },
  { value: '20', label: '20px' },
  { value: '24', label: '24px' },
  { value: '32', label: '32px' },
  { value: '40', label: '40px' },
  { value: '48', label: '48px' },
  { value: '56', label: '56px' },
  { value: '64', label: '64px' },
  { value: '80', label: '80px' },
  { value: '96', label: '96px' },
  { value: '112', label: '112px' },
  { value: '128', label: '128px' },
];

const updateValue = (breakpoint: 'mobile' | 'tablet' | 'desktop', value: string) => {
  const newValue = { ...props.modelValue };
  newValue[breakpoint] = value;
  emit('update:modelValue', newValue);
};

const getCurrentValue = () => {
  return props.modelValue[selectedBreakpoint.value];
};

const setCurrentValue = (value: string) => {
  updateValue(selectedBreakpoint.value, value);
};

const getSpacingClass = (value: string) => {
  if (!value) return '';
  return `${props.type}-${value}`;
};
</script>

<template>
  <div class="bcpb:space-y-3">
    <div class="bcpb:flex bcpb:items-center bcpb:justify-between">
      <h4 class="bcpb:text-sm bcpb:font-medium bcpb:text-gray-700">{{ title }}</h4>
      
      <!-- Breakpoint Tabs -->
      <div class="bcpb:flex bcpb:bg-gray-100 bcpb:rounded-lg bcpb:p-1">
        <button
          v-for="breakpoint in (['mobile', 'tablet', 'desktop'] as const)"
          :key="breakpoint"
          @click="selectedBreakpoint = breakpoint"
          class="bcpb:px-3 bcpb:py-1 bcpb:text-xs bcpb:font-medium bcpb:rounded-md bcpb:transition-colors bcpb:duration-200"
          :class="{
            'bcpb:bg-white bcpb:text-gray-900 bcpb:shadow-sm': selectedBreakpoint === breakpoint,
            'bcpb:text-gray-600 hover:bcpb:text-gray-900': selectedBreakpoint !== breakpoint
          }"
        >
          <span v-if="breakpoint === 'mobile'" class="bcpb:hidden sm:bcpb:inline">Mobile</span>
          <span v-if="breakpoint === 'mobile'" class="bcpb:inline sm:bcpb:hidden">M</span>
          <span v-if="breakpoint === 'tablet'" class="bcpb:hidden sm:bcpb:inline">Tablet</span>
          <span v-if="breakpoint === 'tablet'" class="bcpb:inline sm:bcpb:hidden">T</span>
          <span v-if="breakpoint === 'desktop'" class="bcpb:hidden sm:bcpb:inline">Desktop</span>
          <span v-if="breakpoint === 'desktop'" class="bcpb:inline sm:bcpb:hidden">D</span>
        </button>
      </div>
    </div>

    <!-- Spacing Options Grid -->
    <div class="bcpb:grid bcpb:grid-cols-4 bcpb:gap-2">
      <button
        v-for="option in spacingOptions"
        :key="option.value"
        @click="setCurrentValue(option.value)"
        class="bcpb:px-3 bcpb:py-2 bcpb:text-xs bcpb:font-medium bcpb:rounded-md bcpb:border bcpb:transition-colors bcpb:duration-200"
        :class="{
          'bcpb:bg-blue-600 bcpb:text-white bcpb:border-blue-600': getCurrentValue() === option.value,
          'bcpb:bg-white bcpb:text-gray-700 bcpb:border-gray-300 hover:bcpb:bg-gray-50 hover:bcpb:border-gray-400': getCurrentValue() !== option.value
        }"
      >
        {{ option.label }}
      </button>
    </div>

    <!-- Custom Input -->
    <div class="bcpb:space-y-2">
      <label class="bcpb:block bcpb:text-xs bcpb:font-medium bcpb:text-gray-700">Custom Value</label>
      <input
        type="text"
        :value="getCurrentValue()"
        @input="(e) => setCurrentValue((e.target as HTMLInputElement).value)"
        class="bcpb:w-full bcpb:px-3 bcpb:py-2 bcpb:text-sm bcpb:border bcpb:border-gray-300 bcpb:rounded-md focus:bcpb:outline-none focus:bcpb:ring-2 focus:bcpb:ring-blue-500 focus:bcpb:border-blue-500"
        :placeholder="`e.g., 16, 32, 64, or custom value`"
      >
    </div>

    <!-- Preview -->
    <div class="bcpb:mt-3 bcpb:p-3 bcpb:bg-gray-50 bcpb:rounded-md">
      <div class="bcpb:text-xs bcpb:text-gray-600 bcpb:mb-2">Preview:</div>
      <div class="bcpb:text-sm bcpb:font-mono bcpb:text-gray-800">
        {{ getSpacingClass(getCurrentValue()) || 'No spacing' }}
      </div>
    </div>
  </div>
</template> 