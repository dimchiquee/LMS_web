import ak from "../images/ak_redline.png";
import awp from "../images/awp_asiimov.png";
import m4 from "../images/m4_decimator.png";
import deagle from "../images/deagle_blaze.png";
import usp from "../images/usp_kill.png";
import glock from "../images/glock_water.png";

export type Skin = {
  id: number;
  name: string;
  weapon: string;
  weaponType: string;
  rarity: string;
  collection: string;
  price: number;
  wear: string;
  statTrak: boolean;
  source: string;
  releaseYear: number;
  popularity: number;
  image: string;
  description: string;
};

export const skins: Skin[] = [
  {
    id: 1,
    name: "AK-47 | Redline",
    weapon: "AK-47",
    weaponType: "Rifle",
    rarity: "Classified",
    collection: "Phoenix Collection",
    price: 42,
    wear: "Field-Tested",
    statTrak: true,
    source: "Case",
    releaseYear: 2014,
    popularity: 95,
    image: ak,
    description: "Популярный скин для AK-47 с тёмным корпусом и красными линиями.",
  },
  {
    id: 2,
    name: "AWP | Asiimov",
    weapon: "AWP",
    weaponType: "Sniper Rifle",
    rarity: "Covert",
    collection: "Phoenix Collection",
    price: 125,
    wear: "Battle-Scarred",
    statTrak: true,
    source: "Case",
    releaseYear: 2014,
    popularity: 98,
    image: awp,
    description: "Один из самых известных скинов для AWP в бело-оранжевом стиле.",
  },
  {
    id: 3,
    name: "M4A1-S | Decimator",
    weapon: "M4A1-S",
    weaponType: "Rifle",
    rarity: "Classified",
    collection: "Spectrum Collection",
    price: 38,
    wear: "Minimal Wear",
    statTrak: false,
    source: "Case",
    releaseYear: 2017,
    popularity: 84,
    image: m4,
    description: "Яркий скин с неоновым оформлением для M4A1-S.",
  },
  {
    id: 4,
    name: "Desert Eagle | Blaze",
    weapon: "Desert Eagle",
    weaponType: "Pistol",
    rarity: "Restricted",
    collection: "Dust Collection",
    price: 560,
    wear: "Factory New",
    statTrak: false,
    source: "Collection",
    releaseYear: 2013,
    popularity: 92,
    image: deagle,
    description: "Классический дорогой скин с изображением пламени.",
  },
  {
    id: 5,
    name: "USP-S | Kill Confirmed",
    weapon: "USP-S",
    weaponType: "Pistol",
    rarity: "Covert",
    collection: "Shadow Collection",
    price: 90,
    wear: "Field-Tested",
    statTrak: true,
    source: "Case",
    releaseYear: 2015,
    popularity: 88,
    image: usp,
    description: "Детализированный скин для USP-S с ярким рисунком.",
  },
  {
    id: 6,
    name: "Glock-18 | Water Elemental",
    weapon: "Glock-18",
    weaponType: "Pistol",
    rarity: "Classified",
    collection: "Breakout Collection",
    price: 18,
    wear: "Minimal Wear",
    statTrak: false,
    source: "Case",
    releaseYear: 2014,
    popularity: 78,
    image: glock,
    description: "Скин с изображением водного элементаля.",
  },
];