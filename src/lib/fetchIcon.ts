const getFavicons = require('../get-website-favicon');
const request = require('../get-website-favicon/lib/request');
import { fetchFaviconData } from "./fetchFavicon";

export const getIconBinaryData = async (url: string): Promise<{ data: any, type: string }> => {
    const faviconData = await fetchFaviconData(url);

    if (faviconData) {
        return faviconData;
    }

    try {
        const data = await getFavicons(url);
        const icon = data?.icons[0]
        if (icon) {
            const resp = await request(icon.src, { method: 'GET', responseType: 'arraybuffer' });
            return { data: resp.data, type: icon.type };
        } else {
            return null;
        }
    } catch (err: any) {
        return null
    }
};