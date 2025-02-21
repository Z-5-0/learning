import { Component } from "react";
import ContextDemo from "./ContextDemo";

export default class ParagraphDemo extends Component {
    static contextType = ContextDemo;

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    render() {
        return (
            <p>{this.context.contextValue}</p>
        )
    }

    /* render() {
        return (
            <ContextDemo.Consumer>
                {(ctx) => {
                    return (
                        <p>{ctx.contextValue}</p>
                    )
                }}
            </ContextDemo.Consumer>)
    } */
}

// export default ParagraphDemo; // az exportálás fentebb megtörtént, így ez a sor már nem kell