pinterestApp.factory ("MainFactory", function (){
  return {getter :(user_email,user_password) => {
    console.log(user_email,user_password)
    return firebase.auth().createUserWithEmailAndPassword(user_email,user_password)
      .then ((data)=>{
        console.log(data.uid)
        return UID = data.uid

      })
    },


    getUid:()=> {
      return UID = firebase.auth().currentUser.uid
    }
  }
})
