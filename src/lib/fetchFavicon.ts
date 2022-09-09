'use strict'
const request = require('../get-website-favicon/lib/request');
// @ts-ignore
const { URL, parse: urlParse } = require('url')
const fileType = require('file-type')

export const fetchFaviconData = async (baseurl) => {
    const url = new URL('/favicon.ico', baseurl).href;

    try {
        const response = await request(url, { method: 'GET', responseType: 'arraybuffer' });
        const type = fileType(response.data) || {};
        if (response.status == 200 && (/image/ig).test(type.mime)) {
            return { data: response.data, type: type.mime };
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}