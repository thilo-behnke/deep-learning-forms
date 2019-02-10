import { connect } from 'react-redux';

import { DatasetSelectProps } from './DatasetSelect';
import { TrainModeSelect } from './TrainModeSelect';
import { setTrainMode } from '../actions/actions';

export enum TrainMode {
    DEEP = 'deep',
    CONV = 'conv'
}

const trainModeSelectSchema = {
    title: 'Select Training Mode',
    type: 'object',
    properties: {
        trainMode: {
            type: 'string',
            enum: [TrainMode.DEEP, TrainMode.CONV]
        }
    }
}


const mapStateToProps = (state: any, props: any): DatasetSelectProps => {
    const {trainMode} = state
    return {
        ...props,
        ...{formSchema: {schema: trainModeSelectSchema}},
        trainMode
    }
}

const mapDispatchToProps = (dispatch: any, props: any) => ({
    ...props,
    setTrainMode: (trainMode: TrainMode) => dispatch(setTrainMode(trainMode))
})

export default connect(mapStateToProps, mapDispatchToProps)(TrainModeSelect)
