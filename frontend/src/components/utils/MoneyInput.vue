<template>
  <div @keypress="handleInput">
    <b-input id="money-input"
             type="text"
             :value="value"></b-input>
  </div>
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
      handleInput(event) {
        const key = String.fromCharCode(event.charCode)
        const decimalPosition = this.value ? this.value.indexOf('.') : 0
        console.log(decimalPosition, this.caretPosition)
        if (!isNaN(parseInt(key))) {
          event.preventDefault()
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
          event.preventDefault()
          this.caretPosition++
        }
        if (key.match(/[a-z]/gi) !== null) {
          event.preventDefault()
        }

        if (event.code === 'Backspace' || event.code === 'Delete') {
          this.handleDelete()
        }
        const myInput = document.getElementById('money-input');
        this.setCaretPosition(myInput, this.caretPosition)
        this.$emit('input', this.integerValue + '.' + this.decimalValue)
      },
      handleDelete() {
        const decimalPosition = this.value ? this.value.indexOf('.') : 0
        if (decimalPosition > this.caretPosition) {
          this.integerValue = this.integerValue.slice(0, this.integerValue.length - 1)
        } else if (decimalPosition < this.caretPosition){
          this.decimalValue = this.decimalValue.slice(0, this.decimalValue.length - 1)
        } else {
          this.caretPosition = this.caretPosition <= 0 ? this.caretPosition : this.caretPosition - 1
        }
        this.caretPosition = this.caretPosition <= 0 ? this.caretPosition : this.caretPosition - 1
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
