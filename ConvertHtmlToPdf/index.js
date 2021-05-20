const { convertToPdf } = require("./converter")

module.exports = async function(context, req) {

    context.log("JavaScript HTTP trigger function processed a request.");

    let pdf = await convertToPdf(context.functionDirectory);

    context.res = {
        status: 200,
        body: pdf,
        headers: {
            "content-type": "application/pdf"
        }
    };
};