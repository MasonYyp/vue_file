import echarts from 'echarts'


// 清空echarts的缓存
class BaseChart{
    constructor(curChart){
        this.curChart = curChart;
    }

    clearChart(){
        this.curChart.clear();
        this.curChart.setOption({}, true);
        this.curChart = null;
    }
}

// 绘制折线图
class LineChart extends BaseChart{
    constructor(chartId){
        let chart = echarts.init(document.getElementById(chartId));
        super(chart);
        this.chart = chart;
    }
    
    draw(dataX, dataY, titleText=""){
        // let dataX = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        // let dataY = [120, 200, 150, 80, 70, 110, 130];

        let option = {
            title:{
                text: titleText,
                textStyle:{
                    fontSize: 14,
                    color: '#000'
                },
                left: "center",
                bottom: 0
            },
            xAxis: {
                type: 'category',
                data: dataX
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: dataY,
                type: 'line',
                symbolSize: 12,
                lineStyle: {
                    color: '#5470C6',
                    width: 3
                },
                itemStyle: {
                    borderWidth: 3,
                    borderColor: '#EE6666',
                    color: 'yellow'
                }
            }]
        };

        this.chart.clear();
        this.chart.setOption(option);
    }
}

// 条形图
class BarChart extends BaseChart{
    constructor(chartId){
        let chart = echarts.init(document.getElementById(chartId));
        super(chart);
        this.chart = chart;
    }

    draw(dataX, dataY, titleText=""){
        // let dataX = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        // let dataY = [120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130];

        let option = {
            title:{
                text: titleText,
                textStyle:{
                    fontSize: 14,
                    color: '#000'
                },
                left: "center",
                bottom: 0
            },
            xAxis: {
                type: 'category',
                data: dataX
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: dataY,
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: function(params) {
                            let colorList = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83', '#ca8622']; 
                            return colorList[params.dataIndex % colorList.length];
                        }
                    }
                }
            }]
        };

        this.chart.clear();
        this.chart.setOption(option);
    }
}

// 柱状图
class HistogramChart extends BaseChart{
    constructor(chartId){
        let chart = echarts.init(document.getElementById(chartId));
        super(chart);
        this.chart = chart;
    }

    draw(dataX, dataY, titleText=""){
        // var dataX = ["2020-01", "2020-02", "2020-03", "2020-04", "2020-05", "2020-06"]
        // var dataY = ["1030", "205", "84", "568", "689", "4587"];

        let option = {
            title:{
                text: titleText,
                textStyle:{
                    fontSize: 14,
                    color: '#000'
                },
                left: "center",
                bottom: 0
            },
            xAxis: [{
                data: dataX,
                axisLabel: {
                    textStyle: {
                        fontSize: 14
                    },
                    margin: 30
                },

                axisLine: {
                    show: false //不显示x轴
                },
                axisTick: {
                    show: false //不显示刻度
                }
            }],
            yAxis: {
                type: 'value'
            },
            series: [
                {//柱底圆片
                    name: "",
                    type: "pictorialBar",
                    symbolSize: [60, 22],
                    symbolOffset: [0, 10],
                    z: 12,
                    label: {
                        normal: {
                            show: true,
                            position: "top",
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: '#909399'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: "rgba(89,211,255,1)"
                            },
                            {
                                offset: 1,
                                color: "rgba(23,237,194,1)"
                            }
                            ])
                        }
                    },
                    data: dataY
                },

                //柱体
                {
                    name: '',
                    type: 'bar',
                    barWidth: 60,
                    barGap: '0%',
                    itemStyle: {
                        normal: {
                            color: {
                                x: 0, y: 0, x2: 0, y2: 1,
                                type: "linear",
                                global: false,
                                colorStops: [{
                                    offset: 0,
                                    color: "rgba(0,255,245,0.5)"
                                }, {
                                    offset: 1,
                                    color: "#43bafe"
                                }]
                            }
                        }
                    },
                    data: dataY
                },

