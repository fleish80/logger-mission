export interface Country {
    name: {
        common: string;
        official: string;
    },
    capital: string[],
    region: string;
    subregion: string;
    population: number;
    fifa: string;
    flags :{
        svg: string;
        alt: string;
     },
     coatOfArms: {
        svg: string;
     },
     independent: boolean;
     unMember: boolean;
}