<template>
  <web-view :src="url"></web-view>
</template>

<script>

  export default {
    //props:['url'],
    computed: {},
    methods: {},
    mounted() {
      this.url = decodeURI(this.$root.$mp.query.url);
    },
    data() {
      return {
        url: ""
      };
    }
  };
</script>

<style scoped>

</style>
