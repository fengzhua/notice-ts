import React from 'react'
import './index.scss'
import ReactDOM from 'react-dom'

export default class Modal extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount() {
        let div = document.createElement('div')
        document.body.appendChild(div)
        let modalItem = <div className="modal-wrapper">
            <div className="modal">
                <div className="modal-title">这是modal标题</div>
                <div className="modal-content">这是modal内容</div>
                <div className="modal-operator">
                    <button className="modal-operator-close">取消</button>
                    <button className="modal-operator-confirm">确认</button>
                </div>
            </div>
            <div className="mask"/>
        </div>
        ReactDOM.render(modalItem,div)
    }

    render() {
        return null
    }
}
