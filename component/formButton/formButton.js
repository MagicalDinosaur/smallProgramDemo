// component/formButton/formButton.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 按钮样式-内联
    fromButtonStyle: {
      type: String,
      value: ''
    },
    // 按钮是否可点击
    fromButtonDisabled: {
      type: Boolean,
      value: ''
    },
    // 按钮标识
    fromButtonMark: {
      type: String,
      value: ''
    },
    // 按钮openType
    fromButtonOpenType: {
      type: String,
      value: ''
    },
    // 按钮文本
    fromButtonText: {
      type: String,
      value: ''
    }
  },
  /**
   * 组件可选属性
   */
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})