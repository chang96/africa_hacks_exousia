
const List = document.getElementById('list')
const setLists = function (data) {
   
    let html = ''
    data.forEach((dat, i)=> {
        const data= dat.data()
        let htm =  `
        <tr>
        <td>${i+1}</td>
        <td class="txt-oflo">${data.productName}</td>
        <td><img style="height:50px; width:50px" src=${data.url}></td>
        <td>${data.amount}</td>
        <td class="txt-oflo">https://exousia-82760.web.app/products?productid=${data.id}</td>
        <td><button id=${dat.id} onclick="del(this.id)" class="btn btn-danger"><a class="btn btn-danger">Delete</a></button></td>

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
        if( 1== 1){
            db.collection('products').get().then(props=>{
                // const props = d.docs[0].data()
                // name.innerHTML = props.firstname
                console.log(props.docs)
                if(props.docs.length < 1 ) {
                    List.innerHTML = '' 
                
                   } else {
                    let grouped = group(props.docs, 10)
                    console.log(grouped)
                    let sp = setPage(grouped, 8)
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


function group(arr, group){
    let returnalbleArr = []
    let l = Math.floor(arr.length/group)
    for(let i=0; i<= l; i++){
      returnalbleArr.push(arr.splice(0, group))
    }
    return returnalbleArr
  }

  async function setPage(pages, l){
    let pagination = []
    console.log(pages)
    pages.forEach(function(page, j){
        let html = ''
        console.log(page)
        let p = lp(page, setLists)
        pagination.push(p)
    })
    storedPagination = [...pagination]
    List.innerHTML = pagination[0] + `<div class='' style='display:flex;flex-direction:row;margin-left: 0px;cursor: pointer; text-align:center;width: 50px'>${arrange(pagination)}</div>`
    console.log(pagination.length)
}

function lp(page, fn){
    return [page].map(function(p){
        return fn(p)
    })
}

function arrange(pagination, fg){
    let l = pagination.length
    let pages = pagination.map(function(page, i){
       // return `<div data-site=${page} onclick="setPageNumber(this.id) id=${String(Math.random * Date.now())}"><a>${i+1}</a></div>`
       return `<p style="text-align:center;color: blue" class='container column';cursor: pointer; onclick=setPageNumber(this.id) id=${i} >${i+1}</p>`
    })
    console.log(pages.join(''))
    return pages.join('')
}
function setPageNumber(id){
    console.log(id)
    // let products = document.getElementById(id).getAttribute('data-site')
    let products = storedPagination[id]
    List.innerHTML = products + `<div style='display:flex;flex-direction:row;margin-left: 0px;cursor: pointer; text-align: center; width: 50px'>${arrange(storedPagination)}</div>`
}

function del(id){
    db.collection("products").doc(id).delete().then(function(x){
        alert('link deleted')
        window.location.reload()
    })
}



const resolve = function(id){
    db.collection('withdrawals').doc(id).update({status: 'resolve'}).then(()=>{
        alert("withdrawal completed")
    })
}