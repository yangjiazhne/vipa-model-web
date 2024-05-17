<template>
    <div class="leader-board-container">
        <h1 class="leader-board-title">{{ $t("title.leaderBoard") }}</h1>
        <!-- <div class="block">
            Anim ullamco amet exercitation aliquip velit aliqua nisi fugiat commodo sed labore. Dolor duis
            dolor laboris officia ullamco veniam excepteur nulla consectetur ea amet labore voluptate aliqua ea aute.
        </div> -->
        <div class="leader-board-box">
            <!-- <div class="single-selector-group block" v-if="selectMode">
                <div :class="singleProp==='correctness'?'selected':''" @click="selectSingle('correctness')">
                    {{ $t("commonUpper.correctness") }}
                </div>
                <div :class="singleProp==='robustness'?'selected':''" @click="selectSingle('robustness')">
                    {{ $t("commonUpper.robustness") }}
                </div>
                <div :class="singleProp==='fairness'?'selected':''" @click="selectSingle('fairness')">
                    {{ $t("commonUpper.fairness") }}
                </div>
                <div :class="singleProp==='transferability'?'selected':''" @click="selectSingle('transferability')">
                    {{ $t("commonUpper.transferability") }}
                </div>
                <div :class="singleProp==='more'?'selected':''" @click="selectSingle('more')">{{
                    $t("commonUpper.more")
                    }}
                </div>
            </div> -->
            <div class="filter-group block">
                <div class="core-filter">
                    <el-select style="margin-right: 10px" v-model="task" :placeholder="$t('leaderBoard.task')" @change="currStationChange"
                               :no-match-text="$t('leaderBoard.empty')" :no-data-text="$t('leaderBoard.empty')">
                        <el-option
                                v-for="(item,index) in taskAll"
                                class="filter-item"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select style="margin-right: 10px" v-model="dataset" :placeholder="$t('leaderBoard.dataset')" @change="currStationChange"
                                :no-match-text="$t('leaderBoard.empty')" :no-data-text="$t('leaderBoard.empty')">
                        <el-option
                                v-for="(item,index) in datasetAll"
                                class="filter-item"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="aspect" v-if="selectMode" :placeholder="$t('leaderBoard.aspect')" @change="currStationChange"
                                :no-match-text="$t('leaderBoard.empty')" :no-data-text="$t('leaderBoard.empty')">
                        <el-option
                                v-for="(item,index) in aspectAll"
                                class="filter-item"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="table-box">
                <el-table 
                    :data="leaderList?leaderList.slice((currentPage - 1) * pageSize, currentPage * pageSize):[]"
                    :empty-text="$t('leaderBoard.empty')"
                    style="width: 100%"
                    :header-cell-style="{background:'#fafafa',color:'#000', fontSize: '16px', lineHeight:'30px'}"
                    :header-row-style="{height: '60px'}"
                    :row-style="{height: '60px', background:'#ffffff',lineHeight:'30px'}">
                    <el-table-column
                            prop="model_architecture_name"
                            :label="$t('leaderBoard.modelName')"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="evaluation_result"
                            :label="$t('leaderBoard.evaluationResult')"
                            width="220"
                            align="center">
                        <template slot-scope="scope">
                            <div style="width:200px;height: 120px" :id="`chart-${scope.$index}`"></div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="parameter_size"
                            :label="$t('leaderBoard.parameterSize')"
                            align="center">
                    </el-table-column>
                    <!-- <el-table-column
                            prop="user_name"
                            :label="$t('leaderBoard.user')"
                            align="center">
                    </el-table-column> -->
                    <el-table-column
                            :label="$t('leaderBoard.paperLink')"
                            align="center">
                        <template slot-scope="scope">
                            <el-link :underline="false" :href="scope.row.paper_link" style="font-size: 16px;">{{scope.row.paper_link}}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            :label="$t('leaderBoard.codeLink')"
                            align="center">
                            <template slot-scope="scope">
                                <el-link :underline="false" :href="scope.row.code_link" style="font-size: 16px;">{{scope.row.code_link}}</el-link>
                            </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            :label="$t('leaderBoard.operate')"
                            width="100"
                            align="center">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" style="font-size: 16px;">{{$t('operate.viewDetail')}}</el-button>
                            </template>
                    </el-table-column>
                </el-table> 
                <el-pagination
                    hide-on-single-page
                    background
                    layout="prev, pager, next, jumper, ->, total"
                    :total="leaderList?leaderList.length:0"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    @current-change="handleCurrentChange">
                </el-pagination>
            </div>
            
        </div>
    </div>
