import slugify from "slugify";


export default function slugifyWithSlashes(myString) {
    if (!myString)
     return "";
    return myString.replace("tab:", "").split('/').map((val) => slugify(val, {lower: true})).join('/');
   }

