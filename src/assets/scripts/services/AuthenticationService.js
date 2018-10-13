
class AuthenticationService {

  signUp(name, email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 5000);

    })
  }
}

export default AuthenticationService