import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './CategoryCards.module.scss';
import { categories } from './categories';

const CategoryCards = () => (
  <section className={classes.categoryGrid}>
    {categories.map(({ image, label }) => (
      <NavLink to={`find-a-job/${label}`} className={classes.categoryCard} key={label}>
        <div className={classes.imageContainer}>
          <img src={image} alt={label} />
        </div>
        <p className={classes.section}>{label}</p>
      </NavLink>
    ))}
  </section>
);

export default CategoryCards;
