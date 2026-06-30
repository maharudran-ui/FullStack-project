import Stamp1 from "../assets/images/Stamp1.jpg";
import Stamp2 from "../assets/images/Stamp2.jpg";
import Stamp3 from "../assets/images/Stamp3.jpg";
import Stamp4 from "../assets/images/Stamp4.jpg";
import Stamp5 from "../assets/images/Stamp5.jpg";
import Stamp6 from "../assets/images/Stamp6.jpg";
import Stamp7 from "../assets/images/Stamp7.jpg";
import Stamp8 from "../assets/images/Stamp8.jpg";
import Stamp9 from "../assets/images/Stamp9.jpg";
import Stamp10 from "../assets/images/Stamp10.jpg";
import Stamp11 from "../assets/images/Stamp11.jpg";
import Stamp12 from "../assets/images/Stamp12.jpg";
import Stamp13 from "../assets/images/Stamp13.jpg";
import Stamp14 from "../assets/images/Stamp14.jpg";
import Stamp15 from "../assets/images/Stamp15.jpg";
import Stamp16 from "../assets/images/Stamp16.jpg";
import Stamp17 from "../assets/images/Stamp17.jpg";
import Stamp18 from "../assets/images/Stamp18.jpg";
import Stamp19 from "../assets/images/Stamp19.jpg";
import Stamp20 from "../assets/images/Stamp20.jpg";

const stockProducts = [
  {
    id: 1,
    year: "1912",
    price: 8,
    title: "large GEORGETOWN ST VINCENT B.W.I. village cds cancel",
    description: "on 2d",
    image: Stamp1,
    section: "stock" 
  },
  {
    id: 2,
    year: "1910",
    price: 3,
    title: "LAYOU ST VINCENT B.W.I. C AP 26 10 large cds village postmark",
    description: "with code letter s/ways on Arms 1d. Faults",
    image: Stamp2,
    section: "stock" 
  },
  {
    id: 3,
    year: "1910",
    price: 15,
    title: "LAYOU ST VINCENT B.W.I. C MY 23 10 large cds village postmark",
    description: "with code letter s/ways on GV 3d.",
    image: Stamp3,
    section: "stock"
  },
  {
    id: 4,
    year: "1910",
    price: 5,
    title: "STUBBS C OC ? 10 small St Vincent cds village cancel",
    description: "on Arms ½d.",
    image: Stamp4,
    section: "stock" 
  },
  {
    id: 5,
    year: "1920",
    price: 16,
    title: "BARROUALLIE ST VINCENT C MY 27 20 large cds village cancel",
    description: "on GV 1d",
    image: Stamp5,
    section: "stock"
  },
  {
    id: 6,
    year: "1909",
    price: 4,
    title: "BARROUALLIE ST VINCENT C JY 21 large cds",
    description: "on EDVII ½d Arms.",
    image: Stamp6,
    section: "stock"
  },
  {
    id: 7,
    year: "1907",
    price: 10,
    title: "BEQ AU 17 7 abbreviated St Vincent village postmark (Bequia)",
    description: "on Arms 1d.",
    image: Stamp7,
    section: "stock"
  },
  {
    id: 8,
    year: "1909",
    price: 12,
    title: "STUBBS C OC ? 10 small St Vincent cds village cancel",
    description: "on Arms ½d.",
    image: Stamp8,
    section: "stock"
  },
  {
    id: 9,
    year: "1910",
    price: 9,
    title: "STUBBS C OC ? 10 small St Vincent cds village cancel",
    description: "on Arms ½d.",
    image: Stamp9,
    section: "stock"
  },
  {
    id: 10,
    year: "1910",
    price: 18,
    title: "STUBBS C OC ? 10 small St Vincent cds village cancel",
    description: "on Arms ½d.",
    image: Stamp10,
    section: "stock"
  },
  {
    id: 11,
    year: "1910",
    price: 34,
    title: "STUBBS C OC ? 10 small St Vincent cds village cancel",
    description: "on Arms ½d.",
    image: Stamp11,
    section: "stock"
  },
  {
    id: 12,
    year: "1910",
    price: 65,
    title: "STUBBS C OC ? 10 small St Vincent cds village cancel",
    description: "on Arms ½d.",
    image: Stamp12,
    section: "stock"
  },
  {
    id: 13,
    year: "1910",
    price: 76,
    title: "STUBBS C OC ? 10 small St Vincent cds village cancel",
    description: "on Arms ½d.",
    image: Stamp13,
    section: "stock"
  },
  {
    id: 14,
    year: "1910",
    price: 3,
    title: "STUBBS C OC ? 10 small St Vincent cds village cancel",
    description: "on Arms ½d.",
    image: Stamp14,
    section: "stock"
  },
  {
    id: 15,
    year: "1910",
    price: 65,
    title: "STUBBS C OC ? 10 small St Vincent cds village cancel",
    description: "on Arms ½d.",
    image: Stamp15,
    section: "stock"
  },
  {
    id: 16,
    year: "1910",
    price: 22,
    title: "STUBBS C OC ? 10 small St Vincent cds village cancel",
    description: "on Arms ½d.",
    image: Stamp16,
    section: "stock"
  },
  {
    id: 17,
    year: "1910",
    price: 11,
    title: "STUBBS C OC ? 10 small St Vincent cds village cancel",
    description: "on Arms ½d.",
    image: Stamp17,
    section: "stock"
  },
  {
    id: 18,
    year: "1910",
    price: 21,
    title: "STUBBS C OC ? 10 small St Vincent cds village cancel",
    description: "on Arms ½d.",
    image: Stamp18,
    section: "stock"
  },
  {
    id: 19,
    year: "1910",
    price: 22,
    title: "STUBBS C OC ? 10 small St Vincent cds village cancel",
    description: "on Arms ½d.",
    image: Stamp19,
    section: "stock"
  },
  {
    id: 20,
    year: "1910",
    price: 25,
    title: "STUBBS C OC ? 10 small St Vincent cds village cancel",
    description: "on Arms ½d.",
    image: Stamp20,
    section: "stock"
  }
];


for (let i = 1; i <= 80; i++) {
  stockProducts.push({
    id: 100 + i,
    year: (1900 + (i % 15)).toString(),
    price: 3 + (i % 25),
    title: `Unique Stamp Item ${i}`,
    description: `Different stamp description ${i}`,
    category: "Stamps and Covers",
    image: stockProducts[i % 20].image,
    section: "stock",
  });
}

export default stockProducts;