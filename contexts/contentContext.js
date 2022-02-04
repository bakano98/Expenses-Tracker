// Used to provide the context for daily mood tracking
import { createContext } from "react";

const contentContext = createContext({
  // this keeps track of everything stored so far
  // Will need to add date as well, so we can parse by date
  // Note, content stores objects. These objects are like this:
  // { price: $$$,
  //   category: testCategory,
  //   description: some desc
  // }
  content: [
    {
      price: "",
      category: "",
      date: "",
      description: "",
    },
  ],
  setContent: (d) => [...content, d],
});

export default contentContext;