                //柱顶圆片
                {
                    name: "",
                    type: "pictorialBar",
                    symbolSize: [60, 22],
                    symbolOffset: [0, -10],
                    z: 12,
                    symbolPosition: "end",
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: "rgba(89,211,255,1)"
                            }, {
                                offset: 1,
                                color: "rgba(23,237,194,1)"
                            }],
                                false
                            )
                        }
                    },
                    data: dataY
                }
            ]
        };

        this.chart.clear();
        this.chart.setOption(option);
    }
}

// 饼状图
class PieChart extends BaseChart{
    constructor(chartId){
        let chart = echarts.init(document.getElementById(chartId));
        super(chart);
        this.chart = chart;
    }

    draw(dataName, dataValue, titleText=""){
        // let dataName = ['搜索引擎', '直接访问', '邮件营销', '联盟广告', '视频广告'];
        // let dataValue = [1048, 735, 580, 484, 300];

        let data = new Array();

        for(let i=0; i<dataName.length; i++){
            data.push({value: dataValue[i], name: dataName[i]})
        }

        let option = {
            title:{
                text: titleText,
                textStyle:{
                    fontSize: 14,
                    color: '#000'
                },
                left: "center",
                bottom: 0
            },
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    type: 'pie',
                    selectedMode: 'single',
                    selectedOffset: 6,
                    radius: '50%',
                    data: data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        this.chart.clear();
        this.chart.setOption(option);
    }
}

// 玫瑰图
class RoseChart extends BaseChart{
    constructor(chartId){
        let chart = echarts.init(document.getElementById(chartId));
        super(chart);
        this.chart = chart;
    }

    draw(dataName, dataValue){
        let data = new Array();

        for(let i=0; i<dataName.length; i++){
            data.push({value: dataValue[i], name: dataName[i]})
        }

        let option = {
            // title: {
            //     text: '标题',
            //     left: 'center',
            //     top: '49%',
            //     textStyle: {
            //         fontSize: 16,
            //         color: '#3C4353',
            //         fontStyle: 'normal',
            //         fontWeight: '400',
            //         fontFamily: 'PingFangSC-Regular,PingFang SC;',
            //     }
            // },
            color: ['#7eacea', '#e15777', '#95ea71', '#ea9b4f', '#7577df', '#be72d8', '#fff'],
            tooltip: {
                trigger: 'item',
                formatter: '{b} : {c} ({d}%)'
            },
            series: [{
                type: 'pie',
                radius: [30, 110],
                center: ['50%', '50%'],
                roseType: 'radius',
                label: {
                    show: true,
                    formatter: '{d}%',
                },
                emphasis: {
                    label: {
                        show: true
                    }
                },
                data: data
            }, {
                type: 'pie',
                silent: true,
                center: ['50%', '50%'],
                radius: 30,
                hoverAnimation: false,
                label: {
                    show: false,
                    position: 'center'
                },
                data: [{ value: 1 }],
                itemStyle: {
                    normal: {
                        color: '#fff',
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 10,
                    }
                }
            }]
        };

        this.chart.clear();
        this.chart.setOption(option);
    }
}

// 雷达图
class RadarChart extends BaseChart{
    constructor(chartId){
        let chart = echarts.init(document.getElementById(chartId));
        super(chart);
        this.chart = chart;
    }

