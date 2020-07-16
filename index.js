const converter = require("jp-conversion");
const axios = require('axios');
const _ = require('lodash');
const {
    result
} = require("lodash");
require('dotenv').config()

const {
    API_ID,
    AFFILIATE_ID
} = process.env
const url = `https://api.dmm.com/affiliate/v3`;

async function getIdols() {
    const total = 52281

    try {
        const response = await axios.get(`${url}/ActressSearch`, {
            params: {
                api_id: API_ID,
                affiliate_id: AFFILIATE_ID,
                output: 'json',
                offset: 1,
                hits: 100,
                keyword: '',
                sort: 'id'
            }
        })

        const actress = response.data.result.actress
        const actressWithImage = actress.filter(actress => actress.imageURL)

        return actressWithImage.map(act => {
            const {
                id,
                name,
                ruby,
                bust,
                waist,
                hip,
                height,
                birthday,
                blood_type,
                hobby,
                prefectures,
                imageURL,
                listURL
            } = act

            return {
                id,
                name: imageURL.large
                    .replace('http://pics.dmm.co.jp/mono/actjpgs/', '')
                    .replace('.jpg', '')
                    .replace(/[0-9]/g, '')
                    .split('_')
                    .map(_.capitalize)
                    .filter(s => isNaN(s))
                    .join(' '),
                japanName: name,
                kataName: ruby,
                bust,
                waist,
                hip,
                height,
                birthday,
                blood_type,
                hobby,
                prefectures,
                imageUrl: imageURL.large.replace('http', 'https'),
                siteUrl: listURL.digital
            }
        })

    } catch (err) {
        console.log(err.response.data)
    }

}

async function main() {
    const data = await getIdols()
    console.log(data)
}

main()