</template>

<script>
import {getLeaderList} from "@/models/EvaluationModel";
import * as echarts from "echarts";
import {mapState} from "vuex";

export default {
    name: "LeaderBoard",
    props: {
        selectMode: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            task: '',
            dataset: '',
            aspect: '',
            currentPage: 1,
            pageSize: 2,
            leaderList: []
        }
    },
    computed: {
        ...mapState(['datasetAll', 'taskAll', 'aspectAll'])
    },
    created() {
        this.task = this.taskAll[0].id
        this.dataset = this.datasetAll[0].id
        if(this.selectMode){
            this.aspect = this.aspectAll[0].id
        }else{
            const p = this.aspectAll.find( t => t.name === this.$route.params.prop)
            this.aspect = p.id
        }
        // this.fetchLeaderList()
        // const data = await getLeaderList(this.task, this.dataset, this.aspect)
        this.leaderList = [
                {
                    "model_architecture_name": "Ruth Rodriguez",
                    "perspective_result": [
                        {
                            "name": "lgxxpqo",
                            "metrics": [
                                {
                                    "name": "mollit exercitation",
                                    "value": 10
                                },
                                {
                                    "name": "consectetur aute nulla",
                                    "value": 10
                                },
                                {
                                    "name": "laborum ad nulla pariatur sit",
                                    "value": 10
                                },
                                {
                                    "name": "culpa amet consequat tempor",
                                    "value": 10
                                },
                                {
                                    "name": "sunt",
                                    "value": 10
                                }
                            ]
                        },
                        {
                            "name": "qei",
                            "metrics": [
                                {
                                    "name": "in non elit ea",
                                    "value": 10
                                },
                                {
                                    "name": "ut ex quis Excepteur",
                                    "value": 10
                                },
                                {
                                    "name": "esse",
                                    "value": 10
                                },
                                {
                                    "name": "veniam",
                                    "value": 10
                                }
                            ]
                        },
                        {
                            "name": "swolp",
                            "metrics": [
                                {
                                    "name": "sint adipisicing sit est",
                                    "value": 10
                                },
                                {
                                    "name": "deserunt ullamco qui minim",
                                    "value": 10
                                },
                                {
                                    "name": "nulla ut eiusmod elit qui",
                                    "value": 10
                                }
                            ]
                        },
                        {
                            "name": "ozdiwsqfr",
                            "metrics": [
                                {
                                    "name": "dolore ut",
                                    "value": 10
                                },
                                {
                                    "name": "enim",
                                    "value": 10
                                },
                                {
                                    "name": "culpa in",
                                    "value": 10
                                }
                            ]
                        },
                        {
                            "name": "dzxgo",
                            "metrics": [
                                {
                                    "name": "fugiat ut anim",
                                    "value": 10
                                },
                                {
                                    "name": "anim pariatur aliqua in",
                                    "value": 10
                                }
                            ]
                        }
                    ],
                    "parameter_size": 7534,
                    "user": "Anna Harris",
                    "paper_link": "http://vhcpk.coop/rmqocybir",
                    "code_link": "http://cpxm.rw/tqltfbes",
                    "model_instance_id": 460000200601145400
                },
                {
                    "model_architecture_name": "Jeffrey Brown",
                    "perspective_result": [
                        {
                            "name": "bjxhlhb",
                            "metrics": [
                                {
                                    "name": "ut aliquip cillum eiusmod",
                                    "value": 10
                                }
                            ]
                        },
                        {
                            "name": "rfajrmp",
                            "metrics": [
                                {
                                    "name": "amet ad aliqua officia Duis",
                                    "value": 10
                                },
                                {
                                    "name": "laboris mollit sint Excepteur ut",
                                    "value": 10
                                },
                                {
                                    "name": "officia eiusmod exercitation",
                                    "value": 10
                                },
                                {
                                    "name": "commodo ut",
                                    "value": 10
                                }
                            ]
                        },
                        {
                            "name": "rnhfetwux",
                            "metrics": [
                                {
                                    "name": "anim",
                                    "value": 10
                                },
                                {
                                    "name": "nisi officia sit sint",
                                    "value": 10
                                },
                                {
                                    "name": "in",
                                    "value": 10
                                },
                                {
                                    "name": "aute ut exercitation in",
                                    "value": 10
                                },
                                {
                                    "name": "sunt esse dolor",
                                    "value": 10
                                }
                            ]
                        },
                        {
                            "name": "nrjdjym",
                            "metrics": [
                                {
                                    "name": "exercitation non",
                                    "value": 10
                                },
                                {
                                    "name": "esse et aliquip",
                                    "value": 10
                                },
                                {
                                    "name": "do",
                                    "value": 10
                                }
                            ]
                        },
                        {
                            "name": "mxskejjsw",
                            "metrics": [
                                {
                                    "name": "cillum cupidatat laborum",
                                    "value": 10
                                }
                            ]
                        }
                    ],
                    "parameter_size": 8133.1,
                    "user": "Larry Garcia",
                    "paper_link": "http://svry.bi/ezreoafkb",
                    "code_link": "http://zfmgxvgv.museum/qruftg",
                    "model_instance_id": 150000198907125760
                },
                {
                    "model_architecture_name": "Paul Williams",
                    "perspective_result": [
                        {
                            "name": "lmuxmvddnl",
                            "metrics": [
                                {
                                    "name": "deserunt consectetur aliqua ad",
                                    "value": 10
                                },
                                {
                                    "name": "proident est occaecat Lorem ut",
                                    "value": 10
                                },
                                {
                                    "name": "nostrud anim",
                                    "value": 10
                                }
                            ]
                        },
                        {
                            "name": "arykfgv",
                            "metrics": [
                                {
                                    "name": "nisi eiusmod aliqua ut",
                                    "value": 10
                                },
                                {
                                    "name": "in magna velit",
                                    "value": 10
                                },
                                {
                                    "name": "mollit exercitation reprehenderit incididunt",
                                    "value": 10
                                },
                                {
                                    "name": "occaecat incididunt est",
                                    "value": 10
                                },
                                {
                                    "name": "deserunt commodo aute Duis",
                                    "value": 10
                                }
                            ]
                        },
                        {
                            "name": "qumuo",
                            "metrics": [
                                {
                                    "name": "in veniam laborum ad",
                                    "value": 10
                                }
                            ]
                        },
                        {
                            "name": "jontdzl",
                            "metrics": [
                                {
                                    "name": "ullamco anim cupidatat esse",
                                    "value": 10
                                },
                                {
                                    "name": "sit ullamco incididunt",
                                    "value": 10
                                },
                                {
                                    "name": "tempor est ea sit proident",
                                    "value": 10
                                }
                            ]
                        },
                        {
                            "name": "duvuwgisy",
                            "metrics": [
                                {
                                    "name": "Lorem magna eiusmod",
                                    "value": 10
                                },
                                {
                                    "name": "do laboris minim consectetur ut",
                                    "value": 10
                                },
                                {
                                    "name": "sint nostrud non minim reprehenderit",
                                    "value": 10
                                },
                                {
                                    "name": "aute",
                                    "value": 10
                                }
                            ]
                        }
                    ],
                    "parameter_size": 9252.1,
                    "user": "Scott Martin",
                    "paper_link": "http://zlnlheyw.sn/bjlmby",
                    "code_link": "http://eicjuxg.ru/hfo",
                    "model_instance_id": 320000201004185660
                }
            ],
        this.leaderList.forEach(instance => {
            instance.perspective_result.forEach(p => {
                const sum = p.metrics.reduce((pre, cur) => (pre + cur.value), 0)
                p.score = ((sum * 100) / p.metrics.length).toFixed(2)
            })
        })
        this.leaderList.map((item, index) => {
            this.$nextTick(() => {
                this.initChart(item.perspective_result, index)
            })
        })
    },
    methods: {
        async fetchLeaderList(){
            const data = await getLeaderList(this.task, this.dataset, this.aspect)
            this.leaderList = data
            this.leaderList.forEach(instance => {
                instance.perspective_result.forEach(p => {
                    const sum = p.metrics.reduce((pre, cur) => (pre + cur.value), 0)
                    p.score = ((sum * 100) / p.metrics.length).toFixed(2)
                })
            })
            this.leaderList.map((item, index) => {
                this.$nextTick(() => {
                    this.initChart(item.perspective_result, index)
                })
            })
        },
        currStationChange(val){
            console.log(this.task, this.dataset, this.aspect)
        },
        handleClick(row) {
            console.log(row);
        },
        handleCurrentChange(newPage) {
            this.currentPage = newPage;
            // this.leaderList.map((item, index) => {
            //     this.$nextTick(() => {
            //         this.initChart(item.perspective_result, index)
            //     })
            // })
        },
        initChart(item, index) {
            let chartDom = document.getElementById(`chart-${index}`);
            let myChart = echarts.init(chartDom);
            let indicator = []
            let value = []
            item.map(e => {
                indicator.push({text: e.name, max: 2000})
                value.push(e.score)
            })
            this.radarOption = {
                radar: {
                    indicator: indicator,
                    radius: 25,
                },
                width:200,
                height:80,
                series: [{
                    // name: 'evaluation result',
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
                        show: false,
                        fontSize: 10,
                        fontWeight: 100,
                        position: 'right',
                        formatter: function (params) {
                            return params.value;
                        }
                    }
                }]
            }
            myChart.setOption(this.radarOption)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/variables";

.leader-board-container {
  width: 100%;

  .leader-board-title{
    margin-bottom: 20px;
    font-size: 30px;
  }
  
  .block {
    margin-bottom: 20px;
  }

  .leader-board-box{
    padding: 20px;
    box-shadow: 0 0 15px #ededed;
    border-radius: 8px;

    .single-selector-group {
        display: flex;

        div {
            width: 20%;
            height: 40px;
            background: $blockBlue;
            line-height: 40px;
            text-align: center;
            font-weight: bolder;
            font-size: 22px;
        }

        .selected {
            background: $blockBlueHover;
        }

        div:hover {
            background: $blockBlueHover;
            cursor: pointer;
        }

    }

    .filter-group {
        display: flex;
        width: 100%;
        flex-direction: row;
        align-items: center;
        margin-top: 20px;

        .core-filter {
            display: flex;
            width: 40%;
            margin-left: 30px;
            /deep/ .el-input .el-input__inner {
                font-size: 20px;
            }

        }

        .more-selector {
            width: 40%;
            padding: 5px 20px;
            border-radius: 4px;
            border: 1px solid #dcdfe6;

            /deep/ .el-checkbox {
                line-height: 30px;
                color: #303133;
            }

            /deep/ .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
                background-color: #409eff;
                border-color: #409eff
            }

            /deep/ .el-checkbox__input.is-disabled .el-checkbox__inner:after {
                border-color: #fff
            }

            /deep/ .el-checkbox__input.is-disabled+span.el-checkbox__label {
                color: #409eff;
            }

            /deep/ .el-checkbox__label {
                font-size: 18px;
            }
        }
    }

    .table-box{
        padding: 20px 20px 0 20px;
        .el-table{
            font-size: 20px;
            color: #303133;
        }

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
}
</style>

<style lang="scss">
    .el-table_1_column_1{
        font-weight: bolder !important;
    }

    .filter-item {
        font-size: 20px;
        line-height: 26px;
    }
</style>