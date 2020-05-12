import React from 'react';
import Lists from 'pages/Home/components/Lists';
const recommendLists = [
  {
    id: 0,
    text:
      'In a list, you should ensure the Divider is rendered as an <li> to match the HTML5 specification.'
  },
  {
    id: 1,

    text:
      'In a list, you should ensure the Divider is rendered as an <li> to match the HTML5 specification.'
  },
  {
    id: 2,
    text:
      'In a list, you should ensure the Divider is rendered as an <li> to match the HTML5 specification.'
  },
  {
    id: 3,
    text:
      'In a list, you should ensure the Divider is rendered as an <li> to match the HTML5 specification.'
  },
  {
    id: 4,
    text:
      'In a list, you should ensure the Divider is rendered as an <li> to match the HTML5 specification.'
  }
];
export default function ListDividers() {
  return <Lists lists={recommendLists}></Lists>;
}
