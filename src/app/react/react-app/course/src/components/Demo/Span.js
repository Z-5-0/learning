import React from "react";

const Span = (props) => {
    return (
        <span>
            {props.children[0]}
        </span>
    )
}

export default React.memo(Span);