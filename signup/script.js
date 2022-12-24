//gán firebase vào biến db
var db = firebase.database();
db.colelction("user").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc)
    });
});

//hàm đọc dữ liệu từ firebase
function readData() {
    var db = firebase.database();
    db.ref("user").on("value", function (snapshot) {
        console.log(snapshot.val());
    });
}

//hàm ghi dữ liệu vào firebase
function writeData(u_firstname,u_lastname, u_email, u_password) {
    var db = firebase.database();
    db.ref("user").set({
        firstname: u_firstname,
        lastname: u_lastname,
        email: u_email,
        password: u_password
    });

}
 //đọc dữ liệu người dùng nhập từ form
 var form = document.querySelector("form");
 //lắng nghe sự kiện submit
    form.addEventListener("submit",  (e) => {
        e.preventDefault();
        db.colelction("user").add({
            firstname: form.fname.value,
            lastname: form.lname.value,
            email: form.email.value,
            password: form.password.value
        })
    });

