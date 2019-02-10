import { default as Form, UiSchema } from 'react-jsonschema-form';
import * as React from 'react';
import styled from 'styled-components';

import { JSONSchema6 } from 'json-schema';

import { TrainMode } from './TrainModeSelectContainer';

export interface TrainModeSelectProps {
   trainMode: TrainMode;
   formData: any;
   setTrainMode: (trainMode: TrainMode) => void;
   formSchema: { schema: JSONSchema6; uiSchema: UiSchema };
}

const TrainModeDiv = styled.div`
   grid-area: mode;
`;

export class TrainModeSelect extends React.Component<TrainModeSelectProps> {
   render() {
      const { formSchema, trainMode } = this.props;
      return (
         <TrainModeDiv>
            <Form
               {...formSchema}
               formData={{ trainMode }}
               onChange={({ formData: { trainMode } }) =>
                  this.props.setTrainMode(trainMode)
               }
            >
               <br />
            </Form>
         </TrainModeDiv>
      );
   }
}
