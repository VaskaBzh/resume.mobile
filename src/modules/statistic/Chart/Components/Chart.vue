<template>
  <div class="item-container">
        <div v-for="(item, index) in chartItems" :key="index">
          <p class="item-title">{{ item.title }}</p>
          <p class="item-num">{{ item.num }}</p>
        </div>
      </div>
  <div ref="chart" class="container-chart">

      <!-- <div
          ref="tooltip"
          class="tooltip"
          :class="graphType"
          style="opacity: 0"
      >
          Tooltip
      </div> -->
  </div>
  <div class="y-axis-container"></div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "line-graph",
  data() {
      return {
          svg: null,
          mouseX: null,
          clientX: null,
          axis: null,
          tooltip: null,
          chartItems:[
          {
            title: 'Хешрейт',
            num: 120 + 'TH/s'
          },
          {
            title: 'Воркеры',
            num: 10
          },
          {
            title: 'Реджект',
            num: 1.5 + '%'
          },
          {
            title: '27 июля',
            num: '10:30'
          },
        ],
          containerWidth: 500,
          containerHeight: 300,
          isMobile: this.viewportWidth <= 767.98,
          graphData: 
                {
                    title: [
                        'dsdfsd',
                        'ssss',
                    ],
                    values: [1,2,3,4,5],
                    dates: [],
                    amount: [],
                    unit: [],
                },
          height: 220,
          overflow: 'visible',
          viewportWidth: 0,
          redraw: true,
          graphType: 'statistic',
          lineColor: '#53B1FD',
          lineWidth: 1.7,
          mouseLineColor: '#2E90FA',
          circleColor: '#84CAFF',
          circleBorder: '#308BEF',
          bandColor: 'none',
      };
  },
  watch: {
      height() {
          if (this.$refs.chart && this.graphData?.values?.length > 0) {
              this.dropGraph();
              this.graphInit();
          }
      },
      containerWidth() {
          if (this.$refs.chart && this.graphData?.values?.length > 0) {
              this.dropGraph();
              this.graphInit();
          }
      },
      bandColor() {
          if (this.$refs.chart && this.graphData?.values?.length > 0) {
              this.dropGraph();
              this.graphInit();
          }
      },
  },
  methods: {

    setDates() {
        const currentTime = new Date().getTime();
        const interval = 60 * 60 * 1000;

        return Array.from({ length: 24 }, (_, i) => {
            const date = new Date(
                currentTime - (24 - 1 - i) * interval
            );
            return date.getTime();
        });
    },

    async makeFullValues() {
        const [values, amount, unit] = this.graphData.values.slice(-24).reduce(
            (acc, el) => {
                let hashrate = el.hashrate ?? 0;
                if (el.unit === "P") hashrate *= 1000;
                else if (el.unit === "E") hashrate *= 1000000;
                acc[0].push(Number(hashrate));
                el.amount ? acc[1].push(el.amount) : acc[1].push(0);
                acc[2].push("T");
                return acc;
            },
            [[], [], []]
        );

        while (values.length < 24) {
            values.push(0);
            amount.push("0");
            unit.push("T");
        }

        Object.assign(this.graphData, {
            values: values.reverse(),
            amount: amount.map(String).reverse(),
            unit: unit.reverse(),
        })},
      graphInit() {

          this.containerHeight = this.height;

          if (this.isMobile && this.tooltip) {
              this.containerHeight = 380;
          }

          let formatTime = (date, i) => {
              const hours = date.getHours().toString().padStart(2, "0");
              if (this.graphData.dates.length > 24) {
                  const day = date.getDate().toString().padStart(2, "0");
                  return `${day}/${(date.getUTCMonth() + 1)
                      .toString()
                      .padStart(2, "0")}`;
              } else {
                  return `${hours.toString().padStart(2, "0")}:00`;
              }
          };

          this.svg = d3
              .select(this.$refs.chart)
              .append("svg")
              .attr("width", "100%")
              .attr("height", this.containerHeight)
              .attr("overflow", this.overflow);

          this.gradientInit();

          let x = d3
              .scaleLinear()
              .domain(d3.extent(this.graphData.dates, (d) => new Date(d)))
              .range([0, this.$refs.chart.offsetWidth]);

          let y = null;
          if (this.graphType === "statistic") {
              y = d3
                  .scaleLinear()
                  .domain([
                      0,
                      d3.max(this.graphData.values) !== 0
                          ? d3.max(this.graphData.values) +
                            d3.max(this.graphData.values) * 0.2
                          : 120,
                  ])
                  .range([this.containerHeight, 0]);
          } else {
              y = d3
                  .scaleLinear()
                  .domain([
                      d3.min(this.graphData.values) -
                          d3.min(this.graphData.values) * 0.6,
                      d3.max(this.graphData.values) +
                          d3.max(this.graphData.values) * 0.2,
                  ])
                  .range([this.containerHeight, 0]);
          }

          let xAxis = null;

          let yAxis = null;

          this.axis = d3.select(".y-axis-container");
          if (this.isMobile) {
              if (this.graphType === "statistic") {
                  yAxis = d3
                      .axisLeft(y)
                      .ticks(5)
                      .tickFormat((d, i) => this.formatNumberWithUnit(d, i));
              } else {
                  yAxis = d3
                      .axisLeft(y)
                      .ticks(12)
                      .tickFormat((d) => this.formatSi(d));
              }
              xAxis = d3
                  .axisBottom(x)
                  .ticks(12)
                  .tickFormat((d) => formatTime(new Date(d)));
          } else {
              if (this.graphType === "statistic") {
                  yAxis = d3
                      .axisLeft(y)
                      .ticks(6)
                      .tickFormat((d, i) => this.formatNumberWithUnit(d, i));
              } else {
                  yAxis = d3
                      .axisLeft(y)
                      .ticks(12)
                      .tickFormat((d) => this.formatSi(d));
              }
              xAxis = d3
                  .axisBottom(x)
                  .ticks(this.viewportWidth <= 991.98 ? 5 : 12)
                  .tickFormat((d) => formatTime(new Date(d)));
          }

          // console.log(this.graphData);

          x = d3
              .scaleLinear()
              .domain(d3.extent(this.graphData.dates, (d, i) => i))
              .range([0, this.containerWidth]);

          const lineGenerator = d3
              .line()
              .x((d, i) => x(i))
              .y((d) => y(d))
              .curve(d3.curveBasis);

          const areaGenerator = d3
              .area()
              .x((d, i) => x(i))
              .y0(this.containerHeight)
              .y1((d) => y(d))
              .curve(d3.curveBasis);

          const yBand = d3
              .scaleBand()
              .domain(yAxis.scale().ticks())
              .range([this.containerHeight, 0]);

          let width = 3;

          this.graphAppends(
              yBand,
              areaGenerator,
              width,
              lineGenerator,
              xAxis,
              yAxis,
              y
          );

          this.graphType === "statistic" ? (width = 1) : (width = 3);

          this.tooltip = d3.select(this.$refs.tooltip);

              this.svg.on("touchstart", (event) => {
                //   const touchX =
                //       event.touches[0].clientX -
                //       this.svg.node().getBoundingClientRect().left;
                //   const position = this.getClosestPoint(touchX);
                //   this.updateDotAndTooltip(event, x, position);
              });

              this.svg.on("touchmove", (event) => {
                  const touchX =
                      event.touches[0].clientX -
                      this.svg.node().getBoundingClientRect().left;
                  const position = this.getClosestPoint(touchX);
                  this.updateDotAndTooltip(event, x, position);
              });

              this.svg.on("touchend", () => {
                  this.tooltip.style("opacity", 0);
                  this.svg.selectAll(".vertical-line").style("opacity", 0);
                  this.svg.selectAll(".dot").style("opacity", 0); // Прячем точку, когда мышь покидает область графика
              });
      },
      adjustValue(num) {
          if (num === 0) {
              if (d3.max(Object.values(this.graphData.values)) / 900000 > 1) {
                  return { val: (num / 1000000).toFixed(2), unit: "E" };
              } else if (
                  d3.max(Object.values(this.graphData.values)) / 900 >=
                  1
              ) {
                  return { val: (num / 1000).toFixed(2), unit: "P" };
              } else {
                  return { val: Number(num).toFixed(2), unit: "T" };
              }
          }
          if (num / 900000 > 1) {
              return { val: (num / 1000000).toFixed(2), unit: "E" };
          } else if (num / 900 >= 1) {
              return { val: (num / 1000).toFixed(2), unit: "P" };
          } else {
              return { val: Number(num).toFixed(2), unit: "T" };
          }
      },
      formatSi(num) {
          let formatSi = d3.format(".2s");
          return formatSi(num);
      },
      formatNumberWithUnit(num, i) {
          let val = this.adjustValue( num, this.graphData.unit[i]);
          return (
              (String(val.val).split(".")[1] === "00"
                  ? Number(val.val).toFixed(0)
                  : Number(val.val).toFixed(1)) +
              " "
          );
      },
      dropGraph() {
          if (this.svg) {
              this.svg.selectAll("*").remove();
              this.axis.selectAll("*").remove();
              this.tooltip.selectAll("*").remove();
              this.svg._groups[0][0].remove();
          }
      },
      tooltipInit(event, x) {
          try {
              event?.touches
                  ? (this.clientX = event.touches[0].clientX)
                  : (this.clientX = event.clientX);
              this.mouseX =
                  this.clientX - this.svg.node().getBoundingClientRect().left;
              const nearestIndex = Math.round(x.invert(this.mouseX));
              const d = this.graphData.values[nearestIndex];
              const u = this.graphData.unit
                  ? this.graphData.unit[nearestIndex]
                  : "null";
              let a = this.graphData.amount
                  ? this.graphData.amount[nearestIndex]
                  : "0";
              const time = this.graphData.dates[nearestIndex];

              const verticalLineX = this.mouseX;

              this.svg
                  .selectAll(".vertical-line")
                  .attr("x1", verticalLineX)
                  .attr("x2", verticalLineX)
                  .attr("y1", 0)
                  .attr("y2", this.containerHeight)
                  .style("opacity", 1);     

              const formatNumberWithUnit = (num, i) => {
                  return (
                      this.adjustValue(num, this.graphData.unit[i]).val +
                      " " +
                      this.adjustValue(num, this.graphData.unit[i]).unit +
                      "H"
                  );
              };

              const formatNumber = (num) => {
                  return String(num).slice(0, 2) + " T";
              };

              let contentTooltip = null;
              let workers = a
                  ? `<span>${this.$t(
                        "tooltip.workers"
                    )} <span class="value">${a}</span></span>`
                  : ``;

              if (this.graphType === "statistic") {
                  contentTooltip = `<div class="tooltip-wrapper">
                              <span>${this.$t(
                                  "tooltip.hash"
                              )} <span class="value">${formatNumberWithUnit(
                      d,
                      u
                  )}</span></span>
                              ${workers}
                              <span>${this.$t(
                                  "tooltip.rejected"
                              )} <span class="value">0.000%</span></span>
                              <span class="time">${
                                  new Date(time).getUTCFullYear() + "."
                              }${
                      new Date(time).getDate().toString().padStart(2, "0") +
                      "."
                  }${(new Date(time).getMonth() + 1)
                      .toString()
                      .padStart(2, "0")} ${new Date(time)
                      .getUTCHours()
                      .toString()
                      .padStart(2, "0")}:00</span>
                          </div>`;
              } else if (this.graphType === "complexity") {
                  contentTooltip = `<div class="tooltip-wrapper">
                              <span>${this.$t(
                                  "tooltip.difficulty"
                              )}: <span class="value">${
                      this.graphType === "statistic"
                          ? this.formatNumberWithUnit(d, u)
                          : formatNumber(d)
                  }</span></span>
                              <span class="time">${
                                  new Date(time).getUTCFullYear() + "."
                              }${
                      new Date(time).getDate().toString().padStart(2, "0") +
                      "."
                  }${(new Date(time).getMonth() + 1)
                      .toString()
                      .padStart(2, "0")}</span>
                          </div>`;
              }

              if (new Date(time).toLocaleTimeString() !== "Invalid Date") {
                  this.tooltip
                      .style("opacity", 1)
                      .style(
                          this.getPosition?.side,
                          this.getPosition?.position + "px"
                      )
                      .html(contentTooltip);
              }
          } catch (error) {
              console.error(error);
          }
      },
      gradientInit() {
          const gradient = this.svg
              .append("defs")
              .append("linearGradient")
              .attr("id", "gradient")
              .attr("x1", "0")
              .attr("y1", "0")
              .attr("x2", "0")
              .attr("y2", "1");

          if (this.graphType === "statistic") {
              gradient
                  .append("stop")
                  .attr("offset", "0%")
                  .attr("stop-color", "rgba(46, 144, 250, 0.41)");

              gradient
                  .append("stop")
                  .attr("offset", "100%")
                  .attr("stop-color", "rgba(46, 144, 250, 0.00)");
          }
      },
      graphAppends(
          yBand,
          areaGenerator,
          width,
          lineGenerator,
          xAxis,
          yAxis,
          y
      ) {
          this.svg
              .selectAll(".band")
              .data(yBand.domain())
              .enter()
              .append("rect")
              .attr("class", "band")
              .attr("y", (d) => y(d) - 1) // Выравнивание полосы
              .attr("height", 1)
              .attr("width", "100%")
              .attr("fill", this.bandColor);

          this.svg
              .append("path")
              .datum(this.graphData.values)
              .attr("d", areaGenerator)
              .attr("width", "100%")
              .attr("fill", "url(#gradient)");

          this.svg
              .append("line")
              .attr("class", "vertical-line")
              .attr("x1", 0)
              .attr("y1", 0)
              .attr("x2", 0)
              .attr("y2", this.containerHeight)
              .attr("stroke-width", width)
              .style("opacity", 0)
              .attr("stroke", this.mouseLineColor);

          this.svg
              .append("path")
              .datum(this.graphData.values)
              .attr("d", lineGenerator)
              .attr("fill", "none")
              .attr("class", "main_line")
              .attr("width", "100%")
              .attr("stroke", this.lineColor)
              .attr("stroke-width", this.lineWidth);

          this.svg
              .append("circle") // Добавляем эту строку в ваш исходный код
              .attr("class", "dot")
              .attr("r", 3) // Задаем радиус нашей точки
              .style("opacity", 0)
              .attr("fill", this.circleColor) // Используем тот же цвет, что и для линии графика
              .attr("stroke", this.circleBorder) // Установите цвет границы круга
              .attr("stroke-width", 2); // Установите ширину границы

          this.svg
              .append("g")
              .attr("transform", `translate(0, ${this.containerHeight + 5})`)
              .call(xAxis)
              .select(".domain")
              .remove();

          if (!this.isMobile) {
              this.svg
                  .append("g")
                  .attr("transform", `translate(-5, 0)`)
                  .call(yAxis)
                  .select(".domain")
                  .remove();
          } else {
              let axisHeight;
              if (this.graphType === "statistic") {
                  axisHeight = this.containerHeight + 5;
              } else {
                  axisHeight = this.containerHeight - 15;
              }
              this.axis
                  .attr("style", `height: ${axisHeight}px`)
                  .call(yAxis)
                  .select(".domain")
                  .remove();
          }
      },
      getClosestPoint(touchX) {
          const pathNode = this.svg.select(".main_line").node();
          let beginning = 0,
              end = pathNode.getTotalLength();
          let position = null;

          while (true) {
              const target = Math.floor((beginning + end) / 2);
              position = pathNode.getPointAtLength(target);
              if (
                  (target === end || target === beginning) &&
                  position.x !== touchX
              ) {
                  break;
              }
              if (position.x > touchX) end = target;
              else if (position.x < touchX) beginning = target;
              else break; //position.x === touchX
          }

          return position;
      },
      updateDotAndTooltip(event, x, position) {
          // Обновляем позицию точки на линии графика
          this.svg
              .selectAll(".dot")
              .attr("cx", position.x)
              .attr("cy", position.y)
              .style("opacity", 1);

          this.tooltipInit(event, x, position.y);

          // Обновляем позицию вертикальной линии
          this.svg
              .selectAll(".vertical-line")
              .attr("x1", position.x)
              .attr("x2", position.x)
              .style("opacity", 1)
      },
  },
  async mounted() {
      if (this.$refs.chart && this.graphData?.values?.length > 0) {
          setInterval(() => {
              if (
                  this.$refs.chart?.offsetWidth &&
                  this.containerWidth !== this.$refs.chart.offsetWidth
              ) {
                  this.containerWidth = this.$refs.chart.offsetWidth;
              }
          }, 100);
          this.graphData = {
              ...this.graphData,
              dates: this.setDates(),
          };

          await this.makeFullValues();
          this.graphInit();
          this.graphData.values = [150,22,150,150,50,60,170,180,160,150,140,122,33,150,45,66,77,55,44,22,22,11,34,150];
      }
  },
};
</script>

