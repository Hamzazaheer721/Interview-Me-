export const isEmpty = value => {
    if(!value) return true
    return false
}

export const isEmail = email => {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const isLength = password => {
    if(password.length < 6) return true
    return false
}

export const isMatch = (password, cf_password) => {
    if(password === cf_password) return true
    return false
}

export const validatePassword = (pass) => {
    const re = /^(?=(.*\d){1})(?=(.*[A-Z]){1})(?=(.*[a-z]){1})(?=(.*[!@#$%]){1})[0-9a-zA-Z!@#$%]{6,12}$/;
    return re.test(pass);
}

export const validateName = (name) => {
    const re = /^[a-zA-Z0-9]{3,12}$/;
    return re.test(name);
}