$(document).ready(function(){
    db.collection('bonuses').doc('Zbz5fL0zfPZQGQK35bUB').get().then(data=>{
        console.log(data)
        document.getElementById('dr').value = data.data().dr
        document.getElementById('ir').value = data.data().ir
    })
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



const goto = function(id){
    console.log(2345678)
    localStorage.setItem("userId", id)
    window.location = '/dashboard/moredetail.html'
}


const del= function(id){
    console.log(id)
    db.collection('signals').doc(id).delete().then(function(d){
        console.log(d)
        swal('Signal deleted')
    }).catch(e=> swal(e))
}

const updatebonuses =async function(){
    const dr = document.getElementById('dr').value
    const ir = document.getElementById('ir').value
    // const type = document.getElementById('type').value
    db.collection('bonuses').doc('Zbz5fL0zfPZQGQK35bUB').update({
        dr: dr,
        ir: ir
    }).then(function(d){
        swal('Bonuses updated')
    }).catch(e=> swal(e))
}


