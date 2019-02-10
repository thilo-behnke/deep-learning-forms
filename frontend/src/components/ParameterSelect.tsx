import { default as Form, UiSchema } from 'react-jsonschema-form';
import * as Highcharts from 'highcharts';
import * as React from 'react';
import ReactChartkick, { LineChart } from 'react-chartkick';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

import { JSONSchema6 } from 'json-schema';

import { DatasetEnum } from '../actions/actions';
import { TrainMode } from './TrainModeSelectContainer';

ReactChartkick.addAdapter(Highcharts);

export interface ParameterSelectProps {
   dataset: DatasetEnum;
   trainMode: TrainMode;
   formData: any;
   isLoading: boolean;
   updateForm: (formData: any) => void;
   formSchema: { schema: JSONSchema6; uiSchema: UiSchema };
   startTraining: (
      trainMode: TrainMode,
      datset: DatasetEnum,
      layers: number,
      epochs: number
   ) => void;
   trainingResults: { history: any; params: any };
}

const ParameterSelectDiv = styled.div`
   grid-area: parameter;
`;

export class ParameterSelect extends React.Component<ParameterSelectProps> {
   render() {
      const {
         formSchema,
         formData,
         isLoading,
         trainingResults,
         trainMode,
         dataset,
      } = this.props;
      return (
         <ParameterSelectDiv>
            <Form
               {...formSchema}
               formData={formData}
               onChange={({ formData }) => this.props.updateForm({ formData })}
               onSubmit={({ formData: { layers, epochs } }) =>
                  this.props.startTraining(trainMode, dataset, layers, epochs)
               }
            />
            {isLoading && (
               <ReactLoading
                  className="align-self-center"
                  type={'spin'}
                  color={'green'}
               />
            )}
            {!isLoading && trainingResults && (
               <div className="d-flex flex-column">
                  <span>Result:</span>
                  <div className="d-flex flex-row">
                     <LineChart
                        data={trainingResults.history.loss.reduce(
                           (acc: object, x: number, i: number) => ({
                              ...acc,
                              ...{ [i]: x },
                           }),
                           {}
                        )}
                     />
                     <LineChart
                        data={trainingResults.history.acc.reduce(
                           (acc: object, x: number, i: number) => ({
                              ...acc,
                              ...{ [i]: x },
                           }),
                           {}
                        )}
                     />
                  </div>
               </div>
            )}
         </ParameterSelectDiv>
      );
   }
}
