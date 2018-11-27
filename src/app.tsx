import { encode } from "base-64";
import {css} from "emotion";
import * as React from 'react';
import {ChangeEvent} from 'react';
import CompactPicker from "react-color/lib/components/compact/Compact";
import SketchPicker from "react-color/lib/components/sketch/Sketch";
import {Slider} from "./components/slider";
import {VisualElement, VisualElementProps} from "./components/visualElement";


export interface AppState {
  title: string;
  backgroundURL: string;
  perspective: number;
  elements: VisualElementProps[];
  selectedElement?: VisualElementProps;
  newElementName: string;
  showSidebar: boolean;
}

const defaultBackgroundColour = {r: 255, g: 255, b: 255, a: 0.75};

const backgroundElement: VisualElementProps = {
  name: "background",
  width: 50,
  height: 50,
  top: 5,
  left: 5,
  rotateX: 0,
  rotateY: 0,
  opacity: 0.5,
  color: "red",
  backgroundColor: defaultBackgroundColour,
  fontSize: 24
};

export class App extends React.Component<{},AppState> {

  public state = {
    title: "",
    backgroundURL: "/img/parliament.jpg",
    perspective: 1000,
    showSidebar: true,
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
          background: lightgray;
          right: 0;
          top: 0;
          z-index: 99999;
          display: flex;
          flex-direction: column;
          padding: 5px;
          width: ${this.state.showSidebar ? "350px" : "0"};
        `}>
          <div className={css`
            position: absolute;
            left: -38px;
            text-align: center;
            width: 38px;
            padding: 10px 0;
            background: gray;
            cursor: pointer;
          `} onClick={() => this.setState({showSidebar: !this.state.showSidebar})}>
            {this.state.showSidebar ? ">" : "<"}
          </div>
          <input
            className={css`font-size: 150%;`}
            placeholder="Enter title..."
            type="text"
            value={this.state.title}
            onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState({title: event.target.value})}
          />
          <h3>Save/Load</h3>
          <a
            href={
              "data:application/octet-stream;charset=utf-16le;base64," +
              encode(JSON.stringify(this.state, null, "  "))
            }
            download={`${this.state.title}.stats`}
          >
            Download
          </a>
          <input
            type="file"
            accept=".stats"
          />
          <h3>Globals</h3>
          <span>background image</span>
          <input
            type="text"
            onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState({backgroundURL: event.target.value})}
            defaultValue={"/img/parliament.jpg"}
          />
          <Slider label="perspective" min={0} max={2000} value={this.state.perspective}
                  onChange={(val:number) => this.setState({perspective: val})}/>
          <h3>Elements</h3>
          {
            this.state.elements.map((veProps: VisualElementProps, index: number) => (
              <button key={index}
                      className={css`
                        border: red 2px ${veProps===this.state.selectedElement ? "dashed" : "none"};
                      `}
                      onClick={this.elementSelector(veProps)}>
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
                  fontSize: 24,
                  name: this.state.newElementName,
                  width: 50,
                  height: 50,
                  top: 50,
                  left: 50,
                  opacity: 0.5,
                  rotateX: 0,
                  rotateY: 0,
                  color: "red",
                  backgroundColor: defaultBackgroundColour
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
          {this.state.selectedElement ? (
            <>
              <h3>PROPS: {this.state.selectedElement.name}</h3>
              <div id="sliders" className={css`
            display: flex;
            flex-direction: column;
            text-align: right;
          `}>
                <Slider label="font size" min={12} max={64} {...this.mappedProps('fontSize')}/>
                <Slider label="width" min={0} max={100} {...this.mappedProps('width')}/>
                <Slider label="height" min={0} max={100} {...this.mappedProps('height')}/>
                <Slider label="opacity" min={0} max={1} {...this.mappedProps('opacity')}/>
                <Slider label="top" min={0} max={100} {...this.mappedProps('top')}/>
                <Slider label="left" min={0} max={100} {...this.mappedProps('left')}/>
                <Slider label="keystoneX" min={-45} max={45} {...this.mappedProps('rotateX')}/>
                <Slider label="keystoneY" min={-45} max={45} {...this.mappedProps('rotateY')}/>
                <div className={css`
                  text-align: left;
                `}>
                  <p>
                    Colour
                  <CompactPicker color={this.state.selectedElement.color}
                                 onChange={(color) => this.mappedProps('color').onChange(color.hex)} />
                  </p>
                  <p>Background
                  <SketchPicker color={this.state.selectedElement.backgroundColor}
                                onChange={(color) => this.mappedProps('backgroundColor').onChange(color.rgb)} />
                  </p>
                </div>
              </div>
            </>
          ) : undefined }
        </div>
        <div id="display" className={css`
          background-image: url(${this.state.backgroundURL});
          background-repeat: no-repeat;
          background-size: 100%;
          width: 100%;
          height: 100vh;
          position: relative;
          overflow: hidden;
          perspective: ${this.state.perspective}px
        `}>
          {
            this.state.elements.map((veProps: VisualElementProps, index: number) => (
              <VisualElement
                key={index}
                selected={veProps===this.state.selectedElement}
                onClick={this.elementSelector(veProps)}
                {...veProps}
              />
            ))
          }
        </div>
      </div>
    );
  }

  private mappedProps = (key: string) => ({
    onChange : (value: any) => {
      Object.assign(this.state.selectedElement, {[key] : value});
      this.setState({selectedElement: this.state.selectedElement});
    },
    value: this.state.selectedElement[key]
  });

  private elementSelector = (veProps: VisualElementProps) => () =>
    this.setState({selectedElement: this.state.selectedElement===veProps ? undefined : veProps})

}
