<template>
  <div class="range">
    <div class="label" :style="{left: labelLeft}">
    <!--<div class="label">-->
    <div class="value">{{ value }}</div>
      <!-- <div class="drop"></div>     -->
    </div>
    <div class="input-box">
      <input type="range" :min="start" :max="end" v-model.number="value">
      <!-- <div class="bar"></div> -->
    </div>
  </div>
</template>

<script>
  module.exports = {
    props: ['start', 'end', 'value'],
    watch: {
      value: function value(val) {
        this.$emit('datechanged', val)
      }
    },
    computed: {
      labelLeft () {
        const percentage = ((this.value - this.start) * 100) / (this.end - this.start);
        const clamped = percentage.clamp(2, 95);
        return clamped + '%';
      }
    }
  }
</script>

<style scoped>
.range {
  position: relative;
  text-align: center;
}
.label {
  position: absolute;
  display: inline-block;
  width: 40px;
  top: -24px;
  margin-left: -20px;
  font-family: 'RobotoMono', sans-serif;
}
.value {
  text-align: center;
}

input[type=range] {
  width: 100%; /* Specific width is required for Firefox. */
}

input[type=range]:hover {
  cursor: pointer;
}

input[type=range]:focus {
  outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
}
</style>