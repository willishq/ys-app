import {LngLatLike} from "mapbox-gl";

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

interface PlacePoint extends LngLatLike {
    lat: number;
    lng: number;
};

interface Locality {
    name: string;
    slug: string;
    point: PlacePoint;
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
    ring: string;
    divide: string;
    button: string;
    buttonReverse: string;
    hoverBg: string;
    hoverLightBg: string;
    hoverText: string;
}
type SocialLinkType = 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'whatsapp';
interface SocialLink {
    prefix: string;
    icon: {
        viewBox: string;
        path: Array<string>;
    }
}
interface OrganisationLink {
    type: SocialLinkType;
    url: string;
    value: string;
}
interface Provider {
    title: string;
    description: string;
    slug: string;
    avatar: string;
    links: Array<OrganisationLink>
    cover: string;
    categories: Array<string>;
    places: Array<Place>;
    services: Array<Service>;
    posts: Array<Post>;
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
    point?: PlacePoint,
    country: string,
}

interface Post {
    id: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    image?: string;
    categories: string[];
    provider: Provider;

}

enum PostType {
    Article = 'articles',
    Feature = 'features',
    Guide = 'guides',
}