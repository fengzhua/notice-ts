import React from 'react'
import { Input, Divider, Icon, Button } from 'antd';
import styles from './index.module.scss'

import { IItemData } from '../interfaces'

export interface ISideItemsProps {
    dataAll: any
    updateContainerState: (newDataAll: any) => void
    activityKey: number | string
}

interface ISideItemsStates {
    isShowInput: boolean
}

export default class SideItems extends React.Component<ISideItemsProps, ISideItemsStates>{
    constructor(props) {
        super(props)
        this.state = {
            isShowInput: false
        }
    }

    componentDidMount(): void {
        document.onclick = () => {
            this.setState({isShowInput: false})
        }
    }

    onItemClick = (item, index, e) => {
        e.nativeEvent.stopImmediatePropagation();
        const {activityKey} = this.props
        if(index === activityKey){
            return
        }
        this.props.updateContainerState({activityKey: index})
    }

    onItemDoubleClick(item, index){
        this.setState({isShowInput: true})
    }

    onItemInputChange = (item, index, e:React.ChangeEvent<HTMLInputElement>) => {
        let {dataAll} = this.props
        dataAll[index].text = e.target.value
        this.props.updateContainerState({dataAll: dataAll})
    }

    renderCurrentItem = (item, index) => {
        const { isShowInput } = this.state
        const {activityKey} = this.props
        if(activityKey === index){
            if(isShowInput){
                return <Input defaultValue={item.text} onClick={(e) => {
                    this.onItemClick(item, index, e)
                }
                } onChange={(e) => {this.onItemInputChange(item, index, e)}}/>
            }else {
                return <div>
                    <span className={styles.blueBGC}
                          onClick={(e) => {this.onItemClick(item, index, e)}}
                          onDoubleClick={this.onItemDoubleClick.bind(this, item, index)}
                    >{item.text}</span>
                </div>
            }
        }else {
            return <div>
                {/*<Button className={styles.deleteButton} size="small" onClick={() => {}}>del</Button>*/}
                <span className={styles.normal}
                      onClick={(e) => {this.onItemClick(item, index, e)}}
                      onDoubleClick={this.onItemDoubleClick.bind(this, item, index)}
                >{item.text}</span>
            </div>
        }
    }

    renderAllFirstItem = () => {
        const { dataAll, activityKey } = this.props
        if(activityKey === 'all'){
            return <div className={styles.itemWrapper + ' ' + styles.blueBGC} onClick={(e) => {
                this.onItemClick({}, 'all', e)
            }}>
                <span>所有计划</span>
            </div>
        }else {
            return <div className={styles.itemWrapper} onClick={(e) => {
                this.onItemClick({}, 'all', e)
            }}>
                <span>所有计划</span>
            </div>
        }

    }

    render() {
        const { dataAll } = this.props
        return <>
            {this.renderAllFirstItem()}
            <Divider/>
            {dataAll.map((item, index) => {
                return <div className={styles.itemWrapper} key={index}>
                    {this.renderCurrentItem(item, index)}
                </div>
            })}
        </>
    }
}
