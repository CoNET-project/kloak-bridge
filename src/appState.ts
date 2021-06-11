// eslint-disable-next-line import/prefer-default-export
export const getAppState = <AppStateType>(
    initialState: AppStateType
) => {
    let appState = initialState;

    const status = {
        isModified: false,
        isWiped: false
    };

    const throwIsWipedError = () => {
        if (status.isWiped) {
            throw new Error('the state is wiped, create a new instance to proceed');
        }
    };

    const toJSON = (
        pretty?: boolean
    ) => {
        throwIsWipedError();

        return JSON.stringify(
            appState,
            null,
            pretty ? 4 : undefined
        );
    };

    const get = <ValueType>(
        getFn: (state: AppStateType) => ValueType
    ): ValueType => {
        throwIsWipedError();

        return getFn(appState);
    };

    const set = (
        setFn: (state: AppStateType) => void
    ) => {
        throwIsWipedError();

        setFn(appState);
        status.isModified = true;
    };

    const getIsModified = () => {
        throwIsWipedError();

        return status.isModified;
    };

    const clearIsModified = () => {
        throwIsWipedError();

        status.isModified = false;
    };

    const wipeState = () => {
        throwIsWipedError();

        // @ts-ignore
        appState = null;
        status.isWiped = true;
    };

    return {
        toJSON,
        get,
        set,
        getIsModified,
        clearIsModified,
        wipeState
    };
};