<style lang="scss" scoped>
.container-chart {
  text-align: right;
  // margin: 0 15px ;
  color: var(--gray-400, #98A2B3);
  text-align: center;
  font-size: map-get($caption_2, "font-size");
  line-height:  map-get($caption_2, "line-height");
  letter-spacing: map-get($caption_2, "letter-spacing");
  letter-spacing: 0.066px;
  @media (max-width: 767.98px) {
      margin: 0 0 0 40px;
  }
}
.y-axis-container {
  display: flex;
  flex-direction: column-reverse;
  gap: 8px;
  height: 100%;
  width: fit-content;
  justify-content: space-between;
  order: -1;
  @media (max-width: 767.98px) {
      position: absolute;
      left: 12px;
      bottom: 73px;
  }
  .tick {
      max-width: 24px;
  }
}
.y-axis-container {
  svg{
  overflow: visible;
}
} 
.item-container{
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
  margin-bottom: 4px;
}
.item-title{
  color: var(--gray-500, #667085);
  text-align: center;
  font-size: map-get($caption_2, "font-size");
  line-height:  map-get($caption_2, "line-height");
  letter-spacing: map-get($caption_2, "letter-spacing");
}
.item-num{
  color: var(--gray-700, #344054);
  text-align: center;
  margin-top: 4px;
  font-weight: 600;
  letter-spacing: -0.5px;
  font-size: map-get($sub_headline, "font-size");
  line-height:  map-get($sub_headline, "line-height");
}
</style>
