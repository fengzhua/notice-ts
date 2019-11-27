import React from 'react'
import styles from './index.module.scss'

export default class Side extends React.Component{
    // constructor(props){
    //     super(props)
    // }
    render(){
        return <div className={styles.sideContainer}>
            <div className={styles.dragDiv}/>
        </div>
    }
}
