Vue.component('input-number', {
  template: `
    <div class="input-number">
      <input type="text" :value="currentValue" @change="handleChange" />
      <button @click="handleDown" :disable="currentValue <= min">-</button>
      <button @click="handleUp" :disable="currentValue >= max">+</button>
    </div>
  `,
  props: {
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: Infinity
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  watch: {
    currentValue(val) {
      this.$emit('input', val)
      this.$emit('on-change', val)
    },
    value(val) {
      this.updateValue(val)
    }
  },
  methods: {
    updateValue(val) {
      if (val > this.max) val = this.max
      if (val < this.min) val = this.min
      this.currentValue = val
    },
    handleChange(e) {
      const val = e.target.value
      const { min, max } = this
      const regNum = /(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/
      
      if (regNum.test(val.toString())) {
        
        this.currentValue = Math.min(val, max)
        this.currentValue = Math.max(min, val)
        
      } else {
        e.target.value = this.currentValue
      }
    },
    handleDown() {
      if (this.currentValue <= this.min) return
      this.currentValue --
    },
    handleUp() {
      if (this.currentValue >= this.max) return
      this.currentValue ++
    }
  },
  mounted() {
    this.updateValue(this.value)
  }
})