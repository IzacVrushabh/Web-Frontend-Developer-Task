import React from "react";

const FilterSort = () => {
  return (
    <>
      <div className="col-md-4 w-50">
        <label className="d-flex">
          Sort by
          <select className="form-control">
            <option value="">Select</option>
            <option value="lowestprice">Lowest to highest Order</option>
            <option value="highestprice">Highest to lowest Order</option>
            <option value="lowestweight">Lowest to highest weight</option>
            <option value="highestweight">Highest to lowest weight</option>
          </select>
        </label>
      </div>

      <div className="col-md-4 w-50 ml-3">
        <label className="d-flex">
        Filter
          <select className="form-control ml-2">
            <option value="">ALL</option>
            <option value="height">Height</option>
            <option value="types">Types</option>
            <option value="moves">Moves</option>
          </select>
        </label>
      </div>
    </>
  );
};

export default FilterSort;
