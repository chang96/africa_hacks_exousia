// const puserid = window.localStorage.getItem('userId')
const pemail = window.localStorage.getItem('email')
const pList = document.getElementById('list2')
const psetLists = function (data) {
   
    let html = ''
    data.forEach((dat, i)=> {
        const data= dat.data()
        let htm =  `
        <tr>
        <td>${i+1}</td>
        <td>${data.amount}</td>
        <td>${new Date(data.requestDate).toUTCString()}</td>
    </tr>`
        html+=htm
    })
    return html
}

//   let p=[
//             {name: 0000, date: new Date().toDateString()},
//             {name: 0000, date: new Date().toDateString()},
//             {name: 0000, date: new Date().toDateString()},
//             {name: 0000, date: new Date().toDateString()},
//             {name: 0000, date: new Date().toDateString()},
//             {name: 0000, date: new Date().toDateString()},
//             {name: 0000, date: new Date().toDateString()},
//             {name: 0000, date: new Date().toDateString()}
//         ]
$(document).ready(()=>{
    auth.onAuthStateChanged(async user => {
        console.log(user.emailVerified)
        if(user.emailVerified === true || 1== 1){
            db.collection('withdrawals').where('user', '==', pemail).get().then(props=>{
                console.log(props.docs)
                // name.innerHTML = props.firstname
                console.log(props.docs)
                if(props.length < 1 ) {
                    pList.innerHTML = '' 
                
                   } else {
                    let grouped = pgroup(props.docs, 10)
                    console.log(grouped)
                    let sp = psetPage(grouped, 8)
                   }  
               })
        } else if(user.emailVerified !== true){
            window.location = '/sent.html'
        } else {
            window.location = '/index.html'
        }
    })


    // const params = new URLSearchParams(window.location.search)
    // const mode = params.get('mode')
    // if(mode === 'verifyEmail'){
    //     window.location.href = '/login.html'
    // } 
    // if(mode === 'resetPassword'){
    //     window.location.href = '/login.html'
    // }
 
})


function pgroup(arr, group){
    let returnalbleArr = []
    let l = Math.floor(arr.length/group)
    for(let i=0; i<= l; i++){
      returnalbleArr.push(arr.splice(0, group))
    }
    return returnalbleArr
  }

  async function psetPage(pages, l){
    let pagination = []
    console.log(pages)
    pages.forEach(function(page, j){
        let html = ''
        console.log(page)
        let p = plp(page, psetLists)
        pagination.push(p)
    })
    storedPagination = [...pagination]
    pList.innerHTML = pagination[0] + `<div class='' style='display:flex;flex-direction:row;margin-left: 0px;cursor: pointer; text-align:center;width: 50px'>${parrange(pagination)}</div>`
    console.log(pagination.length)
}

function plp(page, fn){
    return [page].map(function(p){
        return fn(p)
    })
}

function parrange(pagination, fg){
    let l = pagination.length
    let pages = pagination.map(function(page, i){
       // return `<div data-site=${page} onclick="setPageNumber(this.id) id=${String(Math.random * Date.now())}"><a>${i+1}</a></div>`
       return `<p style="text-align:center;color: blue" class='container column';cursor: pointer; onclick=setPageNumber(this.id) id=${i} >${i+1}</p>`
    })
    console.log(pages.join(''))
    return pages.join('')
}
function psetPageNumber(id){
    console.log(id)
    // let products = document.getElementById(id).getAttribute('data-site')
    let products = storedPagination[id]
    pList.innerHTML = products + `<div style='display:flex;flex-direction:row;margin-left: 0px;cursor: pointer; text-align: center; width: 50px'>${parrange(storedPagination)}</div>`
}

function d(){
    const a = document.getElementById('n')
a.addEventListener('click', function(){
    console.log('ckakjd')
   return  $.ajax({
        url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/8/31/8744407/8744407_937826b4-86e8-4be0-946d-935c13716dc4_1915_1549.jpg',//'https://cors-anywhere.herokuapp.com/https://firebasestorage.googleapis.com/v0/b/legalbuddie.appspot.com/o/documents%2Fb1.jpeg?alt=media&token=d8ddbd34-cef0-4d0a-a048-c30b6898573d',
        async:true,
        method: 'GET',
        xhrFields: {
            responseType: ''
        },
        // success: function (dat) {
            
        //     const data = dat
            
        //     console.log(data)
            
        //         var a = document.createElement('a');
        //         // a.src = window.URL.createObjectURL(data);
        //         const binaryData = []
        //         binaryData.push(data)
        //         var url = window.URL.createObjectURL(new Blob(binaryData, {type: "application/zip"}));
        //         a.href = url;
        //         a.download = 'images.jpg';
        //         document.body.append(a);
        //         a.click();
        //         a.remove();
        //         window.URL.revokeObjectURL(url);
        
        
        // }
    }).then(function(data){
        console.log(data)
                var a = document.createElement('a');
                // a.src = window.URL.createObjectURL(data);
                const binaryData = []
                binaryData.push(data)
                var url = window.URL.createObjectURL(new Blob(binaryData, {type: "image/png"}));
                a.href = url;
                a.download = 'images.jpg';
                console.log(a)
                document.body.append(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
    });
})

}



