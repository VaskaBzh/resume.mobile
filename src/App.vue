<template>
	<ion-app>
		<ion-router-outlet />
	</ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { getUser, user, userProcess } from "@/modules/user/UserService.js";
import { onMounted, onUnmounted } from "vue";
import { setActiveSub, setSubList } from "@/modules/common/SubService.js";
import { useI18n } from "vue-i18n";
import { getMinerstats } from "@/modules/minerstats/services/MinerstatService.js";
import { getCurrencies } from "@/modules/currencies/services/CurrencyService.js";
import { resizeHandler } from "@/modules/viewport/services/ViewportService.js";

const { locale } = useI18n({
  useScope: "global",
})
const storageLocale = localStorage.getItem("locale");
const storageTheme = localStorage.getItem("theme");

if (storageLocale) {
  locale.value = storageLocale;
}

if (storageTheme) {
  switch (storageTheme) {
    case "dark":
      document.body.setAttribute("data-theme", "dark");
      break;

    case "light":
      document.body.setAttribute("data-theme", "light");
      break;

    default:
      document.body.removeAttribute("data-theme");
  }
}

const supportsOrientationChange = "onorientationchange" in window;
const orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
onUnmounted(async () => {
  window.removeEventListener(orientationEvent, resizeHandler);
})

onMounted(async () => {
  window.addEventListener(orientationEvent, resizeHandler);

  userProcess();
	
  await getMinerstats();
  await getCurrencies();
  if (!user.value?.id) {
    return this;
  }

  await setSubList();
  const storageId = localStorage.getItem("activeId");
  if (storageId) {
    await setActiveSub(JSON.parse(storageId));
  } else {
    await setActiveSub();
  }
  await getUser();
})
</script>

<style lang="scss">
.modal__content {
	&:focus-within {
		//.password {
		//	max-height: 402px;
		//}
		//.swiper {
		//	min-height: 100% !important;
		//}
		//.swiper-wrapper {
		//	height: fit-content !important;
		//}
		//[class*="__steps"] {
		//	min-height: 100% !important;
		//}
		//
		//[class*="__block"] {
		//	min-height: 100% !important;
		//}
		//
		//[class*="__step"] {
		//	min-height: 100% !important;
		//}
	}
}

.registration {
	&__pagination {
		.swiper-pagination-bullet  {
			border-radius: 2px;
			transition: all 0.3s ease 0s;
		}
	}
}

.page_refresher_content {
  .spinner-crescent {
    color: var(--primary-500, #2E90FA);
  }
}

/* animation */
.copy-enter-active,
.copy-leave-active {
	transition: all 0.5s ease;
}
.copy-enter-from {
	transform: translateX(40px);
}
.copy-leave-to {
	transform: translateX(40px);
}
.copy-enter-from,
.copy-leave-to {
	opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
	transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
.fade-out-leave-active {
	transition: all 0s ease;
}
.fade-out-enter-active {
	transition: all 0.3s ease;
}
.fade-out-enter-from,
.fade-out-leave-to {
	opacity: 0;
}

.swiper {
	.swiper {
		&-slide {
			text-align: left !important;
		}
	}
}
/* animation */
.modal__content {
  .swiper {
    .swiper {
      &-slide {
        height: fit-content !important;
      }
    }
  }
}
//.header {
//	&__step {
//		width: 100%;
//		min-height: 630px;
//		position: relative;
//		display: flex;
//		flex-direction: column;
//
//		&-last {
//			min-height: fit-content;
//		}
//	}
//}
.card__swiper {
	min-height: 88px;
}
ion-app {
  background: var(--background-bg, #16181A);
}
</style>