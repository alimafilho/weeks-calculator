import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ModalImageEdit from './components/ModalImageEdit'


import DatePicker from 'react-mobile-datepicker'

const monthMap = {
	'01': 'Jan',
	'02': 'Fev',
	'03': 'Mar',
	'04': 'Abr',
	'05': 'Mai',
	'06': 'Jun',
	'07': 'Jul',
	'08': 'Ago',
	'09': 'Set',
	'10': 'Out',
	'11': 'Nov',
	'12': 'Dez',
}

class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
      modalIsOpen: false,
      valueDateProcesso: '11/11/1989',
      valueDateLigacao: '11/11/1999',
      totalWeeks: null,
      dataURL: null,
      
      timeProcess: 'DATA PROCESSO',
      isOpenTimeProcess: false,
      
      timeLigacao: 'DATA LIGAÇÃO ou DIA DE HOJE',
		  isOpenTimeLigacao: false,
		}

    this.handleDateProcess = this.handleDateProcess.bind(this)
    this.handleDataLigacao = this.handleDataLigacao.bind(this)
    this.calculateWeek = this.calculateWeek.bind(this)

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
	}
  componentDidMount() {
    // log stage react wrapper
    // console.log(this.stageRef.stage);
    // // log Konva.Stage instance
    // console.log(this.stageRef.stage.getStage());
    // console.log(this.stageRef.stage.getStage().content);
  }

  handleExportClick = () => {
    console.log(this.stageRef.getStage().toDataURL());
    this.setState({dataURL: this.stageRef.getStage().toDataURL()})
  }

  dateFormatter (value) {
    let v = value
    if (v.match(/^\d{2}$/) !== null) {
      v = v + '/'
    } else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
      v = v + '/'
    }
    return v.substring(0, 10)
  }
	handleDateProcess (event) {
    let v = this.dateFormatter(event.target.value)
		this.setState({
      valueDateProcesso: v
    })
  }
  
  handleDataLigacao (event) {
    let v = this.dateFormatter(event.target.value)
		this.setState({
      valueDateLigacao: v
    })
  }

  // datepicker
  handleClick = () => {
		this.setState({ isOpenTimeProcess: true });
	}

	handleCancel = () => {
		this.setState({ isOpenTimeProcess: false });
	}

	handleSelect = (timeProcess) => {
    const totalWeeks = this.calculateWeek(timeProcess, this.state.timeLigacao)
		this.setState({ timeProcess, isOpenTimeProcess: false, totalWeeks: totalWeeks });
  }
  
  // Ligacao
  handleClickLigacao = () => {
		this.setState({ isOpenTimeLigacao: true });
	}

	handleCancelLigacao = () => {
		this.setState({ isOpenTimeLigacao: false });
	}

	handleSelectLigacao = (timeLigacao) => {
    const totalWeeks = this.calculateWeek(this.state.timeProcess, timeLigacao)
		this.setState({ timeLigacao, isOpenTimeLigacao: false, totalWeeks: totalWeeks });
	}


  /////////////////////
  // calculateWeek () {
  //   const  arrDateValueEnd = this.state.valueDateLigacao.split('/')
  //   const DateInit = new Date(arrDateValueEnd[1] + '/' + arrDateValueEnd[0] + '/' + arrDateValueEnd[2])

  //   const arrDateValueInit = this.state.valueDateProcesso.split('/')
  //   const DateEnd = new Date(arrDateValueInit[1] + '/' + arrDateValueInit[0] + '/' + arrDateValueInit[2])

  //   const perWeek = 24 * 60 * 60 * 1000 * 7
  //   const totalWeeks = Math.round((DateInit.valueOf() - DateEnd.valueOf())/ perWeek) + 1

  //   this.setState({
  //     totalWeeks: totalWeeks
  //   })
  // }
  calculateWeek (_timeProcess, _timeLigacao) {
    if (this.isDate(_timeProcess) && this.isDate(_timeLigacao)) {
      const  arrDateValueEnd = this.convertDate(_timeLigacao, 'DD/MM/YYYY').split('/')
      const DateInit = new Date(arrDateValueEnd[1] + '/' + arrDateValueEnd[0] + '/' + arrDateValueEnd[2])

      const arrDateValueInit = this.convertDate(_timeProcess, 'DD/MM/YYYY').split('/')
      const DateEnd = new Date(arrDateValueInit[1] + '/' + arrDateValueInit[0] + '/' + arrDateValueInit[2])

      const perWeek = 24 * 60 * 60 * 1000 * 7
      const totalWeeks = Math.round((DateInit.valueOf() - DateEnd.valueOf())/ perWeek) + 1

      return totalWeeks
    } else {
      return null
    }
    
  }

  

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  convertDate(date, formate) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return formate
         .replace(/Y+/, year)
         .replace(/M+/, month)
         .replace(/D+/, day)
         .replace(/h+/, hour)
         .replace(/m+/, minute)
         .replace(/s+/, second);
  }

  isDate (date) {
    return date instanceof Date
  }

  render() {
    const timeProcessValue = this.isDate(this.state.timeProcess) ? this.state.timeProcess : new Date()
    const timeLigacaoValue = this.isDate(this.state.timeLigacao) ? this.state.timeLigacao : new Date()
    return (
    <div>
      <div class='bold-line'></div>
      <div class='container'>
        <div class='window'>
          <div class='overlay'></div>
          <div class='content'>
            <div class='welcome'><img src="AdocaoBrasil_Logo.png" /><h1>SEMANAS</h1></div>
            <div class='subtitle'>Informe o dia que entrou no processo e o dia em que recebeu a tão esperada ligação</div>
            <div class='input-fields'>
              <div class='input-line full-width' onClick={this.handleClick}>
                {this.isDate(this.state.timeProcess) ? this.convertDate(this.state.timeProcess, 'DD/MM/YYYY') : <span class="placeholder-text">{this.state.timeProcess}</span>}
              </div>

              <div class='input-line full-width' onClick={this.handleClickLigacao}>
                {this.isDate(this.state.timeLigacao) ? this.convertDate(this.state.timeLigacao, 'DD/MM/YYYY') : <span class="placeholder-text">{this.state.timeLigacao}</span>}
              </div>
             </div>
            <div class='spacing'>
              Semanas de gestação 
              <span class='highlight'>
                <div class="highlightAB">{(this.state.totalWeeks) && (this.state.totalWeeks)}</div>
              </span>
            </div>
            <div class="group-button">
              <button class="ghost-round full-width" onClick={() => {
                if (this.state.totalWeeks) {
                  this.openModal()
                }
              }}>Visualizar imagem</button>
            </div>

            <DatePicker
              value={timeProcessValue}
              isOpen={this.state.isOpenTimeProcess}
              onSelect={this.handleSelect}
              onCancel={this.handleCancel}
              confirmText="Selecionar"
              cancelText="Cancelar"
              showFormat='DD/MM/YYYY'

              dateFormat = {['DD', ['MM', (month) => monthMap[month]],'YYYY']}

              theme='ios'
              />

              <DatePicker
              value={timeLigacaoValue}
              isOpen={this.state.isOpenTimeLigacao}
              onSelect={this.handleSelectLigacao}
              onCancel={this.handleCancelLigacao}
              confirmText="Selecionar"
              cancelText="Cancelar"
              showFormat='DD/MM/YYYY'

              dateFormat = {['DD', ['MM', (month) => monthMap[month]],'YYYY']}
              min={timeProcessValue}
              />
            <div class='subtitle'>@2018 - <a href="https://www.adocaobrasil.com.br" target="_blank">Adoção Brasil</a>. Todos os direitos reservados.</div>
          </div>
        </div>
      </div>
      <ModalImageEdit totalWeeks={this.state.totalWeeks} modalIsOpen={this.state.modalIsOpen} closeModal={this.closeModal}/>
    </div>
    );
  }
}

export default App;
