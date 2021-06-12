import React from 'react';


class Slider extends React.Component 
{
    state = {
        value: this.props.course_group.score
    }
    
    handleOnChane = (e) =>
    {
        this.setState({value: e.target.value})
        this.props.change(e.target.value,this.props.i);
    }
    
    
    render()
    {
        return (
            <div className="slide">
                <div className="value" style={{fontSize:"1.3em"}}>{this.state.value}</div>
                <input type="range" min={0} max={1000} value={this.state.value} className="slider" onChange={this.handleOnChane}/>
            </div>

        )
    }

}




export default Slider