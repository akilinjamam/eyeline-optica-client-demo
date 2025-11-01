import { TLatestCollectionsData } from "@/ts-definition/interfaces";

import latest1 from "../../public/images/latesCollection/latest-collection-1.png";
import latest2 from "../../public/images/latesCollection/latest-collection-2.png";
import latest3 from "../../public/images/latesCollection/latest-collection-3.png";
import latest4 from "../../public/images/latesCollection/latest-collection-4.png";
import latest5 from "../../public/images/latesCollection/latest-collection-5.png";

/* 
[
  'square',
  'cats eye',
  'horn',
  'round',
  'oval',
  'avietor',
  'rectangle'
]

*/

export const latestCollectionData: TLatestCollectionsData[] = [
  {
    image: latest1,
    type: "Round",
    value: "round",
  },
  {
    image: latest2,
    type: "Cat Eye",
    value: "cats eye",
  },
  {
    image: latest3,
    type: "Club Master",
    value: "",
  },
  {
    image: latest4,
    type: "Ractangle",
    value: "rectangle",
  },
  {
    image: latest5,
    type: "Transparent",
    value: "",
  },
];
