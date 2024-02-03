<template>
  <div class="chart chart-bar">
    <main-label class="headline">{{ $t("statistic.graph[0]") }}</main-label>
    <div ref="chart" class="container-chart">
      <div ref="tooltip" class="tooltip" style="opacity: 0">
        <div class="tooltip__content">
          <p class="tooltip_text">
            <span class="tooltip_value-date"
              >{{ isNaN(service.time) ? "" : service.time }}.{{
                isNaN(service.fullDate) ? ".." : service.fullDate
              }}</span
            >
          </p>
          <p class="tooltip_text tooltip_text-mining">
            <!--                        <span class="tooltip_label">-->
            <!--                            {{ $t("statistic.graph[1]") }}:-->
            <!--                        </span>-->
            <span class="tooltip_value"> {{ service.mining || 0 }} BTC </span>
          </p>
        </div>
      </div>
      <tooltip-bar-icon
        ref="tooltip_icon"
        class="tooltip_icon"
        style="opacity: 0"
      />
    </div>
  </div>
</template>

<script setup>
import TooltipBarIcon from "@/modules/graphs/icons/TooltipBarIcon.vue";
import { StatisticMessage } from "@/modules/statistic/Lang/StatisticMessage.js";
import { ColumnGraphService } from "@/modules/graphs/services/ColumnGraphService";
import MainLabel from "@/modules/common/Components/UI/MainLabel.vue";
import { useI18n } from "vue-i18n";
import { viewport } from "@/modules/viewport/store/ViewportStore.js";
import { watch, defineProps, onMounted, ref, onUnmounted } from "vue";

const props = defineProps({
  graphData: Object,
  height: Number,
})

const { t } = useI18n({
  useScope: "global",
  messages: StatisticMessage,
});

const service = ref(new ColumnGraphService());
const chart = ref(null);
const tooltip = ref(null);
const tooltip_icon = ref(null);

function graphInit() {
  if (props.graphData) {
    service
        .value
        .setGraphData(props.graphData)
        .setContainerHeight(props.height)
        .setContainerWidth(chart.value.offsetWidth)
        .createSvg()
        .setY()
        .setX()
        .graphAppends()
        .setMobileSvgEvents();
  }
}

watch(() => viewport.value, () => {
  service.value.setGraphData(props.graphData).dropGraph();
  graphInit();
});

watch(() => props.graphData, () => {
  service.value.setGraphData(props.graphData).dropGraph();
  graphInit();
});

onMounted(() => {
  service
      .value
      .dropGraph()
      .setChartHtml(chart.value)
      .setTooltipHtml(tooltip.value)
      .setTooltipIconHtml(tooltip_icon.value.$el)
      .createTooltip()
      .createTooltipIcon();

  graphInit();
});

onUnmounted(() => {
  service.value.dropGraph()
})
</script>

<style scoped lang="scss">
.chart {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}
.container-chart {
  width: 100%;
}
.tooltip {
  border-radius: 12px;
  background: var(--background-tooltip, #2c2f34);
  box-shadow: var(--tooltip-bar-shadow, 2px 3px 6px -2px rgba(9, 10, 11, 0.1));
  padding: 12px;
  min-width: 208px;
}
.tooltip__content {
  display: flex;
  justify-content: space-between;
  gap: 4px;
  position: relative;
}
.tooltip_icon {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.2s ease 0s;
  bottom: -20px;
  box-shadow: 0 2px 12px -1px rgba(16, 24, 40, 0.08);
}
.tooltip_text {
  font-family: SFProT, serif;
  color: var(--gray-400, #6f7682);
  font-weight: 400;
  font-size: map-get($caption_1, "font-size");
  line-height: map-get($caption_1, "line-height");
  letter-spacing: map-get($caption_1, "letter-spacing");
  display: inline-flex;
}
.tooltip_value {
  font-weight: 600;
  font-family: SFProT, serif;
  color: var(--gray-80080, #1d2939cc);
}
.tooltip_text-mining {
  font-weight: 600;
  color: var(--gray-80080, rgba(241, 241, 242, 0.8));
  display: inline-flex;
}

.headline {
  color: var(--gray-400, #98a2b3);
  font-feature-settings: "case" on;
  font-size: map-get($caption_2, "font-size");
  font-weight: 400;
  line-height: map-get($caption_2, "line-height");
  letter-spacing: map-get($caption_2, "letter-spacing");
}
</style>
