// Opretter et tomt fragment (en usynlig beholder til flere HTML-elementer)
// Bruges når man vil samle flere elementer uden at lave et ekstra <div>
export const Fragment = () => {
    const element = document.createDocumentFragment()
    return element
}

// Laver et <div>-element (kan få klasser på via Tailwind eller CSS)
export const Div = (className = '') => {
    const element = document.createElement('div')
    element.className = className
    return element
}

// Laver et <p>-element (afsnit)
export const Paragraph = (className = '') => {
    const element = document.createElement('p')
    element.className = className
    return element
}

// Laver en overskrift (fx <h1>, <h2> osv.)
export const Heading = (text, num = 1, className = '') => {
    const element = document.createElement(`h${num}`)
    element.className = className
    element.textContent = text
    return element
}

// Laver en <ul> (liste)
export const Ul = (className = '') => {
    const element = document.createElement('ul')
    element.className = className
    return element
}

// Laver et <li> (listepunkt)
export const Li = (className = '') => {
    const element = document.createElement('li')
    element.className = className
    return element
}

// Laver et <a>-element (link)
export const Link = (to, text = '', className = '') => {
    const element = document.createElement('a')
    element.className = className
    element.href = to
    element.innerText = text
    return element
}

// Laver et <img>-element (billede)
export const Image = (src, title, className = '') => {
    const element = document.createElement('img')
    element.src = src
    element.className = className
    element.alt = title
    element.title = title
    return element
}

// Laver et <form>-element
export const Form = (method = 'GET') => {
    const element = document.createElement('form')
    element.method = method
    return element
}

// Laver et <label>-element (etiket til formularfelt)
// Som standard får den Tailwind-klasser og et ':' efter teksten
export const Label = (title, id, className = 'mr-4 inline-block w-[120px] after:content-[\':\']') => {
    const element = document.createElement('label')
    element.htmlFor = id
    element.innerText = title
    element.className = className
    return element
}

// Laver et <input>-element (tekstfelt, passwordfelt osv.)
export const Input = (name, placeholder, type = 'text', value = '', className = 'border rounded p-2') => {
    const element = document.createElement('input')
    element.type = type
    element.id = name
    element.name = name
    element.placeholder = placeholder
    element.value = value
    element.className = className
    element.autocomplete = true   // Browseren må foreslå tidligere input
    element.required = true       // Feltet skal udfyldes
    return element
}

// Laver et <button>-element (knap)
export const Button = (title, type = 'submit', className = 'bg-green-500 px-3 py-2 rounded-lg shadow-md shadow-inset border') => {
    const element = document.createElement('button')
    element.type = type
    element.textContent = title
    element.className = className
    return element
}