import { Heading } from "../atoms/index.js"

export const HeaderView = () => {
    const element = document.createElement('header')
    element.className = 'bg-slate-500 p-4 text-white'
    const h1 = Heading('Sgt. Prepper')
    element.append(h1)
    return element
}

export const MainView = (title, content) => {
    const element = document.createElement('main')
    element.className = "p-4"
    const h1 = Heading(title)
    element.append(h1, content)
    return element
}

export const FooterView = () => {
    const element = document.createElement('footer')
    element.className = "bg-slate-500 p-4"
    element.innerHTML = `&copy; TECHCOLLEGE 2025`
    return element
}
