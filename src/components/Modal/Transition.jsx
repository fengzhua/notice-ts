import React from 'react';

import classnames from 'classnames';

export default class Transition extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            visible: false,
            classes: null,
        }
    }

    componentWillReceiveProps(props) {
        const { transitionName, animate, visible } = props
        if (!animate) {
            this.setState({ visible })
            return
        }
        if (!props.visible) {
            this.leaveAnimate(props, transitionName)
        } else {
            this.enterAnimate(props, transitionName)
        }
    }

    // 入场动画
    enterAnimate(props, transitionName) {
        const { visible, enterTimeout, enterActiveTimeout, enterEndTimeout } = props
        const { initClasses, activeClasses, endClasses } = this.getClasses('enter', transitionName)
        this.setState({ visible, classes: initClasses })
        const enterTimer = setTimeout(_ => {
            this.setState({ classes: activeClasses })
            clearTimeout(enterTimer)
        }, enterTimeout)
        const enterActiveTimer = setTimeout(_ => {
            this.setState({ classes: endClasses })
            clearTimeout(enterActiveTimer)
        }, enterActiveTimeout + enterTimeout)
        const enterEndTimer = setTimeout(_ => {
            this.setState({ classes: '' })
            clearTimeout(enterEndTimer)
        }, enterEndTimeout + enterActiveTimeout + enterTimeout)
    }

    // 出场动画
    leaveAnimate(props, transitionName) {
        const { visible, leaveTimeout, leaveActiveTimeout, leaveEndTimeout } = props
        const { initClasses, activeClasses, endClasses } = this.getClasses('leave', transitionName)
        this.setState({ classes: initClasses })
        const leaveTimer = setTimeout(_ => {
            this.setState({ classes: activeClasses })
            clearTimeout(leaveTimer)
        }, leaveTimeout)
        const leaveActiveTimer = setTimeout(_ => {
            this.setState({ classes: endClasses })
            clearTimeout(leaveActiveTimer)
        }, leaveActiveTimeout + leaveTimeout)
        const leaveEndTimer = setTimeout(_ => {
            this.setState({ visible, classes: '' })
            clearTimeout(leaveEndTimer)
        }, leaveEndTimeout + leaveActiveTimeout + leaveTimeout)
    }

    // 类名统一配置
    getClasses(type, transitionName) {
        const initClasses = classnames({
            [`${transitionName}-appear`]: type === 'appear',
            [`${transitionName}-enter`]: type === 'enter',
            [`${transitionName}-leave`]: type === 'leave',
        })
        const activeClasses = classnames({
            [`${transitionName}-appear-active`]: type === 'appear',
            [`${transitionName}-enter-active`]: type === 'enter',
            [`${transitionName}-leave-active`]: type === 'leave',
        })
        const endClasses = classnames({
            [`${transitionName}-appear-end`]: type === 'appear',
            [`${transitionName}-enter-end`]: type === 'enter',
            [`${transitionName}-leave-end`]: type === 'leave',
        })
        return { initClasses, activeClasses, endClasses }
    }

    cloneChildren() {
        const { classes } = this.state
        const children = this.props.children
        const className = children.props.className

        return React.cloneElement(
                children,
                { className: `${className} ${classes}` }
        )
    }

    render() {

        const { visible } = this.state
        return visible && <div>
            {this.cloneChildren()}
            <div className="mask"/>
        </div>
    }
}
