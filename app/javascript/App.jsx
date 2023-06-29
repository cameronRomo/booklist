import React, { useState } from "react";

export default function App() {
  const [books, setBooks] = useState([]);

  return (
    <>
      <h1>Books {books.length}</h1>
    </>
  );
}
