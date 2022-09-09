'use strict'

const { URL, parse: urlParse } = require('url')
const getdom = require('./getdom')
const rank = require('./rank')
const iconByFile = require('./origin/file')
const iconByHtml = require('./origin/html')
const iconByManifest = require('./origin/manifest')

module.exports = async url => {
    let icons = []
    return new Promise(async (resolve, reject) => {
        if (!url) return reject({})
        if (!urlParse(url).protocol) url = `http://${url}`

        const $ = await getdom(url);

        const [tagIcon, manifestIcon, fileIcon] = await Promise.all([
            iconByHtml($),
            iconByManifest($),
            iconByFile($.baseUrl),
        ]);

        icons = icons.concat(fileIcon, tagIcon, manifestIcon)
        for (let i in icons) icons[i].rank = rank(icons[i])
        icons.sort((a, b) => (b.rank - a.rank))
        resolve({
            url: $.url,
            baseUrl: $.baseUrl,
            originUrl: url,
            icons
        })
    })
}