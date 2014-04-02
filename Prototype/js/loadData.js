$(function () {
    var tabs = $( "#m-tabs" ).tabs({
        event: "mouseover"
    });
    tabs.find( ".ui-tabs-nav" ).sortable({
        axis: "x",
        stop: function() {
            tabs.tabs( "refresh" );
        }
    });

    $( "#m-accordion" ).accordion({
        collapsible: true,
        active: false
    });
    $( "#u-query-button" ).button();
    $( "#u-query-cancel" ).button();

    Highcharts.setOptions({
        global:{
            useUTC:false
        },
        lang: {
            downloadJPEG: "下载JPEG 图片",
            downloadPDF: "下载PDF文档",
            downloadPNG: "下载PNG 图片",
            downloadSVG: "下载SVG 矢量图",
            exportButtonTitle: "导出图片",
            resetZoom: '恢复原始大小',
            resetZoomTitle: '恢复原始大小',
            months: ['一月', '二月', '三月', '四月', '五月', '六月',  '七月', '八月', '九月', '十月', '十一月', '十二月'],
            weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        }
    });

/******************总体概况*******************/
    $('#u-tab-sum-con').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        credits: { enabled: true, href: "http://www.inspur.com/", text: ''},
        title: {
            text: '2014年1月新疆来我市人员民族分布'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            type: 'pie',
            name: '人数',
            data: [
                ['维吾尔族',   45],
                ['汉族',       26],
                {
                    name: '哈萨克族',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['回族',    8],
                ['柯尔克孜族',     6],
                ['其他',   4]
            ]
        }]
    });

