function lowerCaseWords(mixedArray){
    return new Promise((resolve, reject)=>{
        if(!Array.isArray(mixedArray)){
            return reject(new Error("Input is not an array"));
        }

        const lowercasedWords = mixedArray.filter(item=> typeof item == 'string')
            .map(word => word.toLowerCase());
        resolve(lowercasedWords);
    })
}

const mixedArray = ['PIZZA', 10, true, 25, false, 'Wings'];

lowerCaseWords(mixedArray)
    .then(console.log)
    .catch(console.error);