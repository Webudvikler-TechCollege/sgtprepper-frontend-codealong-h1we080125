import { deleteSessionItem } from "../../services/auth.js"
import { Button, Div, Form, Paragraph } from "../atoms/index.js"
import { FormGroup } from "../molecules/index.js"

export const LoginFormView = () => {
    const form = Form('POST')
    const username = FormGroup('Brugernavn', 'username', 'Indtast dit brugernavn', 'text')
    const password = FormGroup('Adgangskode', 'password', 'Indtast dit password', 'password')
    const button = Button('Send')
    form.append(username, password, button)
    return form
}

export const UserInfoView = (user) => {
    const element = Paragraph()
    element.innerText = `Velkommen ${user.firstname}`
    const logout = Button('Log ud', 'button')
    logout.addEventListener('click', () => {
        deleteSessionItem('sgtprepper_token')
        if(location.hash === '#/login') {
            location.reload()
        } else {
            location.href = './index.htm#/login'
        }
        
    })
    element.append(logout)
    return element
}