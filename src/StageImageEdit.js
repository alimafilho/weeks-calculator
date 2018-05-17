import React, { Component} from 'react'

import { Stage, Layer, Rect, Text, TextPath, Image, Ellipse } from 'react-konva';
import Konva from 'konva';

import './StageImageEdit.css'

// VERY IMPORTANT NOTES
// at first we will set image state to null
// and then we will set it to native image instanse
// only when image is loaded
class AdocaoBrasilLogoImage extends React.Component {
  state = {
    image: null
  };
  componentDidMount() {
    const image = new window.Image();
    // image.src = "http://konvajs.github.io/assets/yoda.jpg";
    image.src = "adacao_brasil.png";
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState({
        image: image
      });
    };
  }

  render() {
    return <Image
      image={this.state.image} 
      draggable={false}

      width={220}
      height={220}
			x={40}
      y={15}
      />;
  }
}
class AdocaoBrasilLogoImageShare extends React.Component {
  state = {
    image: null
  };
  componentDidMount() {
    const image = new window.Image();
    // image.src = "http://konvajs.github.io/assets/yoda.jpg";
    image.src = "adacao_brasil-share.png";
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState({
        image: image
      });
    };
  }

  render() {
    return <Image
      image={this.state.image} 
      draggable={false}
			x={5}
      y={280}
      />;
  }
}

class StageImageEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataURL: null,
      fillText: '#3498db',
      fillBackground: '#3498db',
      listColorsBackground: ['#3498db', '#fab1a0', '#b8e994', '#f368e0', '#feca57',
        '#5f27cd', '#27ae60', '#8e44ad', '#f39c12', '#e74c3c']
    }
  }

  handleExportClick = () => {
    const dURL = this.stageRef.getStage().toDataURL({mimeType:'image/jpeg', quality: 1, pixelRatio: 2})
    if (this.state.dataURL !== dURL) {
      this.setState({dataURL: dURL})
    }
  }

  setColorBackgrund (color) {
    if (this.state.fillBackground !== color) {
      this.setState({fillBackground: color, fillText: color})
    }
  }

  render () {

    if (!this.props.isOpen) {
      return (null)
    }

    const textWeeks = (this.props.totalWeeks > 1) ? 'Semanas de gestação' : 'Semana de gestação'
    return(
      <div>
        <div class="canvas-preview">
          <Stage ref={node => { this.stageRef = node}} width={300} height={300} fill="#fff">
            <Layer>
              <Rect
                width={300}
                height={300}
                radius= {70}
                fill= "#fff"
                cornerRadius= {0}
              />
              <Ellipse 
                x= {300 / 2}
                y= {300 / 2}
                width={290}
                height={290}
                radius= {70}
                stroke= {this.state.fillBackground}
                fill='#fff'
                strokeWidth={2}
              />

              <Ellipse 
                x= {300 / 2}
                y= {300 / 2}
                width={286}
                height={286}
                radius= {70}
                fill= {this.state.fillBackground}
              />
              <Ellipse 
                x= {300 / 2}
                y= {300 / 2}
                width={276}
                height={276}
                radius= {70}
                stroke='#fff'
                strokeWidth={2}
                dash={[5,5]}
                strokeDasharray="10,10"
                />
              <AdocaoBrasilLogoImage />
              <Text 
                text={this.props.totalWeeks}
                x={0}
                y={135}
                width={300}
                height={60}
                fill={this.state.fillText}
                fontFamily="Courgette, Pacifico, cursive"
                fontSize={60}
                align= 'center'
                stroke= '#fff'
                strokeWidth= '1px'
              />
              <TextPath 
                text={textWeeks}
                x={30}
                y={180}
                width={300}
                height={50}
                fill='#fff'
                fontFamily="Courgette, Pacifico, cursive"
                fontSize={26}
                align= 'center'
                data= 'M3.989,0c19.666,61.106,71.409,89.93,120.848,87.497 C173.3,85.112,219.512,52.6,234.901,0'
              />
              <AdocaoBrasilLogoImageShare />
            </Layer>
          </Stage>
        </div>
        
        <div class="stage-edit-container">
          <div class="stage-edit-header">
            <svg class="stage-icon" height="48" viewBox="0 0 48 48" width="48" ><path d="M0 0h48v48h-48z" fill="none"/><path fill="#464646" d="M33.12 17.88l-17.88-17.88-2.83 2.83 4.76 4.76-10.29 10.29c-1.17 1.17-1.17 3.07 0 4.24l11 11c.58.59 1.35.88 2.12.88s1.54-.29 2.12-.88l11-11c1.17-1.17 1.17-3.07 0-4.24zm-22.71 2.12l9.59-9.58 9.59 9.58h-19.18zm27.59 3s-4 4.33-4 7c0 2.21 1.79 4 4 4s4-1.79 4-4c0-2.67-4-7-4-7z"/><path fill="#464646" d="M0 40h48v8h-48z" fillOpacity=".70"/></svg>
            <h5 class="stage-legend">Escolha uma cor para o fundo</h5>
          </div>
          <ul class="list-items">
          {
            this.state.listColorsBackground.map((color, index) => {
              const classNameActive = (this.state.fillBackground === color) ? 'active' : ''
              return(
                <li key={index}>
                  <div class={classNameActive} onClick={() => {this.setColorBackgrund(color)}} style={{position: 'relative', backgroundColor: color}} data-color={color}></div>
                </li>
              )
            })
          }
          </ul>
          {(this.state.dataURL) && (
            <div class="button-download-container">
              <a class="button-download" href={this.state.dataURL} download="stage.jpg">
                <svg height="19px" viewBox="0 0 14 19" width="14px"><g fill="none"  id="Page-1" stroke="none" style={{strokeWidth: "1", fillRule: "evenodd"}}><g fill="#fff" id="Core" transform="translate(-383.000000, -213.000000)"><g id="file-download" transform="translate(383.000000, 213.500000)"><path fill="#fff" d="M14,6 L10,6 L10,0 L4,0 L4,6 L0,6 L7,13 L14,6 L14,6 Z M0,15 L0,17 L14,17 L14,15 L0,15 L0,15 Z" id="Shape"/></g></g></g></svg>
                <span>Baixar imagem</span>
              </a>
            </div>
          )}
        </div>

        <div style={{display: 'none'}}>
          {setTimeout(() => {this.handleExportClick()}, 500)}
        </div>
      </div>
    )
  }
}

export default StageImageEdit