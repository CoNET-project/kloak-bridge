import crypto from 'crypto';

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

export const createRandomValues = (): Promise<string> => (
    new Promise<string>((resolve, _) => {
        if (typeof window !== 'undefined' && window.crypto) {
            return resolve(window.crypto.getRandomValues(new Uint32Array(1)).toString());
        }
        // eslint-disable-next-line global-require
        // return resolve(require('crypto').randomInt(1000000).toString());
        return resolve(crypto.randomInt(1000000).toString());
    })
);
