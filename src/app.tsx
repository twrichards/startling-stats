import {css} from "emotion";
import * as React from 'react';
import {ChangeEvent} from "react";
import {HuePicker, SketchPicker} from 'react-color'
import {Slider} from "./components/slider";
import {VisualElement, VisualElementProps} from "./components/visualElement";

export interface AppState {
  elements: VisualElementProps[];
  selectedElement: VisualElementProps;
  newElementName: string;
}

const backgroundElement = {
  name: "background",
  width: 90,
  height: 90,
  top: 5,
  left: 5,
  rotateX: 0,
  rotateY: 0,
  opacity: 0.5,
  color: "red",
  backgroundColor: "hotpink"
};

export class App extends React.Component<{},AppState> {

  public state = {
    elements: [backgroundElement],
    selectedElement: backgroundElement,
    newElementName: ""
  };

  public render(): React.ReactNode {
    return (
      <div className={css`
      position: relative;
      font-family: sans-serif;
      overflow: hidden;
    `}>
        <div id="sidebar" className={css`
          position: absolute;
          background: gray;
          right: 0;
          top: 0;
          z-index: 99999;
          display: flex;
          flex-direction: column;
          padding: 10px;
        `}>
          <h3>PROPS: {this.state.selectedElement.name}</h3>
          <div id="sliders" className={css`
            display: flex;
            flex-direction: column;
            text-align: right;
          `}>
            <Slider label="font size" min={12} max={64} onChange={this.innerStateChange('fontSize')}/>
            <Slider label="width" min={0} max={100} onChange={this.innerStateChange('width')}/>
            <Slider label="height" min={0} max={100} onChange={this.innerStateChange('height')}/>
            <Slider label="opacity" min={0} max={1} onChange={this.innerStateChange('opacity')}/>
            <Slider label="top" min={0} max={100} onChange={this.innerStateChange('top')}/>
            <Slider label="left" min={0} max={100} onChange={this.innerStateChange('left')}/>
            <Slider label="keystoneX" min={-45} max={45} onChange={this.innerStateChange('rotateX')}/>
            <Slider label="keystoneY" min={-45} max={45} onChange={this.innerStateChange('rotateY')}/>
          </div>
          <span>Colour</span>
          <SketchPicker color={this.state.selectedElement.color}
                     width={"200px"}
                     onChange={(color) => this.innerStateChange('color')(color.hex)} />
          <span>Background</span>
          <HuePicker color={this.state.selectedElement.backgroundColor}
                     width={"200px"}
                     onChange={(color) => this.innerStateChange('backgroundColor')(color.hex)} />
          <h3>Elements</h3>
          {
            this.state.elements.map((veProps: VisualElementProps, index: number) => (
              <button key={index} onClick={() => this.setState({selectedElement: veProps})}>
                {veProps.name}
              </button>
            ))
          }
          <div id="adder">
            <input type="text" onChange={(event: ChangeEvent<HTMLInputElement>) =>
              this.setState({newElementName: event.target.value})
            } />
            <button
              disabled={this.state.newElementName.length<1}
              onClick={() => {
                const newVisualElementProps: VisualElementProps = {
                  name: this.state.newElementName,
                  width: 50,
                  height: 50,
                  top: 50,
                  left: 50,
                  opacity: 0.5,
                  rotateX: 0,
                  rotateY: 0,
                  color: "red",
                  backgroundColor: "hotpink"
                };
                this.state.elements.push(newVisualElementProps);
                this.setState({
                  selectedElement: newVisualElementProps,
                  newElementName: ""
                });
              }}>
              Add
            </button>
          </div>
        </div>
        <div id="display" className={css`
          background-image: url("/img/parliament.jpg");
          background-repeat: no-repeat;
          background-size: 100%;
          width: 100%;
          height: 100vh;
          position: relative;
          overflow: hidden;
        `}>
          {
            this.state.elements.map((veProps: VisualElementProps, index: number) => (
              <VisualElement key={index} {...veProps}/>
            ))
          }
        </div>
      </div>
    );
  }

  private innerStateChange = (key: string) => (value: any) => {
    Object.assign(this.state.selectedElement, {[key] : value});
    this.setState({selectedElement: this.state.selectedElement});
  }

}
