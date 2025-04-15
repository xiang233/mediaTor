
export const getObjRef=(obj, str) => {
    
    return str?.split('.').reduce((r, k) => r?.[k], obj);
}


