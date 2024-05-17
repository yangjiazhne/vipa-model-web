export default {
    header: {
        name: 'Model Evaluation',
        home: 'Home',
        evaluation: 'Evaluation',
        optimization: 'Optimization',
        market: 'Model Market',
        logAndReg: 'Sign In',
        langSelect: 'English',
        search: 'search'
    },
    detail: {
        stayTuned: 'Stay Tuned...'
    },
    title: {
        introduction: 'Introduction',
        properties:'Properties',
        leaderBoard:'LeaderBoard',
        pipeline:'Pipeline'
    },
    commonUpper: {
        correctness: "Correctness",
        robustness: "Robustness",
        fairness: "Fairness",
        transferability: "Transferability",
        more: "More"
    },
    commonLower: {
        correctness: "correctness",
        robustness: "robustness",
        fairness: "fairness",
        transferability: "transferability",
        more: "more"
    },
    evaluation: {
        introduction: 'Introduction',
        properties:'Properties',
        leaderBoard:'LeaderBoard',
        pipeline:'Pipeline',
        introInfo: 'The VIPA model evaluation platform is committed to providing users with a one-stop solution for deep learning model evaluation and analysis tools. \n' + 
        'The platform offers a wide range of evaluation metrics, covering multiple evaluation perspectives under four attributes,\n' + 
        ' helping users comprehensively assess the performance of their models. Users can customize models, datasets, \n' + 
        'and metrics in the evaluation process according to specific needs, adjust evaluation parameters flexibly to meet evaluation requirements in different scenarios.\n' + 
        ' Additionally, the platform supports visual display of model evaluation results, allowing users to intuitively understand the performance of their models,\n' + 
        ' providing strong support for model improvement and optimization. \n' + 
        'Currently, the platform already supports model evaluation and performance comparison for core tasks such as image classification, object detection, and image segmentation in computer vision scenarios. \n' + 
        'In the future, we will continue to expand the platform\'s functionality and support range to meet the evolving demands of deep learning technology and applications,\n' + 
        ' providing users with a more comprehensive and powerful service.',
        propertiesInfo : 'The platform currently supports evaluation of model performance in terms of Correctness, Robustness, Fairness, and Transferability.'
    },
    modelTable: {
        model: 'Model',
        modelName: 'Model Name',
        applicableTasks: 'Applicable Tasks',
        description: 'Description',
        user: 'User',
        paperLink: 'Paper Link',
        codeLink:'Code Link',
        uploadTime:'Upload Time',
        updateTime:'Update Time',
    },
    datasetTable: {
        dataset: 'Dataset',
        datasetName: 'Dataset Name',
        applicableTasks: 'Applicable Tasks',
        description: 'Description',
        user: 'User',
        paperLink: 'Paper Link',
        codeLink:'Code Link',
        uploadTime:'Upload Time',
        updateTime:'Update Time',
    },
    paramTable: {
        paramName: 'Checkpoint Name',
        description: 'Description',
        architecture: 'architecture',
        user: 'User',
        uploadTime:'Upload Time',
    },
    optimizationTable: {
        optimization: 'Optimization',
    },
    accountTable: {
        account: 'Account',
        baseInfo: 'Basic Information',
        username: 'Username',
        institution: 'Institution',
        title: 'Title',
        homepage: 'Homepage'
    },
    operate: {
        edit: 'edit',
        save: 'save',
        cancel: 'cancel',
        pre: 'pre',
        next: 'next',
        detail: 'detail',
        startTask: 'start task',
        goEvaluate: 'Go Evaluation',
        viewDetail:'detail'
    },
    leaderBoard: {
        task: '-Task-',
        dataset: '-Dataset-',
        aspect: '-Property-',
        empty: 'empty',
        modelName: 'Model Name',
        evaluationResult: 'Evaluation Result',
        parameterSize: 'Parameter Size',
        user: 'User',
        paperLink: 'Paper Link',
        codeLink:'Code Link',
        operate:'Operate',
    },
    creator: {
        steps:{
            env: 'Select Environment',
            task: 'Select Task',
            metric: 'Select Evaluation Metric',
            arc: 'Select Model Architecture',
            param: 'Select Model Checkpoint',
            dataset: 'Select Dataset',
            evaluate: 'Evaluate'
        },
        metric: {
            selectTitle: 'Select Evaluation Metric',
        },
        arch: {
            selectTitle: 'Select Model Arch',
            modelDescription: 'Model Description',
            upload: 'Go Upload'
        },
        dataset: {
            selectTitle: 'Select Dataset',
            datasetDescription: 'Dataset Description',
            upload: 'Go Upload'
        },
        param:{
            selectTitle: 'Select Checkpoint',
            paramDescription: 'Checkpoint Description',
            drag:'Drag here,or ',
            click:'Click',
            tip1:'Note: Only files in',
            tip2:'.pt',
            tip3:' or ',
            tip4:'.pth',
            tip5:' format are accepted'
        },
        evaluate:{
            title: 'All Options',
            env: 'Environment',
            task: 'Task type',
            metric: 'Metrics',
            model: 'Model',
            param:'Checkpoint',
            dataset: 'Dataset',
            datasetDetail: 'Dataset Detail',
            modelDetail: 'Model Detail',
            parameterDetail: 'Checkpoint Detail'
        }
    },
    user: {
        model: 'Model',
        dataset: 'Dataset',
        optimization: 'Optimization',
        account: 'Account'
    },
    evaluating: {
        progress: 'evaluating progress'
    },
    evaluateResult: {
        title: 'Evaluation Result',
        error:'Evaluation Error',
        perspectives: 'Perspectives',
        metrics: 'Metrics',
        result: 'Result'
    }
}
