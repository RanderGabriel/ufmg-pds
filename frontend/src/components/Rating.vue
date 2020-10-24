<template>
  <div class="rating-container">
    <h2 class="title">Avaliação</h2>
    <font-awesome-icon class="start" icon="star" size="3x" :style="{color: 'yellow'}"/>
    <font-awesome-icon class="start" icon="star" size="3x" />
    <input class="input input-text" type="text" placeholder="Comentario (Opcional)">
    <button class="button is-black is-rounded is-fullwidth submit-button"> Enviar </button>
  </div>
</template>
 
<script>

 
export default {
  components: {
    
  },
 
  data () {
    return {
      value: 0,
      items: [
      ]
    }
  },
 
  methods: {
   
  }
}
</script>

<style>
.rating-container {
  display: grid;
  grid-template-areas:
  "title title title"
  "star star star"
  "input input input"
  "button button button";

  grid-row-gap: 10px;
}
.title {
  grid-area: title;
}

.up {
  grid-area: up
}

.down {
  grid-area: down
}

.input-text {
  grid-area: input
}

.submit-button {
  grid-area: button
}
</style>