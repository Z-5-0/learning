import { Component } from "react";

export default class ErrorBoundaries extends Component {
    constructor() {
        super();
        this.state = { hasError: false };
    }
    componentDidCatch(error) {
        this.setState({ hasError: true });
    }

    render() {
        return (
            <>
                {!this.state.hasError && this.props.children}
                {this.state.hasError && <div>Something went wrong</div>}
            </>
        )
    }
}