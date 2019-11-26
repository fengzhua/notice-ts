import React from 'react'
import styles from './index.module.scss'

import Side from '../Side'
import Main from '../Main'

export default class Container extends React.Component<any, {}>{
    // constructor(props){
    //     super(props)
    // }

    render() {
        return <div className={styles.container}>
            <Side/>
            <Main/>
        </div>
    }
}
