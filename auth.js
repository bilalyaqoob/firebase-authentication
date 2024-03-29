// listen for auth status changes
auth.onAuthStateChanged((user) =>{
    if(user){
        db.collection('guides').get().then(snapshot=>{
            setupGuides(snapshot.docs);
            setupUi(user);
        });
    } else {
        setupUi([]);
        setupGuides([]);
    }
});

// signup
var signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    // get user info
    var email = signupForm['signup-email'].value;
    var password = signupForm['signup-password'].value;

    // sign up the user
    auth.createUserWithEmailAndPassword(email,password).then(cred =>{
        var modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click',(e)=>{
    e.preventDefault();
    auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    
    auth.signInWithEmailAndPassword(email,password).then((cred)=>{
        var modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    });
});
