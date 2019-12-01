import React from 'react'
import { Input } from 'antd';
import styles from './index.module.scss'

import { IItemData } from '../interfaces'

export interface ISideItemsProps {
    onItemChange: (id: string, index: number, e:React.ChangeEvent<HTMLInputElement>)=>void
    items: IItemData[]
}

interface ISideItemsStates {
    isShowInput: boolean
    activeKey: number
}

export default class SideItems extends React.Component<ISideItemsProps, ISideItemsStates>{
    constructor(props) {
        super(props)
        this.state = {
            isShowInput: false,
            activeKey: 0
        }
    }

    componentDidMount(): void {
        document.onclick = () => {
            this.setState({isShowInput: false})
        }
    }

    onItemClick = (item, index, e) => {
        e.nativeEvent.stopImmediatePropagation();
        if(index === this.state.activeKey){
            return
        }
        this.setState({isShowInput: false, activeKey: index})
    }

    onItemDoubleClick(item, index){
        this.setState({isShowInput: true})
    }

    onItemInputChange = (item, index, e:React.ChangeEvent<HTMLInputElement>) => {
        this.props.onItemChange(item, index, e)
    }

    renderCurrentItem = (item, index) => {
        const { isShowInput, activeKey } = this.state
        if(activeKey === index){
            if(isShowInput){
                return <Input onChange={(e) => {
                    this.onItemInputChange(item, index, e)
                }} placeholder="Basic usage" defaultValue={item.text}/>
            }else {
                return <span className={styles.blueBGC}>{item.text}</span>
            }
        }else {
            return <span className={styles.normal}>{item.text}</span>
        }
    }

    render() {
        const { items } = this.props
        return <>
            {items.map((item, index) => {
                return <div onClick={(e) => {
                    this.onItemClick(item, index, e)
                }}
                onDoubleClick={this.onItemDoubleClick.bind(this, item, index)} key={index}>
                    {this.renderCurrentItem(item, index)}
            </div>
            })}
        </>
    }
}