/******************历史数据*******************/
    var data = [
            6, 5, 4, 1,    8, 4,    8, 2,    3, 8,
            3, 8, 6, 2,    9, 9,    5, 5,    1, 9,
            3, 44, 44, 72,    39, 46,    64,1 ,    69, 69,
            69, 58, 47, 86,    89, 16,    2, 33,    52, 57,
            55, 54, 3, 3,    6, 3,    96, 18,    9, 84,
            86, 72, 9,12 , 89,43 , 23, 23, 35, 22,
            8, 73, 16, 3,    3, 2,    69,3 , 85,5 ,
            1, 2, 81, 51,    14, 73,    13, 7,    7, 15,
            42, 73, 1, 46,    12, 12,    12, 6,    27, 82,
            4, 55, 56, 73, 9, 51, 49, 13, 73, 73,
            61, 52, 4, 62, 58, 61, 6, 99, 53, 97,
            1, 19, 7, 5,    84, 69,    47, 23,    65, 19,
            21, 22, 34, 18,    15, 7, 61, 61, 53, 67,
            27, 34, 66, 51, 39, 67, 2, 88, 28, 16,
            29, 3, 29, 81, 11, 31, 26, 55, 55, 45,
            98, 77, 22, 85, 44, 43, 26, 66, 6, 5,
            7, 12, 13, 31, 52, 51, 28, 1, 13, 12,
            41, 53, 21, 19, 68, 99, 99, 74, 42, 6,
            69, 62, 21, 21, 21, 11, 33, 49, 19, 9,
            9, 27, 48, 5, 73, 94, 7, 9, 47, 87,
            9, 27, 33, 78, 78, 7, 22, 37, 6, 7,
            38, 38, 37, 36, 6, 25, 98, 7, 7, 72,
            93, 88, 85, 32, 65, 65, 53, 47, 9, 8,
            99,22 , 1, 65, 85, 11, 2, 35, 45, 44,
            2, 11, 95, 94, 6, 94, 94, 78, 93, 8,
            24, 7, 94, 93, 82, 71, 82, 71, 78,23 ,
            1, 98, 79, 86, 58, 14, 25, 26, 26, 6,
            78, 68, 83, 93, 92, 76, 5, 7, 73, 1,
            36, 39, 38, 56, 75, 78, 72, 95, 95, 94,
            76, 77, 6, 22, 28, 29, 48, 7, 53, 7,
            72, 52, 52, 6, 62, 36, 37, 4, 67, 67,
            69, 37, 27, 25, 79, 91, 9, 87,33 , 7,
            3, 17, 99, 99, 95, 1, 65, 25, 83, 41,
            39, 16, 8, 9, 82, 39,23 ,23 , 7, 5,
            16, 22, 31, 77, 77, 82, 5, 42, 76, 16,
            48, 48, 41, 14, 7, 87, 88, 2, 2, 17,
            18, 15, 12, 96, 8, 8, 8, 47, 49, 13,
            55, 93, 94, 88, 78, 8, 27, 49, 41, 41,
            32, 27, 37, 24, 12, 2, 21, 17, 4, 9,
            11, 4, 45, 45, 4, 16, 13, 78, 88, 18,
            18, 28, 29, 98, 85, 81, 9, 9, 98, 99,
            51, 13, 16, 14, 14, 7, 2, 11, 22, 15,
            98, 98, 92, 73, 66, 67, 91, 82, 85, 13,
            31, 15,33 , 13, 27, 27, 8, 83, 75, 62,
            2, 12, 12, 17, 2, 11, 8, 9, 31, 31,
            27, 98, 93, 4,33 , 91, 91, 85, 84, 92,
            71, 59, 77, 77, 83, 58, 48, 3, 99, 95,
            95, 78, 82, 62, 55, 48, 61, 61, 65, 62,
            31, 39, 44, 27, 27, 36, 33, 59, 59, 72,
            6, 6, 5, 65, 84, 95, 13, 97, 96, 85,
            78, 66,33 , 11, 6, 5, 14, 31, 31, 38,
            43, 43, 43, 34, 29, 42, 4, 39, 37, 37,
            29, 3, 99, 18, 68, 8, 8, 9, 94, 22,
            15, 2, 72, 72, 62, 55, 49, 67, 58, 27,
            27, 3, 29, 4, 3, 22, 88, 88, 69, 45,
            45, 45, 52, 41, 41, 4, 24, 72, 64, 55,
            58, 58, 56, 57, 47, 43, 44, 35, 35, 35,
            35, 62, 88, 1, 37, 37, 24, 97, 17, 15,
            88, 63, 63, 42, 53, 64, 7, 12, 5, 5,
            18, 58, 9, 54, 37, 24, 24, 15, 19, 14,
            77, 55, 15, 15, 2, 32, 46, 28, 23, 4,
            4, 36, 51, 46, 21, 94, 66, 66, 54, 42,
            13, 97, 9, 1, 1, 1, 9, 59, 33, 5,
            99, 99, 93, 93, 76, 7, 49, 12, 11, 19,
            46, 63, 89, 77, 77, 77, 91, 18, 79, 53,
            5, 55, 55, 45, 51, 51, 17, 0.7, 95, 94,
            14, 36, 21, 2, 67, 5, 5, 39, 4, 22,
            19, 14, 94, 91, 4, 9, 34, 23, 7, 15,
            15, 47, 59, 22, 27, 37, 23, 22, 22, 92,
            46, 35, 31, 42, 44, 39, 31, 61, 61, 85,
            18, 36, 23, 5, 93, 49, 33, 25, 25, 16,
            99, 13, 9, 68, 33, 33, 45, 44, 46, 64,
            65, 56, 56, 5, 48, 28, 87, 24, 94, 94,
            3, 55, 24, 91, 83, 85, 85, 97,33 , 3,
            5, 6, 7, 7, 36, 26, 64, 21, 31, 42,
            42, 87, 3, 48, 24, 88, 14, 14, 97, 69,
            65, 33, 29, 58, 58, 5, 8, 33, 56, 3,
            96, 96, 82, 79, 62, 52, 23, 13, 13, 22,
            2, 2, 84, 48, 47, 47, 48, 33, 5, 11,
            83, 9, 9, 81, 78, 74, 32, 2, 14, 14,
            7, 1, 89, 24, 6, 82, 82, 41, 44, 78,
            39, 78, 81, 81, 94, 38, 77, 29, 36, 33,
            33, 3, 71, 3, 96, 64, 56, 56, 68, 57,
            54, 2, 32, 28, 31, 42, 21, 2, 78, 8,
            24, 24, 7, 77, 69, 35, 92,4 , 1, 96,
            7, 23, 29, 72, 85, 86, 67, 44, 67, 9,
            78, 61, 61, 68, 49, 7, 61, 52, 22, 22,
            25, 14, 66, 46, 5, 46, 46, 43, 46, 79,
            16, 42, 31, 31, 35, 4, 73, 69, 86, 56,
            4, 46, 3, 52, 67, 6, 4, 3, 81, 51,
            5, 41, 14, 9, 9, 28, 31, 18, 71, 49,
            33, 34, 38, 42, 2, 18, 7, 68, 68, 83,
            71, 71, 55, 2, 77, 76, 91, 74, 93, 11,
            1, 12, 12, 4, 94, 48, 78, 68, 68, 68,
            6, 7, 18, 11, 35, 27, 27, 19, 46, 68,
            87, 94, 66, 66, 78, 12, 5, 18, 84, 11,
            11, 94, 4, 81, 56, 35, 63, 62, 77, 15,
            2, 8, 96, 17, 17, 32, 77, 12, 14, 9,
            12, 1, 5, 76, 87, 7, 5, 31, 29, 6,
            35, 45, 56, 88, 15, 14, 59, 78, 15, 15,
            43, 46, 46, 23, 97, 98, 88, 32, 62, 66,
            59, 68, 37, 17, 87, 67, 61, 66, 19, 61,
            37, 32, 61, 61, 54, 49, 42, 1, 3, 76,
            28, 91, 7, 23, 61, 5, 63, 62, 21, 58,
            31, 79, 44, 66, 64, 88, 75, 71, 4, 57,
            32, 38, 27, 18, 19, 89, 88, 49, 48, 82,
            45, 1, 5, 91, 82, 82, 99, 5, 89, 79,
            55, 66, 65, 95, 58, 17, 1, 97, 71, 73,
            7, 88, 74, 27, 83, 91, 9, 53, 56, 58,
            4, 19, 29, 29, 49, 95
        ]

    $('#u-tab-history-con').highcharts({
        chart: {
            zoomType: 'x',
            spacingRight: 20,
            type:'area'
        },
        lang:{
            resetZoom:"放大按钮",
            resetZoomTitle:"放大按钮"
        },
        credits: { enabled: true, href: "http://www.inspur.com/", text: ''},
        title: {
            text: '2012年至2013年新疆来济人员情况'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                '选择并拖动数据以放大区域查看详细数据' :
                '选择并拖动数据以放大区域查看详细数据'
        },
        xAxis: {
            type: 'datetime',
            maxZoom: 14 * 24 * 3600000, // fourteen days
            title: {
                text: null
            },
            labels: {
                formatter: function() {
                    return  Highcharts.dateFormat('%Y-%m-%d', this.value);
                }
            },
            tooltip: {
                formatter:function(){
                    return ''+ this.x +': '+ this.y ;
                }
            }

        },
        yAxis: {
            min:0, // y轴的最大显示值
            title: {
                text: '人员数量'
            }
        },
        tooltip: {
            formatter: function () {
                var num = new Number(this.x);
                return ''
                    + Highcharts.dateFormat('%Y-%m-%d', num.valueOf())
                    + '<br/>'
                    + this.series.name
                    + ': ' + this.y;
                Highcharts.setOptions({
                    global: {
                        useUTC: false
                    }
                });
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                lineWidth: 1,
                marker: {
                    enabled: false
                },
                shadow: false,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: [{
            type: 'area',
            name: '人员数量',
            pointInterval: 24 * 3600 * 1000,
            pointStart: Date.UTC(2006, 0, 1),
            data:data

        }]
    });

/******************近期数据*******************/
    var ranges = [
        [1246406400000, 14, 25],
        [1246492800000, 14, 27],
        [1246579200000, 15, 29],
        [1246665600000, 16, 30],
        [1246752000000, 16, 25],
        [1246838400000, 17, 25],
        [1246924800000, 13, 24],
        [1247011200000, 10, 21],
        [1247097600000, 9, 23],
        [1247184000000, 11, 21],
        [1247270400000, 10, 23],
        [1247356800000, 11, 23],
        [1247443200000, 11, 23],
        [1247529600000, 11, 20],
        [1247616000000, 12, 22],
        [1247702400000, 13, 19],
        [1247788800000, 11, 22],
        [1247875200000, 13, 25],
        [1247961600000, 14, 21],
        [1248048000000, 13, 17],
        [1248134400000, 12, 15],
        [1248220800000, 12, 20],
        [1248307200000, 12, 17],
        [1248393600000, 12, 18],
        [1248480000000, 12, 19],
        [1248566400000, 12, 19],
        [1248652800000, 11, 20],
        [1248739200000, 11, 19],
        [1248825600000, 10, 17],
        [1248912000000, 11, 18],
        [1248998400000, 10, 16]
    ],
    averages = [
        [1246406400000, 21],
        [1246492800000, 22],
        [1246579200000, 38],
        [1246665600000, 23],
        [1246752000000, 21],
        [1246838400000, 21],
        [1246924800000, 18],
        [1247011200000, 15],
        [1247097600000, 16],
        [1247184000000, 17],
        [1247270400000, 17],
        [1247356800000, 17],
        [1247443200000, 17],
        [1247529600000, 16],
        [1247616000000, 17],
        [1247702400000, 16],
        [1247788800000, 17],
        [1247875200000, 18],
        [1247961600000, 17],
        [1248048000000, 14],
        [1248134400000, 13],
        [1248220800000, 15],
        [1248307200000, 14],
        [1248393600000, 15],
        [1248480000000, 15],
        [1248566400000, 15],
        [1248652800000, 15],
        [1248739200000, 14],
        [1248825600000, 14],
        [1248912000000, 15],
        [1248998400000, 13]
    ];

    $('#u-tab-recent-con').highcharts({

        title: {
            text: '近一月新疆来济人员情况及同期历史范围'
        },

        xAxis: {
            type: 'datetime'
        },

        yAxis: {
            title: {
                text: '人员数量'
            }
        },

        tooltip: {
            crosshairs: true,
            shared: true
        },


        legend: {
        },

        credits: { enabled: true, href: "http://www.inspur.com/", text: ''},

        series: [{
            name: '人员数量',
            data: averages,
            zIndex: 1,
            marker: {
                fillColor: 'white',
                lineWidth: 2,
                lineColor: getColor(averages,ranges)
            }
        }, {
            name: '历史数据范围',
            data: ranges,
            type: 'arearange',
            lineWidth: 0,
            linkedTo: ':previous',
            color: Highcharts.getOptions().colors[0],
            fillOpacity: 0.3,
            zIndex: 0
        }]

    });

/******************年龄性别*******************/

    var chart,categories = ['0-4', '5-9', '10-14', '15-19',
        '20-24', '25-29', '30-34', '35-39', '40-44',
        '45-49', '50-54', '55-59', '60-64', '65-69',
        '70-74', '75-79', '80+'];

    $('#u-tab-age-sex-con').highcharts({
    chart: {
        type: 'bar'
    },
    title: {
        text: '新疆来我市人员性别及年龄分布'
    },
    subtitle: {
        text: ''
    },
    xAxis: [{
        categories: categories,
        reversed: false,
        labels: {
            step: 1
        }
    }, { // mirror axis on right side
        opposite: true,
        reversed: false,
        categories: categories,
        linkedTo: 0,
        labels: {
            step: 1
        }
    }],
    yAxis: {
        title: {
            text: null
        },
        labels: {
            formatter: function(){
                return (Math.abs(this.value));
            }
        }
    },

    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },

    tooltip: {
        formatter: function(){
            return '<b>'+ this.series.name +', 年龄 '+ this.point.category +'岁</b><br/>'+
                '人员数量: '+ Highcharts.numberFormat(Math.abs(this.point.y), 0);
        }
    },

    series: [{
        name: '男',
        data: [-7, -8, -10, -12, -15, -15, -14,
            -6, -5, -6,
            -2, -3, -2, -1, -1, -2, 0]
    }, {
        name: '女',
        data: [6, 7, 9, 15, 14, 13, 12, 14,
            16, 14, 15, 2,
            3, 1, 3, 1, 0]
    }],
    credits: { enabled: true, href: "http://www.inspur.com/", text: ''}
});


/******************时间户籍*******************/
    $('#u-tab-time-reg-con').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '按照时间户籍查询'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [
                '一月',
                '二月',
                '三月',
                '四月',
                '五月',
                '六月',
                '七月',
                '八月',
                '九月',
                '十月',
                '十一月',
                '十二月'
            ]
        },
        yAxis: {
            min: 0,
            title: {
                text: '人员数量'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: '乌鲁木齐',
            data: [49, 71, 106, 129, 144, 176, 135, 148, 216, 194, 95, 54]

        }, {
            name: '和田',
            data: [83, 78, 98, 93, 106, 84, 105, 104, 91, 83, 106, 92]

        }, {
            name: '石河子',
            data: [48, 38, 39, 41, 47, 48, 59, 59, 52, 65, 59, 51]

        }, {
            name: '克拉玛依',
            data: [42, 33, 34, 39, 52, 75, 54, 60, 47, 39, 46, 51]

        }],
        credits: { enabled: true, href: "http://www.inspur.com/", text: ''}
    });


