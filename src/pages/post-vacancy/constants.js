import { categories } from '../../components/category-cards/categories';
import { capCase } from '../../utilities/helpers';

export const CATEGORY_OPTIONS = categories.map(({ label }) => ({ value: label, text: capCase(label) }));

export const AUDITION_TYPES = ['Live', 'Recorded', 'Live & Recorded'].map(text => ({
  value: text.toLowerCase(),
  text,
}));

export const TYPES_OF_WORK = ['Full-time', 'Part-time', 'Substitute', 'Temporary', 'Festival', 'Competition'].map(
  text => ({
    text,
    value: text.toLowerCase(),
  })
);
