import {v4 as uuid} from "uuid";

const snacksList = {
  Pocky: {
    id: uuid(),
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pocky-2-01-1-1476473279.jpg",
  },
  HelloPanda: {
    id: uuid(),
    image: "https://m.media-amazon.com/images/I/81Oh88h7yNL._SL1500_.jpg",
  },
  YanYanStick: {
    id: uuid(),
    image: "https://cf.shopee.com.my/file/4631300b72b33f6e0b5bf598a8ae9ac9",
  },
};

export default snacksList;