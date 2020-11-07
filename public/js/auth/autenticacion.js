class Autenticacion {
    autEmailPass(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
            if (result.user.emailVerified) {
                $('#avatar').attr('src', 'imagenes/usuario_auth.png');
                Materialize.toast(`Bienvenido ${result.user.displayName}`, 5000);
            } else {
                firebase.auth().signOut();
                Materialize.toast(
                    `Por favor realiza la verificación de la cuenta`,
                    5000
                );
            }
        });

        $('.modal').modal('close');
    }

    crearCuentaEmailPass(email, password, nombres) {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(result => {
                result.user.updateProfile({
                    displayName: nombres
                });

                // https://devfko-firebase-platzi.firebaseapp.com/
                const configuracion = {
                    url: 'http://localhost:3000/'
                };

                result.user.sendEmailVerification(configuracion).catch(error => {
                    console.error(error);
                    Materialize.toast(error.message, 4000);
                });

                firebase.auth().signOut();

                Materialize.toast(
                    `Bienvenido ${nombres}, debes realizar el proceso de verificación`,
                    4000
                );

                $('.modal').modal('close');
            })
            .catch(error => {
                console.error(error);
                Materialize.toast(error.message, 4000);
            });
    }

    authCuentaGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(result => {
                $('#avatar').attr('src', result.user.photoURL);
                $('.modal').modal('close');
                Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000);
            })
            .catch(error => {
                console.error(error);
                Materialize.toast(`Error al autenticarse con google: ${error} `, 4000);
            });
    }

    authCuentaFacebook() {
        const provider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(provider).then(result => {
                console.log({ result });
                $('#avatar').attr('src', result.user.photoURL);
                $('.modal').modal('close');
                Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000);
            })
            .catch(error => {
                console.error(error);
                Materialize.toast(`Error al autenticarse con facebook: ${error} `, 4000);
            });
    }

    authCuentaTwitter() {
        var provider = new firebase.auth.TwitterAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;
            var secret = result.credential.secret;
            var user = result.user;

            // console.log({ result });
            $('#avatar').attr('src', user.photoURL);
            $('.modal').modal('close');
            Materialize.toast(`Bienvenido ${user.displayName} !! `, 4000);
        }).catch(function(error) {
            console.log(error);
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
    }

    forgetPassword() {
        var auth = firebase.auth();
        var emailAddress = "limonadapalagripa@gmail.com";

        const configuracion = {
            url: 'http://localhost:3000/'
        };

        auth.sendPasswordResetEmail(emailAddress, configuracion).then(function() {

            Materialize.toast(`Mensaje enviado, por favor verifica tu bandeja de entrada`, 4000);
            $('.modal').modal('close');
        }).catch(function(error) {
            Materialize.toast(`Error al realizar SignOut => ${error}`, 4000);
        });
    }
}