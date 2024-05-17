<template>
    <div class="result-container">
        <h1 class="title">{{ $t("evaluateResult.title") }}</h1>
        <div class="card-container">
            <div class="result-box">
                <div class="chart-container">
                    <div id="chart"/>
                    <div class="info">
                        <el-descriptions :column="1" border>
                            <el-descriptions-item :label="$t('creator.evaluate.task')" :contentStyle="{ fontSize: '16px' }">image segmentation</el-descriptions-item>
                            <el-descriptions-item :label="$t('creator.evaluate.model')" :contentStyle="{ fontSize: '16px' }">vgg16</el-descriptions-item>
                            <el-descriptions-item :label="$t('creator.evaluate.dataset')" :contentStyle="{ fontSize: '16px' }">vgg16</el-descriptions-item>
                            <el-descriptions-item label="当前状态" :contentStyle="{ fontSize: '16px' }">image segmentation</el-descriptions-item>
                        </el-descriptions>
                    </div>
                </div>
                <div v-if="evaluateStatus === 'inProcess'" class="table-box">
                    <div class="process">
                        <div class="progess-label">{{ $t('evaluating.progress') }}:</div>
                        <el-progress class="progress-bar" :stroke-width="16" :percentage="percent"></el-progress>
                    </div>
                </div>
                <div v-else-if="evaluateStatus === 'error'" class="table-box">
                    <div class="error">
                    Anim ullamco amet exercitation aliquip velit aliqua nisi fugiat commodo sed labore.
                    Anim ullamco amet exercitation aliquip velit aliqua nisi fugiat commodo sed labore.
                    Anim ullamco amet exercitation aliquip velit aliqua nisi fugiat commodo sed labore.
                    Anim ullamco amet exercitation aliquip velit aliqua nisi fugiat commodo sed labore.
                    Anim ullamco amet exercitation aliquip velit aliqua nisi fugiat commodo sed labore.
                    Anim ullamco amet exercitation aliquip velit aliqua nisi fugiat commodo sed labore.
                    Anim ullamco amet exercitation aliquip velit aliqua nisi fugiat commodo sed labore.
                    Anim ullamco amet exercitation aliquip velit aliqua nisi fugiat commodo sed labore.
                    Anim ullamco amet exercitation aliquip velit aliqua nisi fugiat commodo sed labore.

                    Anim ullamco amet exercitation aliquip velit aliqua nisi fugiat commodo sed labore.
                    Anim ullamco amet exercitation aliquip velit aliqua nisi fugiat commodo sed labore.
                    Anim ullamco amet exercitation aliquip velit aliqua nisi fugiat commodo sed labore.
                    Anim ullamco amet exercitation aliquip velit aliqua nisi fugiat commodo sed labore.
                    Anim ullamco amet exercitation aliquip velit aliqua nisi fugiat commodo sed labore.
                    Anim ullamco amet exercitation aliquip velit aliqua nisi fugiat commodo sed labore.
                    Anim ullamco amet exercitation aliquip velit aliqua nisi fugiat commodo sed labore.
                    Anim ullamco amet exercitation aliquip velit aliqua nisi fugiat commodo sed labore.
                    Anim ullamco amet exercitation aliquip velit aliqua nisi fugiat commodo sed labore.
                    Anim ullamco amet exercitation aliquip velit aliqua nisi fugiat commodo sed labore.
                    </div>
                </div>
                <div v-else class="table-box2">
                    <div class="finish">
                        <el-table :data="tableData?tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize):[]"
                            empty-text="empty"
                            style="width: 100%"
                            :header-cell-style="{background:'#fafafa',color:'#000', fontSize: '16px', lineHeight:'30px'}"
                            :header-row-style="{height: '40px'}"
                            :row-style="{height: '40px', background:'#ffffff',lineHeight:'20px'}">>
                            <el-table-column
                                    prop="perspective_name"
                                    :label="$t('evaluateResult.perspectives')"
                                    width="200" align="center">
                            </el-table-column>
                            <el-table-column
                                    prop="metric_name"
                                    :label="$t('evaluateResult.metrics')"
                                    width="200" align="center">
                            </el-table-column>
                            <el-table-column
                                    prop="score"
                                    :label="$t('evaluateResult.result')"
                                    width="200" align="center">
                            </el-table-column>
                        </el-table>
                        <el-pagination
                            hide-on-single-page
                            background
                            layout="prev, pager, next, jumper, ->, total"
                            :total="tableData?tableData.length:0"
                            :current-page="currentPage"
                            :page-size="pageSize"
                            @current-change="handleCurrentChange">
                        </el-pagination>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import {mapState} from "vuex";
