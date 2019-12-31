import React from 'react'
import {Link} from 'react-router-dom'

export default class RenderProps extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return <div>
            <Link to='/notice'>notice Link</Link>
            <Link to='/renderprops'>renderprops Link</Link>
            这是renderProps组件
        </div>
    }
}
