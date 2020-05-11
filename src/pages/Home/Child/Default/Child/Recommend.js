import React from 'react';
import Lists from 'pages/Home/components/Lists';
const recommendLists = [
  {
    text:
      'In a list, you should ensure the Divider is rendered as an <li> to match the HTML5 specification.'
  },
  {
    text:
      'In a list, you should ensure the Divider is rendered as an <li> to match the HTML5 specification.'
  },
  {
    text:
      'In a list, you should ensure the Divider is rendered as an <li> to match the HTML5 specification.'
  },
  {
    text:
      'In a list, you should ensure the Divider is rendered as an <li> to match the HTML5 specification.'
  },
  {
    text:
      'In a list, you should ensure the Divider is rendered as an <li> to match the HTML5 specification.'
  }
];
export default function ListDividers() {
  return <Lists lists={recommendLists}></Lists>;
}
