<template>
  <b-input id="money-input"
           type="text"
           :value="value"
           :formatter="handleInput"></b-input>
</template>

<script>
  import {mapGetters} from 'vuex'
  import * as types from '../../store/types.js'

  export default {
    props: {
      value: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        caretPosition: 0,
        integerValue: '',
        decimalValue: ''
      }
    },
    methods: {
      handleInput(value, event) {
        const key = value.toString().replace(this.value, '')
        const decimalPosition = this.value ? this.value.indexOf('.') : 0
        console.log(decimalPosition, this.caretPosition)
        if (!isNaN(parseInt(key))) {

          if (decimalPosition >= this.caretPosition) {
            this.integerValue += key
            this.caretPosition++
          } else {
            if (this.decimalValue.length < 2) {
              this.decimalValue += key
              this.caretPosition++
            }
          }

        } else if (key === '.') {
          this.caretPosition++
        }

        const myInput = document.getElementById('money-input');
        this.setCaretPosition(myInput, this.caretPosition)
        return this.integerValue + '.' + this.decimalValue
      },
      setCaretPosition(ctrl, pos) {
        // Modern browsers
        if (ctrl.setSelectionRange) {
          ctrl.focus();
          ctrl.setSelectionRange(pos, pos);
        }
      }

    }
  }
</script>

<style scoped>
</style>
