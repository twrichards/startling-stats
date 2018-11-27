import {css} from "emotion";
import * as React from 'react';
import {Ticker} from "./ticker";

export interface VisualElementProps {
  name: string;
  width: number;
  height: number;
  opacity: number;
  left: number;
  top: number;
  rotateX: number;
  rotateY: number;
  backgroundColor: string;
  color: string;
  body?: JSX.Element;
  fontSize?: number;
}

export const VisualElement = (props: VisualElementProps) => (
  <div className={css`
    position: absolute;
    top: ${props.top}%;
    left: ${props.left}%;
    color: ${props.color};
    width: ${props.width}%;
    height: ${props.height}%;
    opacity: ${props.opacity};
    transform: rotateX(${props.rotateX}deg) rotateY(${props.rotateY}deg);
    font-size: ${props.fontSize || 24}px;
  `}>
    <div className={css`
      position: absolute;
      background: ${props.backgroundColor};
      width: 100%;
      height: 100%;
      opacity: ${props.opacity/2};
    `}/>
    {props.body}
    <div className={css`
      position: absolute;
      padding: 10px;
      width: 100%;
      height: 100%;
    `}>
      <Ticker title={"Emergency Food Parcels"} label={"handed out"} numberOfDays={365/2} overallNumber={658_048}/>
    </div>
  </div>
);