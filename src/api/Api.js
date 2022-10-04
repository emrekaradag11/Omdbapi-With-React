
import Config from '../config/config.json'

class API {

    constructor() {
        this.headerOptions = {
        }

        this.siteUrl = Config.SITE_URL

    }

    getService(cb, endpoint) {

        const url = Config.API_URL + Config.AUTH_KEY + endpoint;

        fetch(url, {
            headers: this.headerOptions,
            method: "GET",
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                cb({ status: 200, data: res })
            })
            .catch((err) => {
                cb({ status: 404, res: err })
            })
    }

    getMovies(cb, title = "", page = "", year = "", plot = '', type = '') {
        const endpoint =
            Config.ENDPOINTS.getMovies.replace('?', title) +
            Config.ENDPOINTS.getPages.replace('?', page) +
            Config.ENDPOINTS.getYear.replace('?', year) +
            Config.ENDPOINTS.getPlot.replace('?', plot) +
            Config.ENDPOINTS.getType.replace('?', type);

        this.getService((res) => {
            cb({ status: 200, data: res.data })
        }, endpoint)

    }
    getDetail(cb, id = "") {
        const endpoint = Config.ENDPOINTS.getDetail.replace('?', id);
        this.getService((res) => {
            cb({ status: 200, data: res.data })
        }, endpoint)

    }


}

export default new API();