export default {
    name: "EvaluationResult",
    data() {
        return {
            radarOption: null,
            tableData: [],
            
            currentPage: 1,
            pageSize: 6,
            
            evaluateStatus: 'finish',
            evaluateMessage: null,
            evaluationResult: [],
            evaluationInfo: {},

            percent: 0,
            timer: null,
            instance_id: -1,
        }
    },
    async mounted() {
        this.instance_id = this.$route.params.id
        // this.evaluationInfo = await getEvaluationInfo(instance_id)
        // this.timer = setInterval(async () => {
        //     const res = await getModelStatus(instance_id)
        //     if (res.condition == 1) {
        //         //wrong
        //         this.evaluateStatus = 'error'
        //         this.evaluateMessage = res.fault
        //         clearInterval(this.timer)
        //     } else if (res.condition == 2) {
        //         //finish
        //         this.evaluateStatus = 'finish'
        //         this.evaluateMessage = res.evaluate_score
        //         clearInterval(this.timer)
        //     } else if (res.condition == 3) {
        //         //in process
        //         this.percent = res.process
        //     }
        // }, 2000)
    },
    methods: {
        initData() {
            this.evaluationResult = this.result.reduce((pre, cur) => {
                const sum = cur.metrics.reduce((p, c) => (p + c.metric_score), 0)
                pre.push({name: cur.perspective_name, value: ((sum * 100.) / cur.metrics.length).toFixed(2)})
                return pre
            }, [])
            this.result.map(item => {
                item.metrics.map(m => {
                    this.tableData.push({
                        perspective_name: item.perspective_name,
                        metric_name: m.metric_name,
                        score: (m.metric_score * 100).toFixed(2)
                    })
                })
            })
            this.initChart()
        },
        initChart() {
            let chartDom = document.getElementById('chart');
            let myChart = echarts.init(chartDom);
            let indicator = []
            let value = []
            this.evaluationResult.map(e => {
                indicator.push({text: e.name, max: 100})
                value.push(e.value)
            })
            this.radarOption = {
                radar: {
                    indicator: indicator,
                    radius: 60,
                },
                series: [{
                    name: 'evaluation result',
                    type: 'radar',
                    data: [
                        {
                            value: value
                        }
                    ],
                    itemStyle: {
                        color: '#488bd9'
                    },
                    areaStyle: {
                        color: '#488bd9',
                        opacity: 0.8
                    },
                    label: {
                        show: true,
                        position: 'right',
                        formatter: function (params) {
                            return params.value;
                        }
                    }
                }]
            }
            myChart.setOption(this.radarOption)
        },
        handleCurrentChange(newPage) {
            this.currentPage = newPage;
        },
    },
    computed: {
        ...mapState(['evaluateStatus', 'evaluateResult', 'evaluateMessage'])
    }
}
</script>

<style lang="scss" scoped>
.result-container {
  width: 68%;
  margin: 40px auto;
  box-sizing: border-box;
  
  .title {
    margin-bottom: 5px;
    font-size: 30px;
  }

  .card-container{
    width: 90%;
    margin: 20px auto;
    border-radius: 8px;
    box-shadow: 0 0 15px #ededed;

    .result-box{     
        margin:20px auto;   
        .table-box{
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 15px #ededed;
            align-items: center;
            justify-content: center;
            min-height: 300px;
            display: flex;
            .process {
                justify-content: center;
                .progess-label {
                    font-size: 22px;
                    margin-bottom: 20px;
                    text-align: center;
                }
                .progress-bar {
                    width: 500px;
                    margin: auto;
                }
            }

            .error{
                width: 90%;
                height: 260px;
                overflow-y: scroll;
                text-indent:2em;
                font-size: 18px;
                color: #909399;
            }

        }

        .table-box2{
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 15px #ededed;
            justify-content: center;
            min-height: 300px;
            display: flex;

            .finish{
                margin-top: 20px;
                .el-pagination {
                    text-align: center;
                    margin-top: 20px;
                }
                    
                /deep/ .el-pagination .el-pager li {
                    font-size: 16px;
                    margin: 0 4px;
                    cursor: pointer; /* 添加指针样式 */
                    transition: background-color 0.3s ease; /* 添加过渡效果 */
                }
                    
                .el-pagination .el-pager li:hover {
                    background-color: #409EFF;
                    color: #fff;
                }
                    
                    /* 隐藏默认的页码输入框 */
                /deep/ .el-pagination .el-pagination__jump {
                    font-size: 16px;
                }
                    
                    /* 自定义样式，更改分页控件的布局 */
                /deep/ .el-pagination .el-pagination__right {
                    display: flex;
                    align-items: center;
                }
                    
                /deep/ .el-pagination .el-pagination__total {
                    font-size: 16px;
                    margin-left: 10px;
                    color: #666;
                }
            }
        }

        .chart-container {
            margin-right: 20px;
            padding: 20px;
            box-shadow: 0 0 15px #ededed;
            display: flex;

            #chart {
                width: 330px;
                height: 300px;
                //background: red;
            }

            .info {
                width: 650px;
                margin: 0 auto;

                /deep/ .el-descriptions-item__label{
                    width: 200px;
                    font-size: 20px;
                    font-weight: bold;
                }
            }
        }
    }
    
  }

}
</style>
