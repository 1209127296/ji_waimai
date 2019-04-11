<template>
  <div class="counter-warp">
    <p>Vuex counter：{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>

    <a href="/pages/index/main" class="home">去往首页</a>
    <jlfooter></jlfooter>
  </div>
</template>

<script>
// Use Vuex
import store from './store'
import jlfooter from '@/components/jlfooter'

export default {
  computed: {
    count () {
      return store.state.count
    }
  },
  components:{jlfooter},
  methods: {
    increment () {
      store.commit('increment')
    },
    decrement () {
      store.commit('decrement')
    }
  }
}
</script>

<style>

</style>
