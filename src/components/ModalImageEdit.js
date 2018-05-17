import React, { Component} from 'react'
import StageImageEdit from '../StageImageEdit'
import Modal from 'react-modal'

const customStyles = {
  overlay: {
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: '360px',
    height: '100%',
    maxHeight: '640px',
    padding: '10px',
    border: '0',
    borderRadius: '0',
    backgroundColor: '#fff'
  }
}
Modal.setAppElement('#root')

class ModalImageEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      totalWeeks: '',
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentWillMount () {
    this.setState({
      totalWeeks: this.props.totalWeeks,
      // isOpen: this.props.isOpen
    })
  }

  componentWillReceiveProps (nextProps, nextState) {
    console.log(' nextProps, nextState', this.props, nextProps, nextState)
    if (this.state.modalIsOpen !== nextProps.modalIsOpen) {
      console.log(' nextProps, nextState', this.props, nextProps, nextState)
      this.setState({
        totalWeeks: nextProps.totalWeeks,
        modalIsOpen: nextProps.modalIsOpen
      })
    }
  }

  // methods
  // Modal
  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});

    this.props.closeModal()
  }

  render () {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="AB Modal"
      >
        <button class="button-back" onClick={this.closeModal}>
          <svg id="Layer_1" style={{enableBackground: "new 0 0 48 48"}} version="1.1" viewBox="0 0 48 48"><g><polygon points="30.8,45.7 9.1,24 30.8,2.3 32.2,3.7 11.9,24 32.2,44.3  "/></g></svg>
        </button>
        <div>
          <StageImageEdit totalWeeks={this.state.totalWeeks} isOpen={this.state.modalIsOpen} />
        </div>
      </Modal>
    )
  }
}

export default ModalImageEdit