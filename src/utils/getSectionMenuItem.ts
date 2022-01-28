import { CategoriesTitle, Categories, Clothes, Accessories, Footwear, PlusSize } from '../types/categories'

export const getSectionMenuItem = (category: keyof typeof CategoriesTitle) => {

  if(category === Categories.CLOTHES) {
    return Object.entries(Clothes).map(item => ({ value: item[0], label: item[1] }))
  }
  if(category === Categories.ACCESSORIES) {
    return Object.entries(Accessories).map(item => ({ value: item[0], label: item[1] }))
  }
  if(category === Categories.FOOTWEAR) {
    return Object.entries(Footwear).map(item => ({ value: item[0], label: item[1] }))
  }
  if(category === Categories.PLUS_SIZE) {
    return Object.entries(PlusSize).map(item => ({ value: item[0], label: item[1] }))
  }
}