import ReactDOM from 'react-dom'

const PortalComponent = () => {
    return ReactDOM.createPortal(
        <>
            <h3>This is a portal component</h3>
        </>,
        document.getElementById('root-portal')
    )
}

export default PortalComponent;