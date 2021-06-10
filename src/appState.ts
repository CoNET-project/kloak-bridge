const deleteAllProperties = (object: any) => (
    Object
        .entries(object)
        .forEach(([key, value]) => {
            if (typeof value === 'object') {
                deleteAllProperties(value);
            }
            delete object[key];
        })
);

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

    const get = <ValueType>(
        getFn: (state: AppStateType) => ValueType
    ): ValueType => (
        getFn(appState)
    );

    const set = (
        setFn: (state: AppStateType) => void
    ) => {
        setFn(appState);

        status.isModified = true;
    };

    const getIsModified = () => (
        status.isModified
    );

    const clearIsModified = () => {
        status.isModified = false;
    };

    const wipeState = () => {
        deleteAllProperties(appState);
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
