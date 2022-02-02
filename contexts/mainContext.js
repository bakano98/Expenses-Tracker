// Used to provide the context for daily mood tracking
import { createContext } from "react";

const contentContext = createContext({
  // this keeps track of everything stored so far
  // Note, content stores objects. These objects are like this:
  // { price: $$$,
  //   category: testCategory,
  //   description: some desc
  // }
  content: [
    {
      price: "",
      category: "",
      description: "",
    },
  ],
  setContent: (d) => [...content, d],
});

export default contentContext;
