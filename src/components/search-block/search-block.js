import React from "react";

import "./search-block.css";

const searchIcon = (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    className="bi bi-search"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
    />
    <path
      fillRule="evenodd"
      d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
    />
  </svg>
);

export default class SearchBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
    };

    this.input = React.createRef();
  }

  onChangeSearch = ({ target }) => {
    this.setState({ value: target.value });
  };

  onSubmitSearch = (event) => {
    event.preventDefault();
    this.props.onSearchLocation(this.input.current.value);

    this.setState({ value: "" });
  };

  render() {
    return (
      <form className='search-form' onSubmit={this.onSubmitSearch}>
        <div className="search-block form-group">
          <input
            type="text"
            placeholder="search..."
            className="form-control"
            ref={this.input}
            onChange={this.onChangeSearch}
            value={this.state.value}
          ></input>
          <button className="btn-search btn  btn-outline-secondary">
            {searchIcon}
          </button>
        </div>
      </form>
    );
  }
}
