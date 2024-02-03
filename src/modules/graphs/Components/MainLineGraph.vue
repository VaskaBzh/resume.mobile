<template>
  <div class="chart">
    <div ref="chart" class="container-chart">
      <div
        ref="tooltip"
        class="tooltip"
        v-show="service.unit"
        style="opacity: 0"
      >
        <div class="tooltip__content">
          <p class="tooltip_text">
            <span class="tooltip_label"> {{ $t("tooltip.hash") }}: </span>
            <span class="tooltip_value">
              {{ service.hashrate }} {{ service.unit }}h/s
            </span>
          </p>
          <p class="tooltip_text" v-if="!isWorkerGraph">
            <span class="tooltip_label"> {{ $t("tooltip.workers") }}: </span>
            <span class="tooltip_value">
              <span class="tooltip_value tooltip_value-green">
                {{ service.workersCountActive }}
              </span>
            </span>
          </p>
          <p class="tooltip_text">
            <span class="tooltip_label"> {{ $t("tooltip.rejected") }}: </span>
            <span class="tooltip_value"> 0.000% </span>
          </p>
          <p class="tooltip_text tooltip_text-date">
            <span class="tooltip_value">
              {{ service.fullDate }}
            </span>
            <span class="tooltip_label">
              {{ service.time }}
            </span>
          </p>
          <tooltip-icon class="tooltip_icon" />
        </div>
      </div>
    </div>
    <div class="y-axis-container"></div>
    <graph-offset-tabs
      :offset="offset"
      @change-offset="$emit('changeOffset', $event)"
    />
  </div>
</template>

<script setup>
import GraphOffsetTabs from "@/modules/graphs/Components/GraphOffsetTabs.vue";
import TooltipIcon from "@/modules/graphs/icons/TooltipIcon.vue";
import { GraphMessages } from "@/modules/graphs/Lang/GraphMessages.js";
import { LineGraphService } from "@/modules/graphs/services/LineGraphService";
import { viewport } from "@/modules/viewport/store/ViewportStore.js";
import { watch, defineProps, onMounted, ref, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  graphData: Object,
  height: Number,
  offset: Number,
  isWorkerGraph: {
	  type: Boolean,
	  default: false,
  },
})

const { t } = useI18n({
  useScope: "global",
  messages: GraphMessages,
})

const service = ref(new LineGraphService(props.graphData, t));
const chart = ref(null);
const tooltip = ref(null);

function graphInit() {
  if (props.graphData) {
    const colors = {
      circle: "#ffffff",
      bands: "rgba(208, 213, 221, 0.2)",
    };

    service
        .value
        .setContainerHeight(props.height)
        .createSvg()
        .gradientInit()
        .setDefaultX()
        .setY()
        .setAxis()
        .setXAxis(6)
        .setNumberX()
        .setYAxis(6)
        .setLineGenerator()
        .setAreaGenerator()
        .setYBand()
        .graphAppends(colors)
        .setTooltip();

    service.value.setSvgEventsMobile();
  }
}

watch(() => viewport.value, () => {
  service.value.setGraphData(props.graphData).dropGraph();
  graphInit();
});

watch(() => props.graphData, (newGraphData) => {
  service.value.setGraphData(newGraphData).dropGraph();
  graphInit();
});

watch(() => tooltip.value, (newTooltipHtml) => {
  service.value.setTooltipHtml(newTooltipHtml).dropGraph();
  graphInit();
});

watch(() => props.height, () => {
  service.value.setGraphData(props.graphData).dropGraph();
  graphInit();
});

onMounted(() => {
  service
      .value
      .setChartHtml(chart.value)
      .setTooltipHtml(tooltip.value)
      .setDarkState()
      .setIsMobileState();

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
  width: 100%;
}
.container-chart {
  margin: 0 0 38px 32px;
  flex: 0 1 auto;
}
.tooltip {
  border-radius: 12px;
  background: var(--secondary-color-1, #212327);
  box-shadow: 1px 2px 4px -2px rgba(29, 29, 29, 0.1);
  padding: 8px 12px;
  min-width: 160px;
}
.tooltip__content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
}
.tooltip_icon {
  position: absolute;
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 0 2px 12px -1px rgba(16, 24, 40, 0.08);
}
.tooltip_text {
  font-family: SFProT, serif;
  color: var(--gray-400, #6f7682);
  font-weight: 400;
  font-size: map-get($caption_2, "font-size");
  line-height: map-get($caption_2, "line-height");
  letter-spacing: map-get($caption_2, "letter-spacing");
}
//.tooltip_label {
//    color: var(--text-teritary);
//}
.tooltip_value {
  font-weight: 600;
  color: var(--gray-600, #c5c8cd);
}
.tooltip_value-green {
  color: var(--secondary-green, #1fb96c);
}
.tooltip_value-red {
  color: var(--system-colors-ted, #ff453a);
}
.tooltip_text-date {
  margin-top: 8px;
  display: inline-flex;
  justify-content: space-between;
  font-weight: 600;
}
</style>
