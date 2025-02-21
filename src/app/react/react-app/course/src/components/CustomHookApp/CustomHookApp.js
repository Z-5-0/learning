import { Decrement } from "./Decrement"
import { Increment } from "./Increment"

export const CustomHookApp = () => {
    return (
        <>
            <div className='d-flex justify-content-around'>
                <Decrement></Decrement>
                <Increment></Increment>
            </div>
        </>
    )
}