//get data


// Listen for auth status changes
auth.onAuthStateChanged(user => {
  
  if (user) {
    db.collection('guides').onSnapshot(snapshot => {
      //setupGuides(snapshot.docs);
      setupUI(user);
      
    }, err => {
      console.log(err.message)
    })   ;
    
  } 
  else {
    //setupGuides([]);
    setupUI();
  }

  });

// signup
const signupForm = document.querySelector('#signup-form');
const notisignup = document.querySelector('.noti-signup');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  const cfpassword = signupForm['signup-cfpassword'].value;
  const first_name = signupForm['signup-first-name'].value;
  const last_name = signupForm['signup-last-name'].value;


  // thông tin không được để trống
  if(email == "" || password == "" || cfpassword == ""||first_name == ""||last_name == "")
  {
    notisignup.innerHTML ="Thông tin không được để trống.";
  }
  // mật khẩu phải trùng nhau
  else
  {
    if(password != cfpassword)
  {
    notisignup.innerHTML ="Mật khẩu không trùng khớp.";
  }
  
  else
  {

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      return db.collection("users").doc(cred.user.uid).set({
        
        first_name: signupForm['signup-first-name'].value,
        last_name: signupForm['signup-last-name'].value,
        email: signupForm['signup-email'].value,
        country: '',
        province: '',
        phone:'',
        photoURL: '',
      });
    }).then(() => {
      // close the signup modal & reset form
      const modal = document.querySelector('#modal-signup');
      M.Modal.getInstance(modal).close();
      signupForm.reset();
      notisignup.innerHTML ="Đăng ký thành công.";
    }).catch(err => {
      notisignup.innerHTML ="Email đã được sử dụng.";
      
    });
  }
}
});

//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
  })
}
);

//login
const loginForm = document.querySelector('#login-form');
const notilogin = document.querySelector('.noti-login');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then(cred => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  }).catch(err => {
    notilogin.innerHTML ="Email hoặc mật khẩu không đúng.";
    
  });
}
);

