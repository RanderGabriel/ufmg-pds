<template>
  <div>
    <div class="box">
      <h2 class="title is-2"> Avaliações </h2>
      <div v-for="(evaluation, index) in evaluations" :key="index">
        <article class="message mb-4">
          <div class="message-header">
            <p>Por {{ evaluation.createdBy }}</p>
            <div v-for="n in evaluation.grade" :key="n">
              <font-awesome-icon
                :style="{ color: 'yellow' }"
                icon="star"
              />
            </div>
          </div>

          <div class="message-body">
            {{ evaluation.comment ? evaluation.comment : "(Vázio)" }}
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    evaluations: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
</style>