/******************户籍时间*******************/
    $('#u-tab-reg-time-con').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: '按照户籍地查询'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: ['市中区', '历下区', '槐荫区','天桥区', '历城区'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '人员数量',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ''
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: '#FFFFFF',
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '2011年',
            data: [107, 31, 635, 203, 2]
        }],
        credits: { enabled: true, href: "http://www.inspur.com/", text: ''}
    });
});


/******************时间*******************/
$('#u-tab-time-con').highcharts({
    title: {
        text: '',
        x: -20 //center
    },
    subtitle: {
        text: '',
        x: -20
    },
    xAxis: {
        categories: ['一月', '二月', '三月', '四月', '五月', '六月',
            '七月', '八月', '九月', '十月', '十一月', '十二月']
    },
    yAxis: {
        title: {
            text: ''
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }],
        min:0
    },
    tooltip: {
        valueSuffix: ''
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    },
    series: [{
        name: '流动人口',
        data: [7, 6, 9, 14, 18, 21, 25, 26, 23, 18, 13, 9]
    }, {
        name: '旅业',
        data: [2, 0, 5, 11, 17, 22, 24, 24, 20, 14, 8, 2]
    }, {
        name: '网吧上网',
        data: [3, 4, 5, 8, 11, 15, 17, 16, 14, 10, 6, 4]
    }],
    credits: { enabled: true, href: "http://www.inspur.com/", text: ''}
});

function getColor(averages,ranges){
    return 'red';
}