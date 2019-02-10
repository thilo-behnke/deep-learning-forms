import Form, { UiSchema } from 'react-jsonschema-form';
import * as React from 'react';
import styled from 'styled-components';

import { JSONSchema6 } from 'json-schema';

import { DatasetEnum } from '../actions/actions';

export interface DatasetSelectProps {
   dataset: DatasetEnum;
   setDataset: (dataset: DatasetEnum) => void;
   formSchema: { schema: JSONSchema6; uiSchema?: UiSchema };
}

const DatasetSelectDiv = styled.div`
   grid-area: dataset;
`;
export class DatasetSelect extends React.Component<DatasetSelectProps> {
   render() {
      const { formSchema, dataset, setDataset } = this.props;
      console.log(formSchema);
      return (
         <DatasetSelectDiv>
            <Form
               {...formSchema}
               formData={{ dataset }}
               onChange={({ formData: { dataset } }) => setDataset(dataset)}
            />
         </DatasetSelectDiv>
      );
   }
}
