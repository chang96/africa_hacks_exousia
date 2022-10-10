const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('productid')
console.log(product);

db.collection('products').where("id", '==', product).get().then(d=>{
    console.log(d.docs[0].data().url)
    document.getElementById("img").src = d.docs[0].data().url
})

async function createUser(){
    let firstName = document.getElementById("firstname").value.toLowerCase()
    let lastName = document.getElementById("lastname").value.toLowerCase()
    let phoneNumber = document.getElementById("number").value
    let email = document.getElementById("email").value
    let BVN = document.getElementById("bvn").value
    let address = document.getElementById("address").value
    let company = document.getElementById('company').value
    let bank = document.getElementById("bank").value
    let accountName = document.getElementById("accountname").value
    let aaccountNumber = document.getElementById("accountnumber").value
    let files = document.getElementById("idcard")
    let validNames = ["orewole", "rahman", "lawal", "timileyin", "oluwatimileyin"]
    if(validNames.indexOf(firstName) < 0 || validNames.indexOf(lastName) < 0){
        alert("Wrong details, kindly enter valid BVN details")
    } else {
        let urls = []
        let b = await store(urls, "/ids/", files)
        let newUser = await db.collection("users").add({
            firstName,
            lastName,
            phoneNumber,
            email,
            BVN,
            address,
            company,
            bank,
            accountName,
            aaccountNumber,
            idLink: b[0]
        }).then(function(d){
            alert("user details saved")
        })
    }

  
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
