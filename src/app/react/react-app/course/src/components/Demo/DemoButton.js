import React from "react";

const DemoButton = (props) => {
    return (
        <button onClick={props.clickHandler} className="btn btn-info">
            {props.children}
        </button>
    )
}

export default React.memo(DemoButton);