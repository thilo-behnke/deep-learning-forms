import { loadData, updateForm } from '../actions/actions';
import { connect } from 'react-redux';
import SampleSelect, { SampleSelectProps } from './SampleSelect';

const mapStateToProps = (state: any, props: any): SampleSelectProps => {
    const {
        dataset,
        sampleData: {sampleImages, sampleLabels, shape},
        spec: {sampleSelect: {formData}}
    } = state
    return {
        ...props,
        ...{sampleData: {sampleImages, sampleLabels, shape}},
        ...{formData},
        dataset
    }
}

const mapDispatchToProps = (dispatch: any, props: any) => ({
    ...props,
    loadData: (sampleSize: number) => dispatch(loadData(sampleSize)),
    updateForm: (formData: any) => dispatch(updateForm('sampleSelect', formData))
})

export default connect(mapStateToProps, mapDispatchToProps)(SampleSelect)