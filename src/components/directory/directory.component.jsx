import React from "react";
import CategoryItem from "../category-items/category-item.component";
import "../directory/directory.styles.scss";

const CategoriesDirectory = ({ categories }) => {
  return (
    <div className="categories-directory">
      {categories.map((category) => {
        return <CategoryItem key={category.id} category={category} />;
      })}
    </div>
  );
};

export default CategoriesDirectory;
