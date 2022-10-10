$(document).ready(function(){
    db.collection('livelink').doc('vemtfxPohXPEzQFJXb4B').get().then(function(data){
        const updatedLink = document.getElementById('updatedlink')
        const link = data.data()
        console.log(link)
        if(link.link == 'nthing') {
            updatedLink.innerHTML = ''
        }
        else {
            updatedLink.innerHTML = `<tr>
            <td>1</td>
            <td class="txt-oflo">${new Date(link.date).toUTCString() }</td>
            <td>${link.link}</td>
            <td>${link.time}</td>
            <td>${link.stage}</td>
            <td><button type='button' onclick=deletion('emtfxPohXPEzQFJXb4B') class="btn btn-danger">Delete</button></td>
        </tr>`
        }
      
    })
})


const deletion = function(id){
    console.log(id)
    db.collection('livelink').doc('vemtfxPohXPEzQFJXb4B').update({link: 'nthing'}).then(function(d){
        console.log(d)
        swal('Link deleted')
    }).catch(e=> swal(e))
}

const updateLink = function(){
    const link = document.getElementById('l').value
    const time = document.getElementById("time").value
    const stage = document.getElementById("stage").value
    db.collection('livelink').doc('vemtfxPohXPEzQFJXb4B').update({stage: stage, time: time, link: link, date: Date.now()}).then(function(d){
        swal('Link updated')
    }).catch(e=> swal(e))
}

