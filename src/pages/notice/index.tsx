import React from 'react'
import { Link } from 'react-router-dom'

export default class Notice extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return <div>
            <Link to='/notice'>notice Link</Link>
            <Link to='/renderprops'>renderprops Link</Link>
            这是notice组件
        </div>
    }
}
