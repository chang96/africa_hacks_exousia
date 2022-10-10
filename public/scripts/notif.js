async function storeDocs(){
    const files = document.getElementById('files')
    const title = document.getElementById('title').value
    const content = document.getElementById('content').value
    const dat = document.getElementById("date").value
    const date = moment(dat).tz('Africa/Lagos').format()
    const timestamp = moment(date).format("X");
    // console.log(date, Date.now(), timestamp*1000)
    return auth.onAuthStateChanged(async user => {
        if(user){
            m =  user.email
            // console.log(files, option)
            const urls = []
            var b =  await store(urls, "/notifs/", files)
            // const updating = await update('complaints',complaints,  det[1])
            const newDoc = await db.collection('notifs').doc('GjpRgzttwbUorDI9FR9N').update({
                title: title,
                content: content,
                url: b[0],
                datecreated: Date.now(),
                dateExp: Number(timestamp) * 1000
            })
            console.log(b)
            swal('Notifications updated')
        }
    })

}
async function uploadImageAsPromise (imageFile, location) {
    return new Promise(function (resolve, reject) {
        var storageRef = storage.ref(location+imageFile.name);
        var task = storageRef.put(imageFile);

        //Update progress bar
        task.on('state_changed',
            function progress(snapshot){
                var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 
                     100;
                     console.log(percentage)
            },
            function error(err){
                console.log(err);
                reject(err);
            },
            function complete(){
                var downloadURL = task.snapshot.ref.getDownloadURL().then((url)=> {
                   //console.log(url)
                   resolve(url)
                });
                //console.log(task.snapshot, downloadURL)
                //resolve(downloadURL);
            }
        );
    });
}

async function store(arr, location, files){
    let a = [...files.files]
    // console.log(a)
    a.forEach((element,i) => {
        if(element == undefined || element.name == undefined){
            let j = files.files.indexOf(element)
            files.files.splice(j ,1)
        }
    });
    // console.log(files.files)
    if(files.files.length <1 || files.files[0] === undefined){
        return
    }
    for (var i = 0; i < files.files.length; i++) {
        if(files.files[i] === undefined){
            continue
        }
        console.log(i, files.files.length, i === files.files.length)
        if(i === files.files.length - 1){
            var imageFile = files.files[i];
            await uploadImageAsPromise(imageFile, location).then((res)=>{
                console.log(res)
                arr.push(res)
                console.log(arr);
            })
            return arr
        }
        var imageFile = files.files[i];
        await uploadImageAsPromise(imageFile, location).then((res)=>{
         arr.push(res);
          });
    }
}

async function update(key, value, id){
    return await db.collection('users').doc(id).update({[key]: value}).then(data=>{
        return 'done'
    }).catch(e=> console.log(e))
}

async function finder(key, value){
    return await db.collection('users').where(key, '==', value).get().then(data=>{
        return [data.docs[0].data(), data.docs[0].id]
    }).catch(e=> console.log(e))
}

$(document).ready(function(){
    db.collection('notifs').doc('GjpRgzttwbUorDI9FR9N').get().then(function(data){
        const updatedLink = document.getElementById('notif')
        const link = data.data()
        console.log(link)
        if(Number(link.dateExp) < Date.now()) {
            updatedLink.innerHTML = 'Notification expired'
        }
        else {
            updatedLink.innerHTML = `<tr>
            <td>1</td>
            <td class="txt-oflo">${new Date(link.dateExp).toUTCString() }</td>
            <td>${link.title}</td>
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
    db.collection('livelink').doc('vemtfxPohXPEzQFJXb4B').update({link: link, date: Date.now()}).then(function(d){
        swal('Link updated')
    }).catch(e=> swal(e))
}

