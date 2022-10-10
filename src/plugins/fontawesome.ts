/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import specific icons */
import { } from "@fortawesome/free-brands-svg-icons";
import { } from "@fortawesome/free-regular-svg-icons";
import {
    faAlignRight, faAlignLeft, faAlignCenter, faAlignJustify,
    faBold, faItalic, faStrikethrough, faCode, faListUl, faListOl,
    faQuoteLeft, faRotateLeft, faRotateRight, faImage, faBars,
    faMagnifyingGlassPlus,
    faMagnifyingGlassMinus, 
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
export let addAllIcons = () => {
    library.add(
        faAlignRight,
        faAlignLeft,
        faAlignCenter,
        faAlignJustify,
        faBold,
        faItalic,
        faStrikethrough,
        faCode,
        faListUl,
        faListOl,
        faQuoteLeft,
        faRotateLeft,
        faRotateRight,
        faImage,
        faBars,
        faMagnifyingGlassPlus,
        faMagnifyingGlassMinus
    );
}
