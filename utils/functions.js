/**
 * Transfer string from Transaction Array
 */
function splitTransactionStringArray(stringTransaction){
    const checkComma=stringTransaction.includes(',');
    if (checkComma){
        let transactionArray=stringTransaction.split(',');
        // console.log(transactionArray)
        return transactionArray;
    } else{
        let transactionArray=[];
        transactionArray.push(stringTransaction);
        // console.log(transactionArray)

        return transactionArray;
    }

}