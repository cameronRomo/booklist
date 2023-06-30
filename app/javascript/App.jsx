import React, { useState } from "react";
import { default as UUID } from "node-uuid";

export default function App() {
  const [books, setBooks] = useState([]);
  const [action, setAction] = useState("list");
  const [formData, setFormData] = useState({ title: "", author: "" });
  const [currentBookId, setCurrentBookId] = useState(null);

  const saveBook = (e) => {
    e.preventDefault();

    if (currentBookId) {
      bookIndex = books.findIndex((book) => book.id === currentBookId);
      updateBooks = [...books];
      updatedBooks[bookIndex] = formData;
      setBooks(updatedBooks);
      setCurrentBookId(null);
    } else {
      setBooks([...books, { ...formData, id: UUID.v4() }]);
    }

    setFormData({ title: "", author: "", id: "" });
    setAction("list");
  };

  const editBook = (id) => {
    const currentBook = books.find((book) => book.id === id);
    setCurrentBookId(id);
    setFormData({
      ...formData,
      title: currentBook.title,
      author: currentBook.author,
    });
    setAction("form");
  };

  const deleteBook = (id) => setBooks(books.filter((book) => book.id !== id));

  return (
    <>
      <h1>Books {books.length}</h1>
      {action === "list" ? (
        <div>
          <button onClick={() => setAction("form")}>Add a Book</button>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>
              {books &&
                books.map(({ id, title, author }) => (
                  <tr key={id}>
                    <td>{title}</td>
                    <td>{author}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <form action="">
            <label>Title:</label>
            <input
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <label>Author:</label>
            <input
              name="author"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
            />
            <button onClick={(e) => saveBook(e)}>Submit</button>
            <button onClick={() => setAction("list")}>Back</button>
          </form>
        </div>
      )}
    </>
  );
}
