<template>
  <page-container>
    <main-loader class="watcher">
      <empty-card
        v-if="!watcherList.length"
        @clicked="
          freshAllowedRoutes();
          clearWatcherForm();
          isAddWatcherOpen = true;
        "
        :image="empty_observer"
        :text="$t('blank_text_watcher')"
        :button_text="$t('info_watcher.button.add')"
      />
      <div class="watcher__content" v-else>
        <main-head class="watcher__head" :title="$t('info_watcher.title[2]')" />
        <div
          class="watcher_button watcher_button-clear"
          id="openAddWatcher"
          @click="
            freshAllowedRoutes();
            clearWatcherForm();
            isAddWatcherOpen = true;
          "
        >
          <main-icon class="watcher_icon icon-large" :icon="plus" />
        </div>
        <div class="watcher__list" id="changeAddWatcher">
          <watcher-card
            v-for="(watcher, i) in watcherList"
            :watcher="watcher"
            :key="i"
            @click="
              setWatcherForm(watcher);
              isChangeWatcherOpen = true;
            "
          />
          <!--              getWatcher(watcher.id) -->
        </div>
      </div>
    </main-loader>
	<main-modal
		@ionModalWillPresent="isChangeWatcherOpen = true"
		@ionModalWillDismiss="isChangeWatcherOpen = false"
		:isOpen="isChangeWatcherOpen"
	>
		<watcher-change-form @close="isChangeWatcherOpen = false" />
	</main-modal>

    <main-modal
      @ionModalWillPresent="isAddWatcherOpen = true"
      @ionModalWillDismiss="isAddWatcherOpen = false"
      :isOpen="isAddWatcherOpen"
    >
      <watcher-add-form @close="isAddWatcherOpen = false"></watcher-add-form>
    </main-modal>
  </page-container>
</template>

<script setup>
import { watch } from "vue";
import {
  clearWatcherForm,
  freshAllowedRoutes,
  getWatcherList,
  isAddWatcherOpen,
  isChangeWatcherOpen,
  setWatcherForm,
  watcherList,
} from "@/modules/watchers/WatcherService.js";
import { activeId } from "@/modules/common/store/SubStore.js";
import { useI18n } from "vue-i18n";
import { WatcherMessage } from "@/modules/watchers/Lang/WatcherMessage.js";
import { useRoute } from "vue-router";
import plus from "@icon/plus.svg";
import PageContainer from "@/modules/common/Components/PageContainer.vue";
import WatcherCard from "@/modules/watchers/Components/WatcherCard.vue";
import WatcherAddForm from "@/modules/watchers/Components/WatcherAddForm.vue";
import MainModal from "@/modules/modal/Components/MainModal.vue";
import empty_observer from "@img/empty-observer.svg";
import MainHead from "@/modules/common/Components/MainHead.vue";
import MainIcon from "@/modules/common/Components/UI/MainIcon.vue";
import WatcherChangeForm from "@/modules/watchers/Components/WatcherChangeForm.vue";
import EmptyCard from "@/modules/common/Components/EmptyCard.vue";
import MainLoader from "@/modules/preloader/Components/MainLoader.vue";

useI18n({
  useScope: "global",
  messages: WatcherMessage,
});

const route = useRoute();

watch(
  () => activeId.value,
  async () => {
    if (route.name === "watcher") {
      await getWatcherList();
    }
  }
);
</script>
<style scoped lang="scss">
.watcher {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  &__content {
    flex: 1 1 auto;
    position: relative;
    padding-top: 8px;
    width: 100%;
  }
  &__list {
    //width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  &_button {
    &-clear {
      position: absolute;
      right: 0;
      top: 0;
      padding: 10px 6px;
    }
  }
}
</style>
