import useCounter from './Utilities/use-counter';

export const Increment = () => {
    let counter = useCounter(); // itt/így kapjuk meg a use-counter.js return értékét

    return (
        <>
            <div>{counter}</div>
        </>
    )
}