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
  <option-widget title="Container Padding">
    <div class="bc-item-center bc-gap-2">
      <input class="bc-checkbox" @change="onMoreOptionChange()" type="checkbox" id="flexSwitchCheckDefault">
      <label class="bc-pointer" for="flexSwitchCheckDefault" style="font-size: 13px">More Options</label>
    </div>
  </option-widget>

  <div>
    <div v-if="!props.modelValue.moreOption" class="d-flex align-items-center justify-content-between bc-gap-2 bc-mb-3"
         style="padding-left: 5px;font-size: 13px">
      <div>All Side</div>
      <div class="bc-input-label-widget">
        <input type="number" min="0" v-model="props.modelValue.allSide" @input="onChangeAllSide()" class="bc-form-control"
               aria-label="Recipient's username"
               aria-describedby="basic-addon2">
        <span class="" id="basic-addon2">px</span>
      </div>
    </div>

    <div v-else class="bc-mb-3" style="padding-left: 5px;font-size: 13px">
      <div class="d-flex align-items-center justify-content-between bc-gap-2 bc-mb-2">
        <div class="">
          <div class="option-widget-label">Top</div>
          <div class="bc-input-label-widget">
            <input type="number" min="0" v-model="props.modelValue.top" class="bc-form-control"
                   aria-label="Recipient's username"
                   aria-describedby="basic-addon2">
            <span id="basic-addon2">px</span>
          </div>
        </div>
        <div class="">
          <div class="option-widget-label">Right</div>
          <div class="bc-input-label-widget">
            <input type="number" min="0" v-model="props.modelValue.right" class="bc-form-control"
                   aria-label="Recipient's username"
                   aria-describedby="basic-addon2">
            <span id="basic-addon2">px</span>
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center justify-content-between bc-gap-2">
        <div class="">
          <div class="option-widget-label">Left</div>
          <div class="bc-input-label-widget">
            <input type="number" min="0" v-model="props.modelValue.left" class="bc-form-control"
                   aria-label="Recipient's username"
                   aria-describedby="basic-addon2">
            <span id="basic-addon2">px</span>
          </div>
        </div>
        <div class="">
          <div class="option-widget-label">Bottom</div>
          <div class="bc-input-label-widget">
            <input type="number" min="0" v-model="props.modelValue.bottom" class="bc-form-control"
                   aria-label="Recipient's username"
                   aria-describedby="basic-addon2">
            <span id="basic-addon2">px</span>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<style scoped lang="scss">
.form-check-label {
  font-size   : 12px;
  font-weight : 500;
}

.input-group {
  .input-group-text {
    font-size   : 13px;
    font-weight : 500;
  }
}

.form-control {
  &:focus {
    box-shadow : none;
  }
}
</style>