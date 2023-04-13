var moment = require('moment');

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

function calculateWeekDate(basisDate = moment().format('YYYY-MM-DD')) {
    let weekDate = [];
    let howWeek = moment(basisDate).day();   // 获取到依据日期为星期几；0为星期日、6为星期6
    // 如果今天是周日，则单独处理，往前计算6天
    if (howWeek === 0) {
      let mixins = 0;
      while (mixins <= 6) {
      // 一次减1；即一次减6天，5天... => 获取到了这周的周一、周二、到今天
        weekDate.unshift(moment(basisDate).subtract(mixins, 'days').format('YYYY-MM-DD'));
        mixins++;
      }
      return weekDate;
    }
 
    let minusNum = 1, addNum = 1;
    // 用今天的日期对应的星期数去往前遍历
    while (minusNum <= howWeek) {
      // 一次减1；即一次减6天，5天... => 获取到了这周的周一、周二、到今天
      weekDate.push(moment(basisDate).subtract(howWeek - minusNum, 'days').format('YYYY-MM-DD'));
      minusNum++;
    }
 
    // 7 - howWeek 即今天后面要加的天数（一周是7天）
    while(addNum <= (7 - howWeek)) {
      weekDate.push(moment(basisDate).add(addNum, 'days').format('YYYY-MM-DD'));
      addNum++;
    }
    return weekDate;
}


module.exports = { calculateWeekDate }
