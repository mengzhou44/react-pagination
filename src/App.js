import React, { useState } from 'react';
import _ from 'lodash';
import faker from 'faker';
import Pagination from './pagination';

export default function App() {
  const  items =getItems();
  const [pageItems, setPageItems] = useState(items.slice(1,11));
  
  function getItems() {
    let array = [];
    for (var i = 1; i < 1000; i++) {
      array.push({
        id: i,
        name: faker.name.findName()
      });
    }
    return array; 
  }
  
  function renderPageItem(item) {
    return <li key={item.id}>{item.name}</li>;
  }
  return (
    <div>
      <ul>{_.map(pageItems, renderPageItem)}</ul>

      <Pagination
        items={items}
        onChangePage={pageItems => {
          setPageItems(pageItems);
        }
      }
      />
    </div>
  );
}
