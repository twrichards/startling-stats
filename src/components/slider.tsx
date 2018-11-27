import {css} from "emotion";
import {ChangeEvent} from "react";
import * as React from 'react';

export interface SliderProps {
  label: string;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

export const Slider = (props: SliderProps) => (
  <label >
    {props.label}
    <input className={css`
      width: 250px
    `} type="range"
           min={props.min}
           max={props.max}
           step={(props.max-props.min)/1000}
           onChange={
             (event: ChangeEvent<HTMLInputElement>) => props.onChange(Number(event.target.value))
           }
    />
  </label>
);