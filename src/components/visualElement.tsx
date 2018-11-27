import {css} from "emotion";
import * as React from 'react';
import {RGBColor} from "react-color";
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
  backgroundColor: RGBColor;
  color: string;
  fontSize: number;
  body?: JSX.Element;
  selected?: boolean;
  onClick?: () => void;
}

export const VisualElement = (props: VisualElementProps) => (
  <div
    className={css`
      position: absolute;
      top: ${props.top}%;
      left: ${props.left}%;
      color: ${props.color};
      width: ${props.width}%;
      height: ${props.height}%;
      opacity: ${props.opacity};
      transform: rotateX(${props.rotateX}deg) rotateY(${props.rotateY}deg);
      font-size: ${props.fontSize}px;
      background: rgba(${props.backgroundColor.r},${props.backgroundColor.g},${props.backgroundColor.b},${props.backgroundColor.a});
      cursor: pointer;
      border: red 2px ${props.selected ? "dashed" : "none"}
    `}
    onClick={props.onClick}>
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