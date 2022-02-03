// Used to provide the context for daily mood tracking
import { createContext } from "react";
const CONTENT = [
  {
    isExpanded: false,
    categoryName: "First",
    subcategory: [
      {
        id: 1,
        val: "First-First",
      },
      {
        id: 2,
        val: "First-Second",
      },
      {
        id: "adder",
        val: "Add new subcategory",
      },
    ],
  },
  {
    isExpanded: false,
    categoryName: "Second",
    subcategory: [
      {
        id: 3,
        val: "Second-First",
      },
      {
        id: 4,
        val: "Second-Second",
      },
      {
        id: "adder",
        val: "Add new subcategory",
      },
    ],
  },
  {
    isExpanded: false,
    categoryName: "Third",
    subcategory: [
      {
        id: 5,
        val: "Third-First",
      },
      {
        id: 6,
        val: "Third-Second",
      },
      {
        id: "adder",
        val: "Add new subcategory",
      },
    ],
  },
];
// maybe
const dataContext = createContext({
  data: CONTENT,
  setData: (d) => [...content, d],
});

export default dataContext;
