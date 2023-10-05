const resolvedPromise=()=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve({message: 'delayed success!'});
        }, 500);
    });
};

const rejectedPromise = ()=> {
    return new Promise((_, reject)=>{
        setTimeout(()=>{
            reject({error: 'delayed exception!'});
        },500);
    });
};

// Calling the promises and handling the results
resolvedPromise()
    .then(console.log)
    .catch(console.error);

rejectedPromise()
    .then(console.log)
    .catch(console.error);