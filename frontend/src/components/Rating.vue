<template>
  <div class="rating-container">
    <h2 class="title">Avaliação</h2>
    <div class="level is-mobile">
       <div class="start-container" v-for="(starState, index) in startsState" :key="index">
        <font-awesome-icon :class="{actived: starState}" icon="star" size="3x" @mouseenter="activeStar(index)" @mouseleave="deactivateStar" @click="rating(index)"/>
      </div>
    </div>
   
    <textarea class="textarea" placeholder="e.g. Hello world"></textarea>
    <div class="mt-4 mb-4 level is-mobile">
      <button class="button is-black is-rounded is-fullwidth submit-button"> Enviar </button>
      <button class="button is-rounded is-fullwidth"> Pular </button>
    </div>
  </div>
</template>
 
<script>

 
export default {
  components: {
    
  },
 
  data () {
    return {
      rate: -1,
      startsState: [false, false, false, false, false]
    }
  },
 
  methods: {
   activeStar(index){
     if(this.rate === -1) {
       this.startsState = [false, false, false, false, false].fill(true, 0, index + 1)
     }
   },

   deactivateStar() {
     if(this.rate === -1) {
       this.startsState = [false, false, false, false, false];  
     }
   },

   rating(index){
      this.rate = index + 1;
      this.startsState = [false, false, false, false, false].fill(true, 0, index + 1)
   }
  }
}
</script>

<style>
.actived {
  color: yellow;
}
.start-container {
  display: flex;
  flex-direction: row;
}
</style>