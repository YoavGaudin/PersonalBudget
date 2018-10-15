<template>
  <b-table v-bind="$attrs">
    <template v-for="f in fields" :slot="f.key" slot-scope="data">
        <span v-if="f.editable && cellEditMode(data.item.key, f.key)" @keypress.enter="exitEditMode">
          <b-input v-if="f.hasOwnProperty('money')" v-money="f.money" size="sm" v-focus type="text"
                   v-model="editedCell"></b-input>
        </span>
      <div v-else
           @click.stop="enterEditMode(data.item.key, f.key)">
        <span v-if="f.hasOwnProperty('money')">{{ format(data.value) }}</span>
        <span v-else>{{ data.value }}</span>
      </div>
    </template>
  </b-table>
</template>

<script>
  import money from '../../v-money/directive'
  import {unformat, format} from '../../v-money/utils'
  import defaultMoney from '../../v-money/options'

  export default {
    name: "EditableTable",
    inheritAttrs: false,
    data() {
      return {
        editMode: {row: null, col: null},
        editedCell: null,
      }
    },
    computed: {
      fields() {
        const fields = this.$attrs.fields
        return fields.map(f => {
          return Object.assign({editable: false}, f)
        })
      },
      rawEditedCell() {
        const tableField = this.fields.find(f => f.key === this.editMode.col)
        if (tableField && tableField.hasOwnProperty('money')) {
          const precision = tableField.money.hasOwnProperty('precision') ? tableField.money.precision : defaultMoney.precision
          return unformat(this.editedCell, precision)
        }
        return this.editedCell
      }
    },
    methods: {
      enterEditMode(row, col) {
        this.editedCell = null
        this.editMode = {row: row, col: col}
      },
      exitEditMode() {
        this.$emit('cellEdited', {col: this.editMode.col, row: this.editMode.row, value: this.rawEditedCell})
        this.editMode = {row: null, col: null}
      },
      cellEditMode(row, col) {
        return this.editMode.row === row && this.editMode.col === col
      },
      format(value) {
        return format(value)
      }
    },
    directives: {
      money,
      focus: {
        inserted(el) {
          el.focus()
        }
      }
    }
  }
</script>

<style scoped>

</style>
