function registrarUsuario()
{
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    const data = {
        email : email,
        password : password
    }

    // fetch("/users",{
    //     method: "GET",
    //     body: JSON.stringify(data),
    //     headers: {
    //       "Accept": "application/json",
    //       "Content-Type": "application/json",
    //     }
    // })
    // .then((res) => {
    //     console.log(res.status)
    // })
    // .catch()


    fetch("/users",{
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
    })
    .then((res) => {
        console.log(res.status)
    })
    .catch()
}

function login()
{
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    const data = {
        email : email,
        password : password
    }

    fetch("/users/login",{
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
    })
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        console.log(data)

        if(data.logged && data.token)
        {
            localStorage.setItem("userToken", data.token);
        }
    })
    .catch()
}


function logOut()
{

    const userToken = localStorage.getItem("userToken")
    if(!userToken)
    {
        return window.location.href = "/Usuarios/login.html";
    }

    fetch("/users/logout",{
        method: "GET",
        headers: {
            "Authorization": "Bearer " + userToken
        }
    })
    .then((res) => {
        localStorage.removeItem("userToken")
        window.location.href = "/Usuarios/login.html";
    })
    .catch()
}