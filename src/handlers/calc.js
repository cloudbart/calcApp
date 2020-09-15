console.log('Loading the Calc function');

exports.handler = function(event, context, callback) {
    console.log('Received event:', JSON.stringify(event, null, 2));
    if (event.a === undefined || event.b === undefined || event.op === undefined) {
        callback("400 Invalid Input");
    }
    
    var res = {};
    res.a = Number(event.a);
    res.b = Number(event.b);
    res.op = event.op;
    
    if (isNaN(event.a) || isNaN(event.b)) {
        callback("400 Invalid Operand");
    }

    switch(event.op)
    {
        case "+":
            res.c = res.a + res.b;
            break;
        case "-":
            res.c = res.a - res.b;
            break;
        case "*":
            res.c = res.a * res.b;
            break;
        case "/":
            res.c = res.b===0 ? NaN : Number(event.a) / Number(event.b);
            break;
        default:
            callback("400 Invalid Operator");
            break;
    }
    console.log('Calculation results:', JSON.stringify(res, null, 2));
    callback(null, res);
};
