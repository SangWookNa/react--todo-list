import React, { Component } from 'react';
import './Palette.css';

class Palette extends Component {

    render() {
        const{palette , onClick} = this.props;        

        const colorList = palette.map(
            ({id, color, checked}) => (
                <div
                    className={`color ${checked && 'active'}`}
                    style = {{backgroundColor: color}}
                    key = {id}
                    onClick = {() => onClick(id)}
                    
                />
            )
        );

        return(
            <div className = 'palette'>
                {colorList}
            </div>
        );
    }
}

export default Palette;