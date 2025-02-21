import React, { Component } from 'react';
import ParagraphDemo from './ParagraphDemo';

class ClassDemo extends Component {
    title = 'Greetings!';

    constructor(props) {
        super(props);
        this.state = { showParagraph: true, count: 0 };
        // this.toggleParagraph = this.toggleParagraph.bind(this); // a kötést itt is meg lehet tenni, és akkor ennyi marad: onClick={this.toggleParagraph}
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        /* console.log('componentDidUpdate: ', prevProps, prevState, snapshot);
        if (prevState.count !== this.state.count) {
            this.setState({ count: this.count + 1 });
        } */

        /* try {
            throw new Error('Error just has happened');
        } catch (error) { // a paraméterben megkapjuk az error objektumot
            alert(error.message);
        } */

        // throw new Error('Error just has happened');
    }

    toggleParagraph() {
        // console.log('toggle: ', this);
        // this.state.showParagraph = !this.state.showParagraph; // hibás megközelítés
        // this.setState({ showParagraph: !this.state.showParagraph }); // biztonságosabb callback függvényt használni
        this.setState((prevState) => ({
            showParagraph: !prevState.showParagraph
        }));
    }

    render() {
        return (
            <div>
                <h1>{this.title} {this.props.name}</h1>
                {/* this.state.showParagraph && this.props.children */}
                {this.state.showParagraph && <ParagraphDemo></ParagraphDemo>}
                <button className='btn btn-primary' onClick={() => this.toggleParagraph()}>
                    {this.state.showParagraph ? 'Hide' : 'Show'}
                </button>
            </div>
        );
    }
}

export default ClassDemo;