    draw(dataX, dataYY, legendText, titleText="") {
        
        // let legendText = ['2019年', '2018年', '2017年'];
        // let dataX = ['规划计划', '项目安排', '智库报告', '媒体评论', '动态跟踪'];
        // let dataYY= [[4600, 13000, 25000, 23500, 25000], [5300, 15000, 12800, 13500, 15000], [4200, 8000, 8800, 18500, 18000]];
        if(!Array.isArray(dataX) && !Array.isArray(dataYY)){
            return;
        }

        let maxY = new Array(dataX.length).fill(0);
        for(let i=0; i<dataYY.length; i++){
            for(let j=0; j<dataYY[i].length; j++){
                if(maxY[j]<dataYY[i][j]){
                    maxY[j] = dataYY[i][j];
                }
            }
        }

        let radarIndicator = new Array();
        for(let i=0; i<dataX.length; i++){
            let item = { name: dataX[i], max: maxY[i]};
            radarIndicator.push(item);
        }

        let radarSeriesData = new Array();
        for(let i=0; i<dataYY.length; i++){
            radarSeriesData.push(new Array(dataYY[i]))
        }        

        let itemColor = ['rgba(127,255,210, 0.4)', 'rgba(255,237,145,0.4)', 'rgba(149, 228, 104, 0.4)', 'rgba(108, 57, 146, 0.4)', 'rgba(191,152, 116,0.4)'];
        let radarSeries = new Array();
        for(let i=0; i<legendText.length; i++){
            let colorIndex = Math.floor(Math.random()*itemColor.length);
            let itemSeries = {
                name: '',
                type: 'radar',
                symbol: 'circle',
                symbolSize: 12,
                areaStyle: { color: itemColor[colorIndex] },
                itemStyle: { color: itemColor[colorIndex], borderColor: itemColor[colorIndex], borderWidth: 10},
                lineStyle: { color: itemColor[colorIndex], width: 2 },
                data: null
            };

            itemSeries.name = legendText[i];
            itemSeries.data = radarSeriesData[i];
            radarSeries.push(itemSeries);
        }


        let option = {
            backgroundColor: 'rgba(0,0,0,0)',
            title:{
                text: titleText,
                textStyle:{
                    fontSize: 14,
                    color: '#000'
                },
                left: "center",
                bottom: 0
            },
            legend: {
                top: '8%',
                left: '14%',
                orient: 'vertical',
                textStyle: { color: '#000', fontSize: 12 },
                data: legendText,
                icon: 'circle'
            },
            radar: {
                radius: '60%',
                center: ['50%', '52%'],
                startAngle: 0,
                triggerEvent: true,
                name: {
                    textStyle: {
                        color: '#000',
                        fontSize: '12',
                        borderRadius: 3,
                        padding: [20, 5]
                    }
                },
                nameGap: '2',
                indicator: radarIndicator,
                splitArea: {
                    areaStyle: {
                        color: ['rgba(0,255,255, 0.1)', 'rgba(0,255,255, 0.2)', 'rgba(0,255,255, 0.3)', 'rgba(0,255,255, 0.4)', 'rgba(0,255,255, 0.5)', 'rgba(0,255,255, 0.6)',].reverse(),
                        shadowColor: 'rgba(0, 0, 0, 1)',
                        shadowBlur: 30,
                        shadowOffsetX: 10,
                        shadowOffsetY: 10
                    }
                },
                axisLine: { lineStyle: { color: 'rgba(0,206,209, 0.3)' } },
                splitLine: {
                    lineStyle: {
                        width: 1,
                        color: ['rgba(0,206,209, 0.1)', 'rgba(0,206,209, 0.2)', 'rgba(0,206,209, 0.3)', 'rgba(0,206,209, 0.4)', 'rgba(0,206,209, 0.5)', 'rgba(0,206,209, 0.6)'].reverse()
                    }
                }
            },
            series:radarSeries
        };
        
        this.chart.clear();
        this.chart.setOption(option);
    }
}

class KnowledgeChart extends BaseChart{
    constructor(chartId){
        let chart = echarts.init(document.getElementById(chartId));
        super(chart);
        this.chart = chart;
    }

