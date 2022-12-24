const guidelist = document.querySelector('.guides');

const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
  if (user) {
    db.collection("users").doc(user.uid).get().then(doc => {
      if(doc.data().photoURL == ""){
        const url="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
      }
      else{
        const url = doc.data().photoURL;
      }
      const html=`<div class="container rounded bg-white mt-5 mb-5">
      <div  class="row">
          <div class="col-md-3 border-right">
              <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src=${doc.data().photoURL}></div>
              <span class="font-weight-bold">${doc.data().last_name} ${doc.data().first_name}<br></span>
              <span class="text-black-50">${doc.data().email}</span><span> </span>
          </div>
          <div class="col-md-5 border-right">
              <div class="p-3 py-5">
                  <div class="d-flex justify-content-between align-items-center mb-3">
                      <h4 class="text-right">Thông tin người dùng</h4>
                  </div>
                  <div class="row mt-2">
                      <div class="col-md-6"><label class="labels">Họ</label><input id="profile-last-name" type="text" class="form-control" placeholder=${doc.data().last_name} value=""></div>
                      <div class="col-md-6"><label class="labels">Tên</label><input id="profile-first-name" type="text" class="form-control" value="" placeholder=${doc.data().first_name}></div>
                  </div>
                  <div class="row mt-3">
                      <div class="col-md-12"><label class="labels">Số điện thoại</label><input id="profile-phone" type="text" class="form-control" placeholder=${doc.data().phone} value=""></div>
                      
                      
                  </div>
                  
                  
              </div>
          </div>
          <div class="col-md-4">
              <div class="p-3 py-5">
                  <div class="d-flex justify-content-between align-items-center experience"><span>Địa chỉ</span></div><br>
                  
                    <div class="col-md-6"><label class="labels">Quốc gia</label><input id="profile-country" type="text" class="form-control" placeholder=${doc.data().country} value=""></div>
                    <div class="col-md-6"><label class="labels">Tỉnh/Thành phố</label><input id="profile-province" type="text" class="form-control" value="" placeholder=${doc.data().province}></div>
                    
                  
              </div>
          </div>
          
      </div>
      <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">Save Profile</button></div>
  </div>
  </div>
  </div>`;
    guidelist.innerHTML = html;
    });

    const profileForm = document.querySelector('#profile-form');
    console.log("updateProfile");
    console.log(user.uid);
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const temp = auth.currentUser;
      console.log(temp);
      
      const mid=db.collection("users").doc(user.uid);
      mid.update({
        last_name: '11'
      }).catch(err => {
        console.log("update error");
      })
      /*db.collection('users').doc(user.uid).update({
        last_name: '111'

    
    
      }).then(() => {
        // close the create modal & reset form
        const modal = document.querySelector('#modal-account');
        M.Modal.getInstance(modal).close();
        createForm.reset();
      })
      .catch(err => {
        console.log("update error");
      }
      )*/
    });


    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  }
  else {
    // hide account info
    //accountDetails.innerHTML = '';
    guidelist.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}

//đổi mật khẩu

/*
// create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('guides').add({
    title: createForm['title'].value,
    content: createForm['content'].value
  }).then(() => {
    // close the create modal & reset form
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  })
  .catch(err => {
    console.log(err.message);
  }
  );
});



// setup guides
const setupGuides = (data) => {
  if (data.length) {
    let html='' ;
    data.forEach(doc => {
        const guide =doc.data();
        const li = `
        <li>
            <div class="collapsible-header grey lighten-4">${guide.title}</div>
            <div class="collapsible-body white">${guide.content}</div>
            <div class="collapsible-body white">${guide.content}</div>

        </li>
        `;
        html += li;


      
    });
    guidelist.innerHTML = html;
  }
  else {
    guidelist.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
  }
}*/

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});



//updata user profile

