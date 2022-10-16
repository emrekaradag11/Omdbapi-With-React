
import Config from '../config/config.json'

class API {
    siteUrl : string;
    constructor() {

        this.siteUrl = Config.API_URL

    }

    getService(cb, endpoint:string) {

        const url = Config.API_URL + Config.AUTH_KEY + endpoint;

        fetch(url, {
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

    getMovies(cb, title:string = "", page:number = 1, year:number = 2022, plot:string = '', type:string = '') {
        const endpoint =
            Config.ENDPOINTS.getMovies.replace('?', title) +
            Config.ENDPOINTS.getPages.replace('?', page.toString()) +
            Config.ENDPOINTS.getYear.replace('?', year.toString()) +
            Config.ENDPOINTS.getPlot.replace('?', plot) +
            Config.ENDPOINTS.getType.replace('?', type);

        this.getService((res) => {
            cb({ status: 200, data: res.data })
        }, endpoint)

    }
    getDetail(cb, id:string = "") {
        const endpoint = Config.ENDPOINTS.getDetail.replace('?', id);
        this.getService((res) => {
            cb({ status: 200, data: res.data })
        }, endpoint)

    }


}

export default new API();