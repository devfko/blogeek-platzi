$(() => {
    const objAuth = new Autenticacion();

    $('#btnRegistroEmail').click(() => {
        const nombres = $('#nombreContactoReg').val();
        const email = $('#emailContactoReg').val();
        const password = $('#passwordReg').val();
        const auth = new Autenticacion();
        auth.crearCuentaEmailPass(email, password, nombres);
    });

    $('#btnInicioEmail').click(() => {
        const email = $('#emailSesion').val();
        const password = $('#passwordSesion').val();
        const auth = new Autenticacion();
        auth.autEmailPass(email, password);
    });

    $('#authGoogle').click(() => objAuth.authCuentaGoogle());

    $('#authFB').click(() => objAuth.authCuentaFacebook());

    $("#authTwitter").click(() => objAuth.authCuentaTwitter());

    $('#btnRegistrarse').click(() => {
        $('#modalSesion').modal('close');
        $('#modalRegistro').modal('open');
    });

    $('#btnInicioSesion').click(() => {
        $('#modalRegistro').modal('close');
        $('#modalSesion').modal('open');
    });


    $('#btnForgetPassword').click(() => objAuth.forgetPassword());
});