    draw(dataRel, dataLink, titleText=""){
        // 注意：实体和属性的name不能存在相同值 ！！！
        // let dataRel=[
        //     {
        //         name: '实体',
        //         draggable: false, // 是否可以拖拽，默认false
        //         category: 0, // 这是种类，0：实体，1：一级属性，2：二级属性，3：三级属性，
        //         number: 0, // 这是编号 非必须，目的仅为方便编写line
        //         symbolSize: 80, // 设置节点圆的大小
        //         value: 1, // 如果不设置symbolSize,用于设置节点圆的大小，此处用于判断是否显示提示，1表示不显示tip，显示name； 0显示tip
        //         tip: "实体是主要主体" //节点需要显示的额外内容
        //     },
        //     { number: 1, name: '环境因子',  category: 1, draggable: true, symbolSize: 50, value: 0, tip: "环境因子是属性" },
        //     { number: 2, name: '物质', category: 1, draggable: true, symbolSize: 50, value: 0, tip: '物质是基础' },

        //     { number: 3, name: '生物', category: 1, draggable: true, symbolSize: 50, value: 1, tip: '生物' },
        //     { number: 4, name: '浮游生物', category: 2, draggable: false, symbolSize: 30, value: 0, tip: "浮游生物是生物的一种" },
        //     { number: 5, name: '浮游植物', category: 3, draggable: true, symbolSize: 20, value: 0, tip: '浮游植物是浮游生物的一种' },
        //     { number: 6, name: '浮游动物', category: 3, draggable: true, symbolSize: 20, value: 0, tip: '浮游动物是浮游生物的一种' },
        //     { number: 7, name: '原生生物', category: 2, draggable: true, symbolSize: 30, value: 0, tip: '原生生物是生物的一种' },
        //     { number: 8, name: '细菌', category: 2, draggable: true, symbolSize: 30, value: 0, tip: '细菌' },

        //     { number: 9, name: '灾害事件', category: 1, draggable: true, symbolSize: 50, value: 1, tip: '灾害事件' },
        //     { number: 10, name: '赤潮', category: 2, draggable: true, symbolSize: 30, value: 0, tip: '赤潮是什么' }, 
        //     { number: 11, name: '水母灾害', category: 2, draggable: true, symbolSize: 30, value: 0, tip: '水母灾害' }
        // ]
        
        // let dataLink= [
        //     {
        //         source: "实体", // 实体
        //         target: "环境因子", // 目标
        //         value: '一级' // 连接线
        //     },
        //     { source: "实体", target: "物质", value: '一级' },
        //     { source: "实体", target: '生物', value: '一级' },
        //     { source: "实体", target: '灾害事件', value: '一级' },
        //     { source: '生物', target: '浮游生物', value: '二级-生物' },
        //     { source: '生物', target: '原生生物', value: '二级-生物' },
        //     { source: '生物', target: '细菌', value: '二级-生物' },
        //     { source: '浮游生物', target: '浮游植物', value: '三级-灾害事件' },
        //     { source: '浮游生物', target: '浮游动物', value: '三级-灾害事件' },
        //     { source: '灾害事件', target: '赤潮', value: '二级-灾害事件' },
        //     { source: '灾害事件', target: '水母灾害', value: '二级-灾害事件' }
        // ]

        let option = {
            title:{
                text: titleText,
                textStyle:{
                    fontSize: 14,
                    color: '#000'
                },
                left: "center",
                bottom: 0
            },
            tooltip: {},
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            legend: {
                x: "center",
                show: true,
                data: [] // 此处不显示根节点学生
            },
            series: [
                {
                    type: 'graph',
                    layout: 'force',
                    symbolSize: function (size) {
                        return size;
                    },
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [4, 10],
                    edgeLabel: {
                        normal: {
                            show: true,
                            textStyle: {
                                fontSize: 10
                            },
                            formatter: "{c}"
                        }
                    },
                    force: {
                        repulsion: 2500,
                        edgeLength: [10, 50]
                    },
                    focusNodeAdjacency: true,
                    roam: true,
                    categories: [{
                        name: '实体',
                        // 可以配置属性的颜色
                        // itemStyle: {
                        //     normal: {
                        //         color: "blue",
                        //     }
                        // }
                    }, {
                        name: '一级属性',
                    }, {
                        name: '二级属性',
                    }, {
                        name: '三级属性',
                    }, {
                        name: '四级属性',
                    }],
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                fontSize: 12
                            },
                        }
                    },
                    tooltip: {
                        formatter: function (node) {
                            if (!node.value) {
                                // 显示tip
                                return node.data.tip;
                            } else {
                                // 连接点
                                return node.name;
                            }
                        },
                    },
                    lineStyle: {
                        normal: {
                            opacity: 0.9,
                            width: 1,
                            curveness: 0.3
                        }
                    },
                    data: dataRel,
                    links: dataLink
                }
            ]
        };

        this.chart.clear();
        this.chart.setOption(option);
    }
}

export { LineChart, BarChart, HistogramChart, PieChart, RoseChart, RadarChart, KnowledgeChart }