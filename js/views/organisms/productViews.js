import { price2Dkk } from "../../utils/index.js";
import { Div, Fragment, Heading, Image, Link, Paragraph } from "../atoms/index.js"

export const ProductListView = (products, category) => {
    // Opretter fragment (blank html tag)
    const element = Fragment()

    products.forEach(product => {
        // Destructure assignment fra product object
        const { imageUrl, name, price, slug, stockText, stockClass, teaser } = product

        // Opretter link box element
        const linkBox = Link(`?category=${category}&product=${slug}`,'', 'block mb-4 p-4 border rounded flex justify-between')

        // Image kolonne
        const imgCol = Div('pr-4')        
        const img = Image(`http://localhost:4000${imageUrl}`, name, 'max-w-[200px]')
        img.loading = 'lazy'
        imgCol.append(img)

        // Info kolonne
        const infoCol = Div('flex-1 min-w-0')
        const h2 = Heading(name,2)
        const p = Paragraph()
        p.innerHTML = teaser
        infoCol.append(h2, p)

        // Pris og lager kolonne
        const priceCol = Div('shrink-0 w-[200px] text-right')
        const priceText = Paragraph('text-xl font-bold')
        priceText.textContent = price2Dkk(price)
        const stockTxt = Paragraph(stockClass)
        stockTxt.textContent = stockText
        priceCol.append(priceText, stockTxt)

        // Tilføjer tre kolonner til link box
        linkBox.append(imgCol, infoCol, priceCol)

        // Tilføjer link box til fragment element
        element.append(linkBox)
    });
    return element

}

export const ProductDetailsView = (product) => {
    const { id, name, imageUrl, description, price } = product
    
    const element = Div('flex justify-between gap-4 p-4 border rounded-lg')

    const imageCol = Div('shrink-0 w-[120px]')
    const img = Image(`http://localhost:4000${imageUrl}`, name, 'w-[80px] flex-shrink-0 rounded')
    imageCol.append(img)

    const infoCol = Div('flex-1 min-w-0')
    const h3 = Heading(name,3,'font-bold')
    infoCol.append(h3)

    const p = Paragraph()
    p.innerHTML = description
    infoCol.append(p)

    const priceCol = Div('text-2xl')
    priceCol.innerHTML = price2Dkk(price)

    element.append(imageCol, infoCol, priceCol)
    return element
    
}