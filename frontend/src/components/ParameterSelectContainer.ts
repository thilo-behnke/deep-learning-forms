import { DatasetEnum, startTraining, updateForm } from '../actions/actions';
import { connect } from 'react-redux';
import { ParameterSelect, ParameterSelectProps } from './ParameterSelect';
import { TrainMode } from './TrainModeSelectContainer';

const trainingSchema = {
    title: 'Train Conv2D',
    type: 'object',
    properties: {
        layers: {
            title: 'layers',
            type: 'integer',
            minimum: 1,
            maximum: 10
        },
        epochs: {
            title: 'Epochs',
            type: 'number',
            minimum: 5,
            maximum: 20
        }
    }
}

const trainingUiSchema = {
    // classNames: 'row',
    layers: {
        "ui:widget": "range",
        // classNames: 'col-lg-2 col-md-4 col-sm-6 col-xs-12'
    },
    epochs: {
        'ui:widget': 'range',
        // classNames: 'col-lg-2 col-md-4 col-sm-6 col-xs-12'
    }
}

const mapStateToProps = (state: any, props: any): ParameterSelectProps => {
    const {dataset, trainMode, spec: {parameterSelect: {formData}}} = state
    const {trainingResults: {isLoading, data: trainingResults}} = state
    return {
        ...props,
        dataset,
        trainMode,
        isLoading,
        trainingResults,
        ...{formSchema: {schema: trainingSchema, uiSchema: trainingUiSchema}},
        ...{formData}
    }
}

const mapDispatchToProps = (dispatch: any, props: any) => {
    return {
        ...props,
        startTraining: (trainMode: TrainMode, dataset: DatasetEnum, layers: number, epochs: number) => dispatch(startTraining(trainMode, dataset, layers, epochs)),
        updateForm: (formData: any) => dispatch(updateForm('parameterSelect', formData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParameterSelect)