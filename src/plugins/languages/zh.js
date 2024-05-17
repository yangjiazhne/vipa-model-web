export default {
    header: {
        home: '主页',
        evaluation: '评估',
        optimization: '优化',
        market: '模型市场',
        logAndReg: '登陆',
        langSelect:'简体中文'
    },
    detail: {
        stayTuned: '敬请期待...'
    },
    header: {
        name: '模型评估平台',
        home: '主页',
        evaluation: '评估',
        optimization: '优化',
        market: '模型市场',
        logAndReg: '登陆',
        langSelect:'简体中文',
        search: 'search'
    },
    title: {
        introduction: '平台简介',
        properties:'评估属性',
        leaderBoard:'模型榜单',
        pipeline:'流程'
    },
    commonUpper: {
        correctness: "正确性",
        robustness: "鲁棒性",
        fairness: "公平性",
        transferability: "可迁移性",
        more: "更多"
    },
    evaluation: {
        introduction: '介绍',
        properties:'评估属性',
        leaderBoard:'模型榜单',
        pipeline:'流程',
        introInfo: 'VIPA模型评估平台致力于为用户提供一站式深度学习模型评估和分析工具。\n' + 
                   '平台提供了丰富的评估指标，涵盖了四种属性下的多个评估视角，帮助用户全面评估模型的性能。\n' + 
                   '用户可以根据具体需求在评估流程中自定义模型、数据集和指标，灵活调整评估参数，以满足不同场景下的评估需求。\n' + 
                   '此外，平台支持可视化展示模型评估结果，让用户直观地了解模型的表现，为模型的改进和优化提供有力支持。 \n' + 
                   '目前，平台已支持对计算机视觉场景下的图像分类、目标检测和图像分割等核心任务进行模型评估和性能比较。\n' + 
                   '未来，我们将继续扩展平台的功能和支持范围，以应对不断发展的深度学习技术和应用需求，为用户提供更全面、更强大的服务。',
        propertiesInfo : '平台目前已支持对模型在正确性、鲁棒性、公平性和可迁移性等方面的表现进行测评。'
    },
    modelTable: {
        model: '模型',
        modelName: '模型名称',
        applicableTasks: '适用任务',
        description: '描述',
        user: '用户',
        paperLink: '论文链接',
        codeLink:'代码链接',
        uploadTime:'上传时间',
        updateTime:'更新时间',
    },
    datasetTable: {
        dataset: '数据集',
        datasetName: '数据集名称',
        applicableTasks: '适用任务',
        description: '描述',
        user: '用户',
        paperLink: '论文链接',
        codeLink:'代码链接',
        uploadTime:'上传时间',
        updateTime:'更新时间',
    },
    paramTable: {
        paramName: '权重名称',
        description: '描述',
        architecture: '模型架构',
        user: '用户',
        uploadTime:'上传时间',
    },
    optimizationTable: {
        optimization: '优化',
    },
    accountTable: {
        account: '账户',
        baseInfo: '基本信息',
        username: '用户名',
        institution: '机构',
        title: '头衔',
        homepage: '个人主页'
    },
    operate: {
        edit: '编辑',
        save: '保存',
        cancel: '取消',
        pre: '上一步',
        next: '下一步',
        detail: '详情',
        startTask: '启动任务',
        goEvaluate: '前往评估',
        viewDetail:'查看'
    },
    leaderBoard: {
        task: '-任务-',
        dataset: '-数据集-',
        aspect: '-评估属性-',
        empty:'暂无',
        modelName: '模型名称',
        evaluationResult: '评估结果',
        parameterSize: '参数大小',
        user: '用户',
        paperLink: '论文链接',
        codeLink:'代码链接',
        operate:'操作',
    },
    creator: {
        steps:{
            env: '选择环境',
            task: '选择任务类型',
            metric: '选择评估指标',
            arc: '选择模型结构',
            param: '选择模型权重',
            dataset: '选择数据集',
            evaluate: '评估'
        },
        metric: {
            selectTitle: '选择评估指标'
        },
        arch: {
            selectTitle: '选择模型结构',
            modelDescription: '模型描述',
            upload: '上传'
        },
        dataset: {
            selectTitle: '选择数据集',
            datasetDescription: '数据集描述',
            upload: '上传'
        },
        param:{
            selectTitle: '选择权重',
            paramDescription: '权重描述',
            drag:'拖拽到此,或 ',
            click:'点击',
            tip1:'注意: 只有',
            tip2:'.pt',
            tip3:' 或 ',
            tip4:'.pth',
            tip5:' 格式的文件可以被接收'
        },
        evaluate:{
            title: '全部选项',
            env: '环境',
            task: '任务类型',
            metric: '评估指标',
            model: '模型',
            param: '权重',
            dataset: '数据集',
            datasetDetail: '数据集详情',
            modelDetail: '模型详情',
            parameterDetail: '权重详情'
        }
    },
    user: {
        model: '模型',
        dataset: '数据集',
        optimization: '优化',
        account: '账户'
    },
    evaluating: {
        progress: '评估进度'
    },
    evaluateResult: {
        title: '评估结果',
        error:'评估错误',
        perspectives: 'Perspectives',
        metrics: '指标',
        result: '结果'
    }
}
