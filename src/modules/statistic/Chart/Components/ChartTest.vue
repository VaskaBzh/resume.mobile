<template>
  <div class="item-container">
        <div v-for="(item, index) in chartItems" :key="index">
          <p class="item-title">{{ item.title }}</p>
          <p class="item-num">{{ item.num }}</p>
        </div>
      </div>
        <div ref="chart" class="container-chart"></div>
  <div class="y-axis-container"></div>
</template>

<script setup>
import * as d3 from "d3";
import { ref, onMounted, reactive } from "vue";
import { api } from "../../Common/api";
const chart = ref(null);
const verticalLine = ref(null);
const incomesData = ref([])

const chartItems = ref([
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
])

const graphData =  reactive({
    title: [],
    values: [1,2,3,4,5],
    dates: [],
    amount: [],
    unit: [],
})
onMounted(() => {
    getChartData()
    // getDataChart()
  // Установка ширины и высоты графика
  const width = 343;
  const height = 162;

  // Создание svg элемента
  const svg = d3
  .select(chart.value)
  .append('svg')
  .attr('width', width)
  .attr('height', height);

  // Создание данных для графика (пример)
//   const data = incomesData.value.map((item) => item.hash)
  const data = [10,200,30,300,350,400,250,30,10,200,30,300,350,400,250,500]

  // Установка отступов для осей
  const margin = { top: 10, right: 10, bottom: 10, left: 20 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Создание оси X
  const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([0, innerWidth]);
  const xAxis = d3.axisBottom(xScale).tickSize(0);
  svg
    .append('g')
    .attr('transform', `translate(${margin.left},${innerHeight + margin.top})`)
    .call(xAxis)
    .selectAll('line') // Выбор всех линий на оси X
    svg
        .selectAll('path')
        .style("stroke", 'transparent'); //Убрали цвет линий
  // Создание оси Y
  const yScale = d3.scaleLinear().domain([0, d3.max(data)]).range([innerHeight, 0]);
  const yAxis = d3.axisLeft(yScale).tickSizeOuter(0).tickSizeInner(0);
  svg
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)
    .call(yAxis)
    .selectAll('line') // Выбор всех линий на оси Y
    svg
        .selectAll('path')
        .style("stroke", 'transparent'); //Убрали цвет линий
  // Создание градиента
  const gradient = svg
    .append('defs')
    .append('linearGradient')
    .attr('id', 'gradient')
    .attr('x1', '0%')
    .attr('y1', '0%') 
    .attr('x2', '0%')
    .attr('y2', '100%');
  gradient
    .append('stop')
    .attr('offset', '-40.12%')
    .style('stop-color', 'rgba(46, 144, 250, 0.80)')
    .style('stop-opacity', 1);
  gradient
    .append('stop')
    .attr('offset', '100%')
    .style('stop-color', 'rgba(46, 144, 250, 0.00)')
    .style('stop-opacity', 1);

  // Создание линии
  const line = d3
    .line()
    .x((d, i) => xScale(i) + margin.left)
    .y(d => yScale(d) + margin.top)
    .curve(d3.curveCardinal); // 
  // Создание области (пути) под линией
  const area = d3
    .area()
    .x((d, i) => xScale(i) + margin.left)
    .y0(innerHeight + margin.top)
    .y1(d => yScale(d) + margin.top)
    .curve(d3.curveCardinal);

  // Добавление закрытого пути к графику с использованием градиента
  svg
    .append('path')
    .datum(data)
    .attr('fill', 'url(#gradient)') // Применение градиента к области
    .attr('d', area);

  // Добавление линии к графику с установкой цвета
    svg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#2f90fa') // Установка цвета линии
        .attr('stroke-width', 2)
        .attr('d', line);

    svg
      .append("line")
      .attr("class", "vertical-line")
      .attr("x1",100)
      .attr("y1", 100)
      .attr("x2", 100)
      .attr("y2", 100)
      .attr("stroke-width", 100)
      .style("opacity", 0)
      .attr("stroke", '#fff');
      svg
        .append("path")
        .datum(graphData.values)
        .attr("fill", "none")
        .attr("class", "main_line")
        .attr("width", "100%")
        .attr("stroke", '#53B1FD')
        .attr("stroke-width", 1.7);

    //Dot
    const cursorDot = svg
        .append("circle") // Добавляем эту строку в ваш исходный код
        .attr("class", "dot")
          .attr("r", 6) // Задаем радиус нашей точки
          .style("opacity", 0)
          .attr("fill", '#16181A') // Используем тот же цвет, что и для линии графика
          .attr("stroke", '#2E90FA') // Установите цвет границы круга
          .attr("stroke-width", 2); // Установите ширину границы

    // Добавление событий для отображения/скрытия кружочка
    svg.on("touchstart", handleTouchStart);
    svg.on("touchmove", handleTouchMove);
    svg.on("touchend", handleTouchEnd);

  function handleTouchStart(event) {
    showCursorDot();
    handleTouchMove(event);
  }

  function handleTouchMove(event) {
    const touch = event.touches[0];
    if (touch) {
      const [x, y] = [touch.clientX, touch.clientY];
      const dataIndex = Math.round(xScale.invert(x));
      const cursorX = xScale(dataIndex);
      const cursorY = yScale(data[dataIndex]);
      cursorDot.transition().duration(40).attr("cx", cursorX).attr("cy", cursorY);

      svg.select(".cursor-line").attr("x1", cursorX).attr("x2", cursorX).attr("y1", 0).attr("y2", height);

      // Переместить кружочек в место касания
      cursorDot.attr("cx", cursorX).attr("cy", cursorY);
    }
  }

  function handleTouchEnd() {
    hideCursorDot();
  }

  function showCursorDot() {
    cursorDot.style("opacity", 1);
  }

  function hideCursorDot() {
    cursorDot.style("opacity", 0);
  }

  
});
const getChartData = async () => {
    try{
        const id = localStorage.getItem('subId')
        const response = await api.get(`/statistic/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        incomesData.value = response.data.incomes.data
    }catch(error){
        console.error(error)
    }
}
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
.vertical-line {
  position: absolute;
  height: 100%;
  width: 2px;
  background-color: red; /* Цвет вашей вертикальной линии */
}
</style>
