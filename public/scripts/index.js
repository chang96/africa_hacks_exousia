$(document).ready(function(){
    var currentUser = firebase.auth().currentUser
    auth.onAuthStateChanged(async user => {
        console.log(user.email)
        const email = user.email
        db.collection('users').where('email', '==', email).get().then((d)=>{
            const props = d.docs[0].data()
            console.log(props.access)
            if(props.access == 'admin'){
                console.log(24567890)
                const arr = [1,6,8,7,9]
                const arr2 = [2,3,4,5,10]
                arr2.map((l)=>{
                    document.getElementById(`${l}`).style.display = ''
                })
            } else {

                [1,2,3,4,5,6,7,8,9,10,11, 12].map((l)=>{
                    document.getElementById(`${l}`).style.display = ''
                })
            }
        })
    })
})