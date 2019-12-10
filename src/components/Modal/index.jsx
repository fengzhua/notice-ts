import React from 'react'
import './index.scss'
import ReactDOM from 'react-dom'

export default class Modal extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount() {
        // let div = document.createElement('div')
        // document.body.appendChild(div)
        // let modalItem =
        // ReactDOM.render(modalItem,div)
    }

    onOk = () => {
        const {onOk} = this.props
        onOk()
    }

    render() {
        const {visible, title, children} = this.props
        return (visible && <div className="modal-wrapper">
            <div className="modal">
                <div className="modal-title">{title}</div>
                <div className="modal-content">{children}</div>
                <div className="modal-operator">
                    <button className="modal-operator-close" onClick={this.props.onClose}>取消</button>
                    <button className="modal-operator-confirm" onClick={this.onOk}>确认</button>
                </div>
            </div>
            <div className="mask"/>
        </div>)
    }
}
