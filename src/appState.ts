export const getAppState = <AppStateType>(
    initialState: AppStateType
) => {
    const appState: AppStateType = initialState;

    const status = {
        isModified: false
    };

    const toJSON = (
        pretty?: boolean
    ) => (
        JSON.stringify(
            appState,
            null,
            pretty ? 4 : undefined
        )
    );

    const get = <PropertyStateType>(
        getFn: (state: AppStateType) => PropertyStateType
    ): PropertyStateType => (
        getFn(appState)
    );

    const set = (
        setFn: (state: AppStateType) => void
    ) => {
        setFn(appState);

        status.isModified = true;
    };

    const getIsModified = () => status.isModified;

    const clearIsModified = () => {
        status.isModified = false;
    };

    return {
        toJSON,
        get,
        set,
        getIsModified,
        clearIsModified
    };
};
