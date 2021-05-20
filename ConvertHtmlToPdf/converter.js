const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");

async function convertToPdf(funcDir) {

    var dataBinding = {
        items: [{
                name: "item 1",
                price: 100
            },
            {
                name: "item 2",
                price: 200
            },
            {
                name: "item 3",
                price: 300
            }
        ],
        total: 600,
        isWatermark: false
    }

    var templateHtml = fs.readFileSync(path.join(process.cwd(), 'html', 'invoice.html'), 'utf8');
    var template = handlebars.compile(templateHtml);
    var finalHtml = template(dataBinding);

    const browser = await puppeteer.launch({
        args: ["--no-sandbox"],
        headless: true
    });

    const page = await browser.newPage();
    await page.setContent(finalHtml);

    var options = {
        format: 'A4',
        headerTemplate: "<p></p>",
        footerTemplate: "<p></p>",
        displayHeaderFooter: false,
        margin: {
            top: "40px",
            bottom: "100px"
        },
        printBackground: true,
        path: 'pdf/invoice.pdf'
    }

    const pdfStream = await page.pdf(options);
    await browser.close();

    return pdfStream;
}

module.exports.convertToPdf = convertToPdf;