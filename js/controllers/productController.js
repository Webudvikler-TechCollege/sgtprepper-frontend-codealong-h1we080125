import { getDetails, getList } from "../models/productModel.js";
import { ProductDetailsView, ProductListView } from "../views/organisms/productViews.js";
import { Layout } from "./layoutController.js";

// Funktion der styrer hvilken produktside der skal vises
export const ProductPage = async () => {
    // Henter værdier fra URL'en (fx ?category=mad&product=123)
    const { category = 'vand-og-vandrensning', product } = Object.fromEntries(new URLSearchParams(location.search));
    let html = ''

    // Hvis der IKKE er valgt et specifikt produkt → vis produktliste
    if (!product) {
        html = ProductList()
    } 
    // Ellers → vis detaljer for det valgte produkt
    else {
        html = ProductDetails(product)
    }

    // Returnerer det færdige HTML-indhold til siden
    return html
}

// Funktion der viser en liste af produkter indenfor en kategori
export const ProductList = async () => {
    // Finder kategori fra URL’en (eller bruger standardkategori)
    const { category = 'vand-og-vandrensning' } = Object.fromEntries(new URLSearchParams(location.search));

    // Henter produktdata fra API’et
    const data = await getList(category)

    // Tilføjer tekst og farve baseret på om produktet er på lager
    const formattedProducts = data.map(item => ({
        ...item,
        stockText: item.stock ? 'På lager' : 'Forventes på lager indenfor få uger',
        stockClass: item.stock ? 'text-green-600' : 'text-red-600'
    }))

    // Laver HTML for produktlisten
    const html = ProductListView(formattedProducts, category)

    // Pakker det hele ind i layoutet (header, footer osv.)
    const layout = Layout('Produkter', html)    

    // Returnerer den færdige side
    return layout
}

// Funktion der viser detaljer om ét specifikt produkt
export const ProductDetails = async (product) => {
    // Henter detaljer om det valgte produkt fra API’et
    const data = await getDetails(product)

    // Laver HTML for produktdetaljerne
    const html = ProductDetailsView(data)

    // Pakker ind i layout (uden titel)
    const layout = Layout('', html)

    // Returnerer hele siden klar til visning
    return layout
}