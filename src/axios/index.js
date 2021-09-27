import axios from 'axios'

export default class Axios {
    static ajaxRequest(options) {
        //promise里接受一个回调(diao)函数
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'post',
                timeout: 10000,
                headers: {
                    'Content-Type': 'application/json;'
                },
                // params:(options.data && options.data.params) || '',
                data: options.params
            }).then((response) => {
                //status 200是http请求自身的
                if (response.status === 200) {
                    let res = response.data
                    resolve(res);
                } else {
                    reject(response.data);
                }
            })
        });
    }

}