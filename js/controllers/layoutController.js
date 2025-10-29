import { Fragment } from "../views/atoms/index.js"
import { FooterView, HeaderView, MainView, NavBarView } from "../views/molecules/index.js"
import { getCategoryList } from "./categoryController.js"

// Funktion der samler hele sidens layout (header, menu, main og footer)
export const Layout = async (title, content) => {
    // Sætter fanebladets titel i browseren
    document.title = title    

    // Henter kategorier til navigationen (fx “Vand”, “Mad”, “Udstyr”)
    const arrNavItems = await getCategoryList()

    // Laver et tomt HTML-element som vi kan fylde indhold i
    const element = Fragment()

    // Tilføjer sidens dele i den rigtige rækkefølge
    element.append(
        HeaderView(),               // Topfelt (logo, evt. login)
        NavBarView(arrNavItems),    // Menu med kategorier
        MainView(title, content),   // Selve sidens indhold
        FooterView()                // Bundfelt (footer)
    )

    // Returnerer hele layoutet klar til visning
    return element
}