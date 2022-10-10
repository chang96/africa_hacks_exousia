
const List = document.getElementById('withdrawals')
const setLists = function (data) {
   
    let html = ''
    data.forEach((dat, i)=> {
        const data= dat.data()
        let htm =  `
        <tr>
        <td>${i+1}</td>
        <td>
        <img id=${i} onclick=mm(this.id) height=150px width=150px src=${data.proof} />
        <td>${data.depositorsname || `no depositor`}</td>
<!-- The Modal -->
<div id=${i}i class="modal">

  <!-- The Close Button -->
  <span class="close">&times;</span>

  <!-- Modal Content (The Image) -->
  <img class="modal-content" id=${i}ii>

  <!-- Modal Caption (Image Text) -->
  <div id="caption"></div>
</div>
        </td>
        <td>${data.amount}</td>
        <td>${data.user}</td>
        <td>${new Date(data.date).toLocaleDateString()}</td>
        <td>${data.status}</td>
        <td><input id=${dat.id}i  type=number /></td>
        <td><button id=${dat.id} onclick="resolve(this.id)" class="btn btn-danger">Confirm</button></td>
        <td><button id=${dat.id}u onclick="del(this.id)" class="btn btn-danger">Delete</button></td>

        
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
            db.collection('accesspayments').where('status', '==', 'pending').get().then(props=>{
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



const resolve = async function(id){
    const amount = document.getElementById(`${id}i`).value
    db.collection('accesspayments').doc(id).update({status: 'resolved', amount: amount}).then(()=>{
        db.collection('accesspayments').doc(id).get().then(async data=> {
            const d = data.data()
            const email = d.user
            await checkForRef(email)
        })
        alert("Payment update completed")
    })
    
}

async function checkForRef(m){
    const u = await finder('email', m)
    const refReward = await db.collection('rewards').doc('VZBfibUwPzXT7Jd5ojTH').get().then(data=>{
        return data.data()
})
    if(u[0].referredBy.split('').length > 3){
    const referrer = await finder('referralId', u[0].referredBy)
    const na = referrer[0].totalAmount + 4000 //Number(refReward.direct)
    const everybody = referrer[0].referrals
    everybody.push({date: Date.now(), name:u[0].firstname ,reward:4000 , type: 'direct'})
    const updatee = await update('referrals', everybody, referrer[1])
    const updatee11 = await update('totalAmount', na, referrer[1])
    // if(referrer[0].referredBy.split('').length > 3 ){ //count will be here to make ensure a user takes not more than 4 indirect refs
    //     // const parentReferralId = referrer.referralId
    //     // const pyramid= findN(referrer.referrals.length)
    //     // n = pyramid[0]
    //     // p = pyramid[2]
    //     // db.collection('users').where('referredBy', '==', parentReferralId).where('generation', '==', n).where('position','==',p).get().then(async data=>{
    //     //     const id = data.docs[0].id
    //     //     const user = data.docs[0].data()
    //     //     const fna = user.totalAmount + 1000
    //     //     const everybody = user.referrals
    //     //     everybody.push({date: Date.now(), name: referrer[0].firstname, reward: 1000, type: 'indirect'})
    //     //     await update('referrals', everybody, id)
    //     //     await update('totalAmount', fna, id)
    //     // })
       
    //     const firstReferrer = await finder('referralId', referrer[0].referredBy)
    //     const fna = firstReferrer.totalAmount + 1000 
    //     const everybody = firstReferrer[0].referrals
    //     everybody.push({date: Date.now(), name: referrer[0].firstname, reward: 1000, type: 'indirect'})
        
    //     await update('referrals', everybody, firstReferrer[1])
    //     await update('totalAmount', fna, firstReferrer[1])

    // }
}
await update('paid', true, u[1])
db.collection('accesspayments').add({
    user: email,
    status: 'resolved',
    date: Date.now(),
    amount: 50,
    proof: 'transfer'
}).then(data=> data).catch(e=> swal('Proof could not be submitted, please try again later'))

}


async function findUser(email){
    return await db.collection('users').where("email", '==', email).get().then(data=>{
        return data.docs[0].data()
    }).catch(e=> console.log(e))
}
async function finder(key, value){
    console.log(key, value)
    return await db.collection('users').where(key, '==', value).get().then(data=>{
        console.log(data)
        return [data.docs[0].data(), data.docs[0].id]
    }).catch(e=> console.log(e))
}
async function update(key, value, id){
    return await db.collection('users').doc(id).update({[key]: value}).then(data=>{
        return 'done'
    }).catch(e=> console.log(e))
}

function findN(Sn){
    let n = 2
    while(Math.pow(3, n) - 1 < (Sn+1) * 2){
        n=n+1
    }
    n == 1? Sn_1 = Math.ceil((0.5)*(Math.pow(3, n) - 1)) : Sn_1 = Math.ceil((0.5)*(Math.pow(3, n-1) - 1))
    return [n, Sn_1, Sn-Sn_1 +1]  
}

const del = function(id){
    const nid = id.split("")
    nid.pop()
    const nnid = nid.join("")
    db.collection('accesspayments').doc(nnid).delete().then(function(){
        swal('Video deleted')
    })
}