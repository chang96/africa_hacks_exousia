async function storeDocs(){
    const files = document.getElementById('files')
    const title = document.getElementById('title').value
    const content = tinymce.activeEditor.getContent() // document.getElementById('content').value
    let category = document.getElementById('category').value
    if(document.getElementById('subcat')){
         category = document.getElementById('subcat1').value
    }
    const author = document.getElementById('author').value
    return auth.onAuthStateChanged(async user => {
        if(user){
            m =  user.email
            // console.log(files, option)
            const urls = []
            var b =  await store(urls, "/blogImages/", files)
            const a = content.split('').splice(0, 45).join('')
            // const updating = await update('complaints',complaints,  det[1])
            const newDoc = await db.collection('blogImages').add({
                title: title,
                content: content,
                readMoreContent: a ,
                category:category,
                url: b[0],
                date: Date.now(),
                author: author,
                // subcat: subcat || 'others'
            })
            console.log(b)
            swal('blog posted')
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