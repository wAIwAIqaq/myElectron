<template>
  <div class="g-container">
    <div class="g-warper">
      <div class="g-footer" ref="footer">
        <div
          v-for="(item, index) in new Array(bubblesCount)"
          :key="index"
          class="bubble"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bubblesColors:['#3498BD','#E6A23C','#ff8c66','#d9ff66'],
      bubblesCount:1000
    };
  },
  mounted() {
      this.initBubbles();
  },
  methods: {
    initBubbles() {
      const bubbles = this.$refs["footer"].children;
      let i = 0;
      while (i < this.bubblesCount) {
        const bubble = bubbles[i]
        bubble.setAttribute("style", `background:${this.bubblesColors[i%(this.bubblesColors.length)]}`);
        i++;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.g-container {
  width: 100%;
  height: 100%;
}

.g-wrap {
  width: 100%;
  height: 100%;
  background: #fff;
}

.g-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #3498bd;
  .bubble {
    position: absolute;
    border-radius: 50%;
    background-color: #3498bd;
  }

  @for $i from 0 through 1000 {
    .bubble:nth-child(#{$i}) {
      $width: 30 + random(100) + px;
      left: #{(random(100)) + "%"};
      top: #{(30 + random(100))}px;
      width: $width;
      height: $width;
      animation: moveToTop
        #{(random(2500) + 1500) /
        1000}s
        ease-in-out -#{random(5000) /
        1000}s
        infinite;
    }
  }

  @keyframes moveToTop {
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0.08;
      transform: translate(-50%, -180px) scale(0.3);
    }
  }
}
</style>
