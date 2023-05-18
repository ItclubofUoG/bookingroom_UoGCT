function checkPassword() {
    const frmChangePass = document.frmChangePassword
    const passwordNew = frmChangePass.passwordNew.value
    const passwordConfirm = frmChangePass.passwordConfirm.value
    const numberOfInput = document.getElementsByClassName('input').length

    if (numberOfInput == 3) {
        const oldPass = frmChangePass.oldPass.value
        if (oldPass == '') {
            Swal.fire({
                title: 'The Warning',
                text: 'Please do not leave any fields blank!',
                icon: 'warning',
                confirmButtonColor: '#003399'
            })
            return false
        }
    }

    if (passwordNew == '' || passwordConfirm == '') {
        Swal.fire({
            title: 'The Warning',
            text: 'Please do not leave any fields blank!',
            icon: 'warning',
            confirmButtonColor: '#003399'
        })
        clearText(passwordNew, passwordConfirm)

        return false
    } else if (passwordNew != passwordConfirm) {
        Swal.fire({
            title: 'The Warning',
            text: 'Passwords do not match!',
            icon: 'warning',
            confirmButtonColor: '#003399'
        })
        clearText()

        return false
    } else if (containsOnlyNumbers(passwordNew)) {
        const errPassNew = document.getElementById('errPassNew');
        errPassNew.innerHTML = "* Password must include numbers and characters";
        clearText()

        return false
    } else if (passwordNew.length < 5) {
        const errPassNew = document.getElementById('errPassNew');
        errPassNew.innerHTML = "* Password must be greater than 5 characters";
        clearText()
        return false
    }

    return true
}

function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
}

function clearText() {
    const clearPasswordNew = document.getElementById('passwordNew')
    const clearPasswordConfirm = document.getElementById('passwordConfirm')
    clearPasswordNew.value = ""
    clearPasswordConfirm.value = ""
}

function checkLogout() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn',
            cancelButton: 'btn btn-secondary me-3'
        },
        buttonsStyling: true
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure to logout?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Logout',
        confirmButtonColor: '#003399',
        cancelButtonText: 'Cancel',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '/logout'
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {

        }
    })
}