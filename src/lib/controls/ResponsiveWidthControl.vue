<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  modelValue: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  title: string;
  options?: Array<{ value: string; label: string; }>;
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [
    { value: 'width-100', label: 'Full Width' },
    { value: 'width-90', label: '90% Width' },
    { value: 'width-80', label: '80% Width' },
    { value: 'width-75', label: '75% Width' },
    { value: 'width-66', label: '66% Width' },
    { value: 'width-60', label: '60% Width' },
    { value: 'width-50', label: '50% Width' },
    { value: 'width-40', label: '40% Width' },
    { value: 'width-33', label: '33% Width' },
    { value: 'width-25', label: '25% Width' },
    { value: 'width-20', label: '20% Width' },
    { value: 'width-10', label: '10% Width' },
    { value: 'max-width-320', label: 'Max 320px' },
    { value: 'max-width-480', label: 'Max 480px' },
    { value: 'max-width-640', label: 'Max 640px' },
    { value: 'max-width-768', label: 'Max 768px' },
    { value: 'max-width-1024', label: 'Max 1024px' },
    { value: 'max-width-1200', label: 'Max 1200px' },
    { value: 'max-width-1400', label: 'Max 1400px' },
    { value: 'max-width-1600', label: 'Max 1600px' },
    { value: 'max-width-1920', label: 'Max 1920px' },
    { value: 'max-width-100', label: 'Max 100%' },
  ]
});

const emit = defineEmits<{
  (event: 'update:modelValue', value: { mobile: string; tablet: string; desktop: string; }): void;
}>();

const selectedBreakpoint = ref<'mobile' | 'tablet' | 'desktop'>('desktop');

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

    <!-- Width Options Grid -->
    <div class="bcpb:grid bcpb:grid-cols-2 bcpb:gap-2">
      <button
        v-for="option in options"
        :key="option.value"
        @click="setCurrentValue(option.value)"
        class="bcpb:px-3 bcpb:py-2 bcpb:text-xs bcpb:font-medium bcpb:rounded-md bcpb:border bcpb:transition-colors bcpb:duration-200 bcpb:text-left"
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
      <label class="bcpb:block bcpb:text-xs bcpb:font-medium bcpb:text-gray-700">Custom Class</label>
      <input
        type="text"
        :value="getCurrentValue()"
        @input="(e) => setCurrentValue((e.target as HTMLInputElement).value)"
        class="bcpb:w-full bcpb:px-3 bcpb:py-2 bcpb:text-sm bcpb:border bcpb:border-gray-300 bcpb:rounded-md focus:bcpb:outline-none focus:bcpb:ring-2 focus:bcpb:ring-blue-500 focus:bcpb:border-blue-500"
        placeholder="e.g., width-50, max-width-800, etc."
      >
    </div>
  </div>
</template> 