<template>
  <div class="rating-container">
    <h2 class="title">Avaliação</h2>
    <div class="level is-mobile">
      <div
        class="start-container"
        v-for="(starState, index) in startsState"
        :key="index"
      >
        <font-awesome-icon
          :class="{ actived: starState }"
          icon="star"
          size="3x"
          @mouseenter="activeStar(index)"
          @mouseleave="deactivateStar"
          @click="rating(index)"
        />
      </div>
    </div>

    <textarea
      v-model="evaluation"
      class="textarea"
      placeholder="Comentário (Opcional)"
    ></textarea>
    <div class="mt-4 mb-4 buttons">
      <button
        class="button is-black is-rounded is-fullwidth"
        :disabled="grade === -1"
        @click="submitRating"
      >
        Enviar
      </button>
      <button class="button is-rounded is-fullwidth" @click="skip">Pular</button>
    </div>
  </div>
</template>
 
<script>
export default {
  components: {},

  data() {
    return {
      grade: -1,
      startsState: [false, false, false, false, false],
      evaluation: ""
    };
  },

  methods: {
    activeStar(index) {
      if (this.grade === -1) {
        this.startsState = [false, false, false, false, false].fill(
          true,
          0,
          index + 1
        );
      }
    },

    deactivateStar() {
      if (this.grade === -1) {
        this.startsState = [false, false, false, false, false];
      }
    },

    rating(index) {
      this.grade = index + 1;
      this.startsState = [false, false, false, false, false].fill(
        true,
        0,
        index + 1
      );
    },

    submitRating(){
      this.$emit('rating', {
        evaluation: this.evaluation,
        grade: this.grade
      })
    },

    skip() {
      this.$emit('skip');
    }
  },
};
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