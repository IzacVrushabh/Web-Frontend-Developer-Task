import React from "react";

const FilterSort = (props) => {
  //Need Proper implementation...
  //work on it...
  //watch some videos...
  //add some material cards..
  //use their feature
  return (
    <>
      <section>
        <div className="col-md-4 w-50">
          <label className="d-flex">
            Sort by values..
            {/* //pass proper values.. */}
            <select
              value={props.sort}
              onChange={props.sortPokemon}
              className="ml-2"
            >
              {/* empty value */}
              <option value="">Select</option>
              <option value="lowest">Lowest to highest</option>
              <option value="highest">Highest to lowest</option>
            </select>
          </label>
        </div>
      </section>
  {/* include all option */}
      <div className="col-md-4 w-50 ml-3">
        <label className="d-flex">
          Filter
          {/* check values  */}
          <select
            value={props.filter_list}
            onChange={props.filterPokemon}
            className="ml-2"
          >
            <option value="">ALL</option>
            <option value="height">Height</option>
            <option value="types">Types</option>
            <option value="moves">Moves</option>
          </select>
        </label>
      </div>
      <div className="filter-result">
        <h3> {props.count} Pokemons</h3>
      </div>
      <div className="col-md-4 w-50 ml-3">
        <label className="d-flex">
          Category
          {/* check values  */}
          <select
            value={props.filter_list}
            onChange={props.filterPokemon}
            className="ml-2"
          >
            <option value="">ALL</option>
            <option value="Name">Name</option>
            <option value="Order">Order</option>
            <option value="Power">Power</option>
          </select>
        </label>
      </div>
      <div className="filter-result">
        <h3> {props.count} Pokemons</h3>
      </div>
    </>
  );
};

export default FilterSort;
