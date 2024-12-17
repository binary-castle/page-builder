<script setup lang="ts">
import OptionWidget from "../OptionWidget.vue";

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const onMoreOptionChange = () => {
  props.modelValue.moreOption = !props.modelValue.moreOption;
  if (props.modelValue.moreOption) {
    props.modelValue.left = props.modelValue.allSide;
    props.modelValue.right = props.modelValue.allSide;
    props.modelValue.top = props.modelValue.allSide;
    props.modelValue.bottom = props.modelValue.allSide;
  } else {
    const value = props.modelValue.top;
    props.modelValue.allSide = props.modelValue.top;
    props.modelValue.left = value;
    props.modelValue.right = value;
    props.modelValue.bottom = value;
  }
}

const onChangeAllSide = () => {
  props.modelValue.left = props.modelValue.allSide;
  props.modelValue.right = props.modelValue.allSide;
  props.modelValue.top = props.modelValue.allSide;
  props.modelValue.bottom = props.modelValue.allSide;
}

</script>

<template>
  <option-widget title="Container Padding" class="border-bottom-0">
    <div class="form-check form-switch form-check-reverse">
      <input class="form-check-input" @change="onMoreOptionChange()" type="checkbox" role="switch"
             id="flexSwitchCheckDefault">
      <label class="form-check-label" for="flexSwitchCheckDefault">More Options</label>
    </div>
  </option-widget>

  <div class="row">
    <div v-if="!props.modelValue.moreOption" class="col-6">
      <div class="option-widget-label">All Side</div>
      <div class="input-group mb-3">
        <input type="number" v-model="props.modelValue.allSide" @input="onChangeAllSide()" class="form-control"
               aria-label="Recipient's username"
               aria-describedby="basic-addon2">
        <span class="input-group-text" id="basic-addon2">px</span>
      </div>
    </div>

    <template v-else>
      <div class="col-6">
        <div class="option-widget-label">Top</div>
        <div class="input-group mb-3">
          <input type="number" v-model="props.modelValue.top" class="form-control" aria-label="Recipient's username"
                 aria-describedby="basic-addon2">
          <span class="input-group-text" id="basic-addon2">px</span>
        </div>
      </div>
      <div class="col-6">
        <div class="option-widget-label">Right</div>
        <div class="input-group mb-3">
          <input type="number" v-model="props.modelValue.right" class="form-control" aria-label="Recipient's username"
                 aria-describedby="basic-addon2">
          <span class="input-group-text" id="basic-addon2">px</span>
        </div>
      </div>
      <div class="col-6">
        <div class="option-widget-label">Left</div>
        <div class="input-group mb-3">
          <input type="number" v-model="props.modelValue.left" class="form-control" aria-label="Recipient's username"
                 aria-describedby="basic-addon2">
          <span class="input-group-text" id="basic-addon2">px</span>
        </div>
      </div>
      <div class="col-6">
        <div class="option-widget-label">Bottom</div>
        <div class="input-group mb-3">
          <input type="number" v-model="props.modelValue.bottom" class="form-control" aria-label="Recipient's username"
                 aria-describedby="basic-addon2">
          <span class="input-group-text" id="basic-addon2">px</span>
        </div>
      </div>
    </template>
  </div>


</template>

<style scoped lang="scss">
.form-check-label {
  font-size: 12px;
  font-weight: 500;
}

.input-group {
  .input-group-text {
    font-size: 13px;
    font-weight: 500;
  }
}

.form-control {
  &:focus {
    box-shadow: none;
  }
}
</style>