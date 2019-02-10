import Form from 'react-jsonschema-form';
import * as React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

import { JSONSchema6 } from 'json-schema';
import { toString as _toString } from 'lodash';

import { DatasetEnum } from '../actions/actions';

const sampleImagesSchema = {
   title: 'Show sample Images',
   type: 'object',
   properties: {
      sampleSize: {
         type: 'number',
         title: 'Sample Size',
         minimum: 0,
         maximum: 100,
      },
   },
} as JSONSchema6;

const log = (type: any) => console.log.bind(console, type);

const SampleSelectDiv = styled.div`
   grid-area: sample;
   display: grid;
   grid-template-columns: repeat(2, 1fr);
   grid-column-gap: 1em;
`;

export interface SampleSelectProps {
   dataset: DatasetEnum;
   formData: any;
   sampleData: {
      sampleImages: ImageData[];
      sampleLabels: number[];
      shape: number;
   };
   loadData: (sampleSize?: number) => void;
   updateForm: (formData: any) => void;
}

class SampleSelect extends React.Component<SampleSelectProps> {
   canvas: HTMLCanvasElement;
   ctx: CanvasRenderingContext2D | null;
   constructor(props: SampleSelectProps) {
      super(props);
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
   }

   initCanvas() {
      this.canvas.width = 28 * 10;
      this.canvas.height = 28 * 10;
      document.getElementById('sampleImages')!.appendChild(this.canvas);
      return this.ctx;
   }

   componentWillReceiveProps(props: SampleSelectProps) {
      const { dataset: oldDataset } = this.props;
      const { dataset: newDataset } = props;
      oldDataset !== newDataset &&
         this.props.loadData(this.props.formData.sampleSize);
   }

   componentDidMount() {
      this.props.loadData(50);
      this.ctx = this.initCanvas();
   }

   public render() {
      const { sampleImages = [], sampleLabels = [], shape = 28 } =
         this.props.sampleData || {};
      const {
         formData: { sampleSize },
      } = this.props;

      if (this.ctx) {
         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
         this.ctx.canvas.width = 10 * shape;
         this.ctx.canvas.height = 10 * shape;
      }

      sampleImages.forEach(
         (x: ImageData, i: number) =>
            this.ctx &&
            this.ctx.putImageData(
               x,
               (i % 10) * shape,
               Math.floor((i / 10) % 10) * shape
            )
      );
      sampleLabels
         .map(_toString)
         .forEach(
            (x: string, i: number) =>
               this.ctx &&
               this.ctx.fillText(
                  x,
                  (i % 10) * shape,
                  Math.floor((i / 10) % 10) * shape + shape
               )
         );

      return (
         <SampleSelectDiv>
            <Form
               schema={sampleImagesSchema}
               formData={{ sampleSize }}
               onChange={({ formData }) => this.props.updateForm({ formData })}
               onSubmit={({ formData: { sampleSize } }) =>
                  this.props.loadData(sampleSize)
               }
               onError={log('errors')}
            />
            <div id="sampleImages" className="d-flex flex-column">
               {sampleImages.length === 0 && (
                  <ReactLoading
                     className="align-self-center"
                     type={'spin'}
                     color={'green'}
                  />
               )}
            </div>
         </SampleSelectDiv>
      );
   }
}

export default SampleSelect;
