const defaultAPIDomain = 'https://api.nftbwc.com/api/bwt/theOne/' //默认的API访问域名
const request = function(method = 'get',api,parameter){
    const url = defaultAPIDomain + api
    return new Promise ((resolve,reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open(method,url)
        xhr.setRequestHeader('Content-Type','application/json')
        xhr.send(JSON.stringify(parameter))
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200) resolve(xhr.response)
                else reject(xhr.status)
            }
        }
    })
}
export {request}