// Adapted from AWS-provided simple Calculator function
// https://docs.aws.amazon.com/apigateway/latest/developerguide/simple-calc-nodejs-lambda-function.html

// AWS-SDK dependency
const AWS = require('aws-sdk');

// get reference to S3 client
const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    if (event.a === undefined || event.b === undefined || event.op === undefined) {
        callback("400 Invalid Input");
    }
    
    const res = {};
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

    try {
        const destparams = {
            Bucket: "destBucketName", //Update for your bucketName
            Key: "results.txt",
            Body: JSON.stringify(res),
        };

        const putResult = await s3.putObject(destparams).promise();
        console.log('Calculated Results:', JSON.stringify(res, null, 2));
        callback(null, res);
        
    } catch (error) {
        console.log(error);
        return;
    } 
    
};