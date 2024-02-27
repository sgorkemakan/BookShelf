import { useState } from "react";
import { useBooksQuery } from "../features/booksApi";
import { FaCartPlus } from "react-icons/fa";
import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../features/shopSlice";

function Home() {
  const { data } = useBooksQuery();
  const [search, setSearch] = useState("");
  const [sortData, setSortData] = useState("");

  const dispatch = useAppDispatch();

  const books =
    sortData === "low"
      ? data && data.slice().sort((a, b) => a.price - b.price)
      : sortData === "high"
      ? data && data.slice().sort((a, b) => b.price - a.price)
      : sortData === "a-z"
      ? data && data.slice().sort((a, b) => (a.title > b.title ? 1 : -1))
      : sortData === "z-a"
      ? data && data.slice().sort((a, b) => (b.title > a.title ? 1 : -1))
      : sortData === "default"
      ? data
      : data;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortData(e.target.id);
  };

  return (
    <div className="container-lg py-4">
      <div className="input-group mb-3">
        <input
          type="search"
          placeholder="Search..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          className="form-control"
          aria-label="Text input with dropdown button"
        />
        <button
          className="btn btn-danger dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Sort By
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          <li className="dropdown-item">
            <div className="form-check">
              <label htmlFor="default" className="form-check-label">
                Default
              </label>
              <input
                type="radio"
                id="default"
                value={sortData}
                onChange={handleChange}
                name="sort"
                className="form-check-input"
              />
            </div>
          </li>
          <hr className="dropdown-divider" />
          <li className="dropdown-item">
            <div className="form-check">
              <label htmlFor="low" className="form-check-label">
                Price (Lowest)
              </label>
              <input
                type="radio"
                id="low"
                value={sortData}
                onChange={handleChange}
                name="sort"
                className="form-check-input"
              />
            </div>
          </li>
          <li className="dropdown-item">
            <div className="form-check">
              <label htmlFor="high" className="form-check-label">
                Price (Highest)
              </label>
              <input
                type="radio"
                id="high"
                value={sortData}
                onChange={handleChange}
                name="sort"
                className="form-check-input"
              />
            </div>
          </li>
          <li className="dropdown-item">
            <div className="form-check">
              <label htmlFor="a-z" className="form-check-label">
                A-Z
              </label>
              <input
                type="radio"
                id="a-z"
                value={sortData}
                onChange={handleChange}
                name="sort"
                className="form-check-input"
              />
            </div>
          </li>
          <li className="dropdown-item">
            <div className="form-check">
              <label htmlFor="z-a" className="form-check-label">
                Z-A
              </label>
              <input
                type="radio"
                id="z-a"
                value={sortData}
                onChange={handleChange}
                name="sort"
                className="form-check-input"
              />
            </div>
          </li>
        </ul>
      </div>

      <div className="row">
        {books &&
          books
            .filter((items) => {
              return search.toLocaleLowerCase() === ""
                ? items
                : items.title.toLocaleLowerCase().includes(search);
            })
            .map((book) => (
              <div key={book.id} className="col-md-6 col-lg-4 text-center">
                <div className="py-4">
                  <img
                    src={book.imgUrl}
                    alt={book.title}
                    width={230}
                    height={360}
                    className="rounded"
                  />{" "}
                  <h3 className="fs-5 my-4">{book.title}</h3>
                  <h2 className="lead fw-bold fs-4 my-2">${book.price}</h2>
                  <button
                    className="btn btn-danger text-decoration-none ms-2 my-4"
                    onClick={() => dispatch(addToCart(book))}
                  >
                    <FaCartPlus className="me-2 fs-5" /> Add To Cart
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Home;
