export const isJSON = (text: string): boolean => {
    if (typeof text !== 'string') {
        return false;
    }
    try {
        JSON.parse(text);
        return true;
    } catch (error: any) {
        return false;
    }
};

export const test = () => {

};
