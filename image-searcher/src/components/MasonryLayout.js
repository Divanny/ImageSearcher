import React from "react";
import Masonry from "react-masonry-css";

const CardGrid = ({ children }) => {
  const breakpointColumnsObj = {
    default: 5,
    1300: 4,
    1115: 3,
    800: 2,
    550: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {children}
    </Masonry>
  );
};

export default CardGrid;
