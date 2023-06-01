<template>
  <q-page class="column items-xs-center bg-secondary">
    <section
      class="row-md full-width justify-sm-between q-mt-md-xl"
      style="max-width: 1200px"
    >
      <div class="q-ma-lg q-ma-lg-lg">
        <h4 style="">Solar energy calculation service</h4>
        <p>
          Try out the new solution for calculating the electricity output of
          your devices.
        </p>
        <q-input
          color="dark"
          rounded
          outlined
          class="q-mt-md"
          label="Enter your email"
        />
        <q-btn
          class="q-mt-md"
          style="width: 100%; border-radius: 10px"
          label="Get started!"
          color="primary"
        />
      </div>
      <div class="q-mx-lg justify-sm-between img-container">
        <q-img
          style="border-radius: 10px"
          src="~assets/index-page/chelsea-WvusC5M-TM8-unsplash.jpg"
        >
        </q-img>
      </div>
    </section>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>

<style lang="sass">
.img-container
  body.screen--md &
    width: 50%
    height: 50%
  body.screen--lg &
    width: 50%
    height: 50%
  body.screen--xl &
    width: 50%
    height: 50%
  body.screen--2xl &
    width: 50%
    height: 50%
</style>
