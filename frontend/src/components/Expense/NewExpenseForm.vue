<template>
  <b-form inline @submit="onSubmit">
    <b-select class="mr-2"
              v-model="categoryId"
              :options="categoryOptions"></b-select>
    <b-input class="mr-2"
             type="text"
             v-money
             v-model="total"></b-input>
    <b-input class="mr-2"
             type="text"
             v-model="desc"
             placeholder="Details"></b-input>
    <b-btn type="submit">OK</b-btn>
  </b-form>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import * as types from '../../store/types.js'
  import AppMoneyInput from '../../v-money/component'
  import money from '../../v-money/directive'
  import {unformat} from '../../v-money/utils'

  export default {
    name: "NewExpenseForm",
    data() {
      return {
        categoryId: null,
        total: '',
        desc: null,
      }
    },
    computed: {
      ...mapGetters({
        categories: types.CATEGORIES,
        money: types.MONEY
      }),
      newExpense() {
        return {
          categoryId: this.categoryId,
          total: unformat(this.total, 2),
          desc: this.desc
        }
      },
      categoryOptions() {
        let options = Object.entries(this.categories).map(entry => {
          const id = entry[0]
          const cat = entry[1]
          return {value: id, text: cat.description}
        })
        options.push({value: null, text: 'Select Category'})
        return options
      }
    },
    methods: {
      ...mapMutations({
        addNewExpense: types.ADD_EXPENSE
      }),
      onSubmit(event) {
        event.preventDefault();
        this.addNewExpense(this.newExpense)
        this.$emit('created')
      },
    },
    components: {
      moneyInput: AppMoneyInput
    },
    directives: {
      money
    }
  }
</script>

<style scoped>

</style>
