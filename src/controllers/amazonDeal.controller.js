const puppeteer = require("puppeteer");
const fs = require('fs');
const { nextPage } = require("../utils/helper");
const amazonDealModel = require('../models/amazonDeal.model');


exports.scrapeData = async (req, res) => {
    try {
        const PAGE_URL = "https://www.amazon.in/gp/goldbox/?ie=UTF8&ref=nav_topnav_deals&ref_=dlx_gate_sd_dcl_vai_dt_pd_gw_unk&pd_rd_w=sanPv&content-id=amzn1.sym.9e4ae409-2145-4395-aa6e-45d7f3e95c3e&pf_rd_p=9e4ae409-2145-4395-aa6e-45d7f3e95c3e&pf_rd_r=W449NEPHT23S7GA768AG&pd_rd_wg=998Yr&pd_rd_r=e03296bf-87cc-4bbe-8f7a-8cd4107503e8";

        const browser = await puppeteer.launch({ headless: 'new' });

        const page = await browser.newPage();

        await page.goto(PAGE_URL);

        let results = [];

        const nextPageLink = "#dealsGridLinkAnchor > div > div.GridContainer-module__gridFooter_VLpWMDEvOFj3taV1CiY8J > div > ul > li.a-last > a";

        while (true) {

            await nextPage(nextPageLink, page);

            results = await extractedData(page);

            if (!results) break;
            console.log(results);

            amazonDealModel
                .insertMany(results)
                .then(()=> console.log("data inserted"))
                .catch(()=> console.log("error"));

        }

        await browser.close();
        return res.send("Successful");

    } catch (error) {
        console.error("Error:", error);
    }
}


async function extractedData(page) {
    return await page.evaluate(() => {

        const selectedData = document.querySelectorAll(
            ".DealGridItem-module__dealItemDisplayGrid_e7RQVFWSOrwXBX4i24Tqg.DealGridItem-module__withBorders_2jNNLI6U1oDls7Ten3Dttl.DealGridItem-module__withoutActionButton_2OI8DAanWNRCagYDL2iIqN"
        )

        return Array.from(selectedData).map((data) => {

            const title = data.querySelector(
                ".DealContent-module__truncate_sWbxETx42ZPStTc9jwySW"
            )?.innerHTML;

            const discount = data.querySelector(
                ".BadgeAutomatedLabel-module__badgeAutomatedLabel_2Teem9LTaUlj6gBh5R45wd"
            )?.innerHTML;

            return { title, discount };
        });
    });
}