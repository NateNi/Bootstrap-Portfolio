    var config = {
        apiKey: "AIzaSyD7LQ3JvdJvOsnuOi7AnOSfLzkqTqJ0Rjw",
        authDomain: "travelandwork-8ec9c.firebaseapp.com",
        databaseURL: "https://travelandwork-8ec9c.firebaseio.com",
        projectId: "travelandwork-8ec9c",
        storageBucket: "travelandwork-8ec9c.appspot.com",
        messagingSenderId: "288792221606"
    };
    firebase.initializeApp(config);
    function toggleSignIn() {
        if (!firebase.auth().currentUser) {
            var provider = new firebase.auth.GithubAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function (result) {
                var token = result.credential.accessToken;
                var user = result.user;
                document.getElementById('quickstart-oauthtoken').textContent = token;
                console.log(user);
            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                if (errorCode === 'auth/account-exists-with-different-credential') {
                    alert('You have already signed up with a different auth provider for that email.');
                } else {
                    console.error(error);
                }
            });
        } else {
            firebase.auth().signOut();
        }
        document.getElementById('quickstart-sign-in').disabled = true;
    }
    function initApp() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                document.getElementById('quickstart-sign-in').textContent = 'Sign out';
                $('#auth-name').text(displayName);
                $('#auth-avatar').attr('src', photoURL);
                $('#auth-status').text(email);
                var sidebar = $('#slide-out');
                var newNavItem = '<li><a href="jobs.html" class="waves-effect"><i class="material-icons">work</i> Find Jobs</a></li>';
                sidebar.append(newNavItem);
                var newNavItem = '<li><a href="findme.html" class="waves-effect"><i class="material-icons">edit_location</i>Find Me</a></li>';
                sidebar.append(newNavItem);
                var newNavItem = '<li><a href="myjobs.html" class="waves-effect"><i class="material-icons">playlist_add</i> Saved Jobs</a></li>';
                sidebar.append(newNavItem);
            } else {
                var githubIcon = '<i class="fa fa-github-alt white-text" aria-hidden="true" style="line-height: 2.0;"></i>';
                $('#quickstart-sign-in').html(githubIcon + ' Sign in with GitHub');
                $('#auth-name').text('Dear User');
                $('#auth-avatar').attr('src', 'https://www.gravatar.com/avatar/205e460b479e2e5b48dsc07710c08d50?d=mm&s=150');
                $('#auth-status').text('Please login');

            }
            document.getElementById('quickstart-sign-in').disabled = false;
        });
        document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    }
    window.onload = function () {
        initApp();
    };