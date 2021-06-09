<template>
  <a-select v-model:value="modelValue" v-on="formItem.eventObject" v-bind="formItem.props">
    <template v-for="option in formItem.options" :key="option.value">
      <a-select-option :value="option.value">
        {{ option.label }}
      </a-select-option>
    </template>
  </a-select>
</template>
<script lang="ts">
import {defineComponent, PropType, computed} from 'vue'
import {Select} from 'ant-design-vue'
import {FormItem} from "@/hooks/schema";

export default defineComponent({
  name: 'schema-form-select',
  emits: ['update:value'],
  components: {
    [Select.name]: Select,
    [Select.name]: Select, 
    ASelectOption: Select.Option
  },
  props: {
    formItem: { // 表单项
      type: Object as PropType<FormItem>,
      default: () => ({})
    },
    value: undefined as any // 表单项值
  },
  setup(props, {attrs, emit}) {

    const modelValue = computed({
      get: () => props.value,
      set: (val) => emit('update:value', val)
    })

    return {
      modelValue
    }
  }
})
</script>
