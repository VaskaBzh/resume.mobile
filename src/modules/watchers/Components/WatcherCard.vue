<template>
  <article class="watcher-card">
    <p class="watcher-name">{{ watcher.name }}</p>
    <div class="items">
      <span
        class="watcher-item"
        v-for="(tab, i) in checkedWatcherRoutes"
        :key="i"
      >
        {{ $t(tab.name) }}
      </span>
    </div>
    <main-copy
	    :text="url"
	    lowBlock
	    class="copy-link_text"
    />
    <div class="open-watcher">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 3C11.1716 3 10.5 3.67157 10.5 4.5C10.5 5.32843 11.1716 6 12 6C12.8284 6 13.5 5.32843 13.5 4.5C13.5 3.67157 12.8284 3 12 3Z"
          stroke="#D0D5DD"
          stroke-width="1.5"
        />
        <path
          d="M12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5Z"
          stroke="#D0D5DD"
          stroke-width="1.5"
        />
        <path
          d="M12 18C11.1716 18 10.5 18.6716 10.5 19.5C10.5 20.3284 11.1716 21 12 21C12.8284 21 13.5 20.3284 13.5 19.5C13.5 18.6716 12.8284 18 12 18Z"
          stroke="#D0D5DD"
          stroke-width="1.5"
        />
      </svg>
    </div>
  </article>
</template>
<script setup>
import { WatcherMessage } from "../Lang/WatcherMessage";
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { defaultAllowedRoutes } from "@/modules/watchers/WatcherService.js";
import MainCopy from "@/modules/common/Components/UI/MainCopy.vue";

const props = defineProps(["watcher"]);

const url = `https://all-btc.com/watcher${new URL(props.watcher.url).search}`;

const { t } = useI18n({
  useScope: "global",
  messages: WatcherMessage,
});

const checkedWatcherRoutes = computed(() => {
  const defaultAllowedRoutesCopy = [...defaultAllowedRoutes];

  return defaultAllowedRoutesCopy
    .map((routeObject) => {
      if (props.watcher.allowed_routes.includes(routeObject.routes[0])) {
        return routeObject;
      }
    })
    .filter(Boolean);
});
</script>
<style scoped lang="scss">
.copy-link_text {
	border-radius: 8px;
	--border-color: var(--gray-100, #2C2F34);
	--background: var(--gray-100, #2C2F34);
	--min-height: 30px;
	--max-height: 30px;
	
	box-shadow: 1px 2px 4px -2px rgba(29, 29, 29, 0.10);
}
.watcher-card {
  width: 100%;
  position: relative;
  margin-bottom: 8px;
  border-radius: 16px;
  padding: 12px 16px 16px;
  background: var(--secondary-color-1, #212327);
  box-shadow: 2px 3px 6px -2px rgba(9, 10, 11, 0.10);
}
.watcher-name {
  color: var(--gray-80080, rgba(241, 241, 242, 0.80));
  font-weight: 600;
  letter-spacing: -0.5px;
  padding-bottom: 8px;
  font-family: SFProT, serif;
  font-size: map-get($sub_headline, "font-size");
  line-height: map-get($sub_headline, "line-height");
}
.items {
  display: flex;
  gap: 8px;
}
.watcher-item {
  font-family: SFProT, serif;
  color: var(--primary-500, #2E90FA);
  font-size: map-get($foot_note, "font-size");
  line-height: map-get($foot_note, "line-height");
  letter-spacing: map-get($foot_note, "letter-spacing");
  border-radius: 6px;
  background: var(--background-second);
  box-shadow: 1px 1px 6px -2px rgba(29, 41, 57, 0.05);
  padding: 4px 8px;
}
.open-watcher {
  position: absolute;
  top: 12px;
  right: 8px;
}
</style>
