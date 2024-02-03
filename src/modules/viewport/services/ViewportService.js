import { viewport } from "@/modules/viewport/store/ViewportStore.js";

export function resizeHandler() {
    viewport.value = window.innerWidth
}