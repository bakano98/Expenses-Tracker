// Used to provide the context for daily mood tracking
import { createContext } from "react";

const dateSpendingContext = createContext({
  // this keeps track of everything stored so far
  // Will need to add date as well, so we can parse by date
  // Note, content stores objects. These objects are like this:
  // { price: $$$,
  //   category: testCategory,
  //   description: some desc
  // }
  content: [
    {
      date: "",
      month: "",
      spendings: "",
    },
  ],
  setSpendingContent: (d) => [...content, d],
});

export default dateSpendingContext;
