import React from 'react'
import './index.scss'
import NewPortal from './NewPortal'
import Transition from './Transition'

export default class Modal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            classes: 'none'
        }
    }

    onOk = () => {
        const {onOk} = this.props
        onOk()
    }

    onClose = () => {
        const {onClose} = this.props
        onClose()
    }

    render() {
        const {visible, title, children} = this.props
        return <NewPortal>
            <Transition
                    visible={visible}
                    transitionName="modal"
                    enterTimeout={0}
                    enterActiveTimeout={200}
                    enterEndTimeout={100}
                    leaveTimeout={0}
                    leaveActiveTimeout={100}
                    leaveEndTimeout={200}
                    animate={true}
            >
                <div className={"modal"}>
                    <div className="modal-title">{title}</div>
                    <div className="modal-content">{children}</div>
                    <div className="modal-operator">
                        <button className="modal-operator-close" onClick={this.onClose}>取消</button>
                        <button className="modal-operator-confirm" onClick={this.onOk}>确认</button>
                    </div>
                </div>
            </Transition>
        </NewPortal>
    }
}
