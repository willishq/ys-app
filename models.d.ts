interface Category {
    id: string;
    name: string;
    parent: string;
    slug: string;
    nesting: string;
}

interface PrimaryCategory extends Category {
    children: Array<Category>;
    colour: ColourTheme;
}

type Point = {
    lat: number;
    lng: number;
};

interface Locality {
    name: string;
    slug: string;
    point: Point;
    stateName?: string;
    population: number;
}

interface DirectoryItem {
    title: string;
    image?: string;
    slug: string;
    description?: string;
    categories: Array<string>;
    provider?: Omit<DirectoryItem, 'provider'>;
}

interface ColourTheme {
    bg: string;
    bgDark: string;
    text: string;
    border: string;
    divide: string;
    button: string;
    buttonReverse: string;
    hoverBg: string;
    hoverLightBg: string;
    hoverText: string;
}

interface Provider {
    title: string;
    description: string;
    slug: string;
    image: string;
    categories: Array<string>;
    places: Array<Place>;
    services: Array<Service>;
}

interface Service {
    title: string;
    description: string;
    features: Array<string>;
}
interface Place {
    id: string,
    name: string,
    locality: string,
    postcode: string,
    address: string[],
    point?: Point,
    country: string,
}
