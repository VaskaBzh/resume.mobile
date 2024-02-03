<template>
  <div class="head">
    <main-title class="head_title" v-if="title">{{ title }}</main-title>
    <main-text class="head_text" v-if="text">{{ text }}</main-text>
  </div>
</template>

<script setup>
import MainText from "@/modules/common/Components/UI/MainText.vue";
import MainTitle from "@/modules/common/Components/UI/MainTitle.vue";

defineProps({
  title: {
    type: String,
    default: "",
  },
  text: {
    type: String,
  },
});
</script>

<style scoped lang="scss">
.head {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
  &-no-theme {
  	.head {
	  &_title {
		color: #f1f1f2;
	  }
	  &_text {
	    color: #6F7682;
	  }
    }
  }
  &-low {
    margin-bottom: 16px;
    .head {
      &_title {
        font-size: map-get($body, "font-size");
        line-height: map-get($body, "line-height");
        letter-spacing: map-get($body, "letter-spacing");
        text-align: left;
        font-weight: 700;
      }
      &_text {
        font-size: 13px;
        font-weight: 400;
        line-height: 18px;
        letter-spacing: -0.08px;
        text-align: left;
      }
    }
  }
  &_title {
    text-align: left;
    font-size: map-get($title_2, "font-size");
    font-weight: 700;
    line-height: map-get($title_2, "line-height");
    letter-spacing: map-get($title_2, "letter-spacing");
  }
  &_text {
    text-align: left;
  }
  &-center {
    .head {
      &_title,
      &_text {
        text-align: center;
      }
    }
  }
}
</style>
