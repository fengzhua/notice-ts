import React from 'react'
import styles from './index.module.scss'
import {getStyle} from '../../utils'

import Side from '../Side'
import Main from '../Main'

const MAX_HEIGHT = 600
const MIN_HEIGHT = 300

interface IContainerState {
    containerHeight: number
    isShowInput: boolean
    dataAll: any
    activityKey: number | string
}

interface IPosition {
    clientY: number
    startHeight: number
}

export default class Container extends React.Component<any, IContainerState> {
    constructor(props) {
        super(props)
        this.state = {
            containerHeight: 550, // 默认高度550px
            isShowInput: false, //是否双击显示那个输入框
            activityKey: 0,
            dataAll: [
                {
                    text: '哈哈哈1', tasks: [
                        {name: '扫地', startTime: 234234, endTime: 234234, isDone: false},
                        {name: '做饭', startTime: 234234, endTime: 234234, isDone: true}
                    ]
                },
                {text: '哈哈哈2', tasks: []}, {text: '哈哈哈3', tasks: []}] //所有的数据
        }
        this.startPosition = {
            clientY: 0,
            startHeight: 0
        }
        this.containerRef = null
        this.rootContainer = null
    }

    startPosition: IPosition
    containerRef: HTMLDivElement | null
    rootContainer: HTMLElement | null //

    componentDidMount() {
        this.rootContainer = document.getElementById('root')
    }

    documentMoveCallBack = (e: MouseEvent) => {
        let offsetY: number = e.clientY - this.startPosition.clientY
        const targetY = this.startPosition.startHeight + offsetY
        if (targetY >= MAX_HEIGHT) {
            (this.rootContainer as HTMLElement).style.cursor = 'n-resize'
        } else if (targetY <= MIN_HEIGHT) {
            (this.rootContainer as HTMLElement).style.cursor = 's-resize'
        } else {
            (this.rootContainer as HTMLElement).style.cursor = 'ns-resize'
        }
        this.setState({containerHeight: targetY})
    }

    documentUpCallBack = () => {
        (this.rootContainer as HTMLElement).style.cursor = ''
        let containerRefStyles = getStyle(this.containerRef as HTMLDivElement)
        if (parseFloat(containerRefStyles.height) >= MAX_HEIGHT) {
            this.setState({containerHeight: MAX_HEIGHT})
        } else if (parseFloat(containerRefStyles.height) <= MIN_HEIGHT) {
            this.setState({containerHeight: MIN_HEIGHT})
        }

        document.removeEventListener('mousemove', this.documentMoveCallBack)
        document.removeEventListener('mouseup', this.documentUpCallBack)
    }

    onMouseDown = (e: React.MouseEvent) => {
        let {clientY} = e
        this.startPosition.clientY = clientY
        this.startPosition.startHeight = this.state.containerHeight
        document.addEventListener('mousemove', this.documentMoveCallBack)
        document.addEventListener('mouseup', this.documentUpCallBack)
    }

    onMouseUp = () => {
        document.removeEventListener('mousemove', this.documentMoveCallBack)
    }

    updateContainerState = (newDataAll) => {
        const state  = this.state
        this.setState(Object.assign({},state, newDataAll))
    }

    render() {
        const {containerHeight, dataAll, activityKey} = this.state
        return <div ref={(divRef: HTMLDivElement) => {
            this.containerRef = divRef
        }} className={styles.container} style={{height: containerHeight}}>
            <div className={styles.top}>
                <Side dataAll={dataAll} activityKey={activityKey} updateContainerState={this.updateContainerState}/>
                <Main/>
            </div>
            <div className={styles.drag} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}/>
        </div>
    }
}
