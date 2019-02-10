import { connect } from 'react-redux';
import { DatasetSelect, DatasetSelectProps } from './DatasetSelect';
import { DatasetEnum, setDataset } from '../actions/actions';
import { TrainMode } from './TrainModeSelectContainer';

export type Dataset = {
    name: DatasetEnum,
    trainModes: TrainMode[]
}

const Datasets = [
    {
        name: 'mnist',
        trainModes: [TrainMode.DEEP]
    },
    {
        name: 'fashion_mnist',
        trainModes: [TrainMode.DEEP]
    },
    {
        name: 'happy',
        trainModes: [TrainMode.DEEP, TrainMode.CONV]
    },
]

const datasetSelectSchema = {
    title: 'Select DatasetEnum',
    type: 'object',
    properties: {
        dataset: {
            type: 'number',
            enum: Datasets.map(({name}) => name)
        }
    }
}

const mapStateToProps = (state: any, props: any): DatasetSelectProps => {
    const {dataset, trainMode} = state

    const datasetUiSchema = {
        dataset: {
            'ui:enumDisabled': Datasets.filter(({trainModes}) => !trainModes.includes(trainMode)).map(({name}) => name)
        }
    }

    return {
        ...props,
        ...{
            formSchema: {schema: {...datasetSelectSchema}, uiSchema: datasetUiSchema},
            dataset
        }
    }
}

const mapDispatchToProps = (dispatch: any, props: any) => ({
    ...props,
    setDataset: (dataset: DatasetEnum) => dispatch(setDataset(dataset))
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetSelect)