import React from 'react'
import styles from './index.module.scss'
import {getStyle} from "../../utils";
import { Input } from 'antd';
import SideItems from '../SideItems'
import 'antd/dist/antd.css';
import {IItemData} from '../interfaces'

const { Search } = Input;

const MAX_WIDTH = 300
const MIN_WIDTH = 150

interface IPosition {
    clientX: number
    startWith: number
}

interface ISideState {
    containerWidth: number
}

interface ISideProps {
    dataAll: any
    updateContainerState: (newDataAll: any) => void
    activityKey: number | string
}

export default class Side extends React.Component<ISideProps, ISideState>{
    constructor(props){
        super(props)
        this.state = {
            containerWidth: 200, // 默认高度550px
        }
        this.startPosition = {
            clientX: 0,
            startWith: 0
        }
        this.containerRef =null
        this.rootContainer = null
    }

    startPosition: IPosition
    containerRef: HTMLDivElement | null
    rootContainer: HTMLElement | null //

    componentDidMount() {
        this.rootContainer = document.getElementById('root')
    }

    documentMoveCallBack = (e: MouseEvent) => {
        let offsetX: number = e.clientX - this.startPosition.clientX
        const targetX = this.startPosition.startWith + offsetX
        if (targetX >= MAX_WIDTH) {
            (this.rootContainer as HTMLElement).style.cursor = 'w-resize'
        }else if(targetX <= MIN_WIDTH){
            (this.rootContainer as HTMLElement).style.cursor = 'e-resize'
        }else {
            (this.rootContainer as HTMLElement).style.cursor = 'ew-resize'
        }
        this.setState({containerWidth: targetX})
    }

    documentUpCallBack = () => {
        (this.rootContainer as HTMLElement).style.cursor = ''
        let containerRefStyles = getStyle(this.containerRef as HTMLDivElement)
        if(parseFloat(containerRefStyles.width) >= MAX_WIDTH){
            this.setState({containerWidth: MAX_WIDTH})
        }else if(parseFloat(containerRefStyles.width) <= MIN_WIDTH){
            this.setState({containerWidth: MIN_WIDTH})
        }

        document.removeEventListener('mousemove', this.documentMoveCallBack)
        document.removeEventListener('mouseup', this.documentUpCallBack)
    }

    onMouseDown = (e: React.MouseEvent) => {
        let {clientX} = e
        this.startPosition.clientX = clientX
        this.startPosition.startWith = this.state.containerWidth
        document.addEventListener('mousemove', this.documentMoveCallBack)
        document.addEventListener('mouseup', this.documentUpCallBack)
    }

    onMouseUp = () => {
        document.removeEventListener('mousemove', this.documentMoveCallBack)
    }

    render(){
        const {dataAll, activityKey, updateContainerState} = this.props
        return <div className={styles.sideContainer} ref={(divRef: HTMLDivElement) => {
            this.containerRef = divRef
        }} style={{width: this.state.containerWidth}}>
            <div className={styles.inner}>
                <Search placeholder="搜索" onSearch={value => console.log(value)} enterButton />
                <SideItems updateContainerState={updateContainerState}
                           dataAll={dataAll} activityKey={activityKey} />
            </div>
            <div className={styles.dragDiv} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}/>
        </div>
    }
}
