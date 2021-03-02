import {SES} from 'aws-sdk';

const ses = new SES(); 

export async function handler(event: any){

    console.log("Request ==>>", event)

    const params = {
        Destination: {
            ToAddresses: ["mutahirriaz2@gmail.com"], // you have to verify recieving email address in aws ses
        },
        Message: {
            Body: {
                Text: {Data: "Hello! how are you"},
            },
            Subject: {Data: "Testing SES"},
        },
        Source: "hello@mutahirdomain.ml",
    };
    
    try{
        await ses.sendEmail(params).promise();
    }
    catch(error){
        console.log('error sending email ', error);
    }

}