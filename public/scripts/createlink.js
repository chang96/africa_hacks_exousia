async function createLink(){
    const productName = document.getElementById('productname').value
    const amount = document.getElementById('amount').value
    const months = document.getElementById('months').value
    const files = document.getElementById("image")

    return auth.onAuthStateChanged(async user => {
        if(user){
            m =  user.email
            // console.log(files, option)
            const urls = []
            var b =  await store(urls, "/productImages/", files)
            // const updating = await update('complaints',complaints,  det[1])
            const newDoc = await db.collection('products').add({
                productName: productName,
                amount: amount,
                url: b[0],
                datecreated: Date.now(),
                months: months,
                id: guid()
            })
            console.log(b)
            alert('Link created.')
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


function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }