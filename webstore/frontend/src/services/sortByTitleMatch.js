import React from 'react'
import { getObjRef } from './getObjRef'
import { categoryAPI } from '../screens/media/categoryList';
import { maxHeight } from '@mui/system';

function computeSimilarity(func, str, key) {
    var similarity = (str!=null && str!=undefined ) 
    ?
    func.compareTwoStrings(str, key)
    :
    0;
    return similarity;
}
export function sortByTitleMatch(obj1, obj2, key) {
    const stringSimilarity = require("string-similarity");
    const obj1PrimaryTitle = getObjRef(obj1, getObjRef(categoryAPI[obj1["category"]], "toCard.title"));
    const obj1SecondTitle = getObjRef(obj1, getObjRef(categoryAPI[obj1["category"]], "toCard.secondary"));
    const obj2PrimaryTitle = getObjRef(obj2, getObjRef(categoryAPI[obj2["category"]], "toCard.title"));
    const obj2SecondTitle = getObjRef(obj2, getObjRef(categoryAPI[obj2["category"]], "toCard.secondary"));
    const sim1 = Math.max(computeSimilarity(stringSimilarity,obj1PrimaryTitle, key), computeSimilarity(stringSimilarity,obj1SecondTitle, key));
    const sim2 = Math.max(computeSimilarity(stringSimilarity,obj2PrimaryTitle, key), computeSimilarity(stringSimilarity,obj2SecondTitle, key));

  return sim2-sim1;
}; 