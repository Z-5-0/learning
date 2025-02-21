import ClassDemo from "./comps/ClassDemo";
import ContextDemo from "./comps/ContextDemo";
import ErrorBoundaries from "./comps/ErrorBoundaries";

function ClassApp() {
    return (
        <ContextDemo.Provider value={{ contextValue: 'This value is coming through ContectDemo' }}>
            <div className="app">
                <ErrorBoundaries>
                    <ClassDemo name="demo">
                        <p>Content of ClassDemo</p>
                    </ClassDemo>
                </ErrorBoundaries>
            </div>
        </ContextDemo.Provider>
    )
}

export default ClassApp;