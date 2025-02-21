import useCounter from './Utilities/use-counter';

export const Decrement = () => {
    let counter = useCounter(false); // itt/így kapjuk meg a use-counter.js return értékét

    return (
        <>
            <div>{counter}</div>
        </>
    )
}