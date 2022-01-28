import {
  Categories,
  CategoriesTitle,
  AllItemsByCategories,
  AllItemsByCategoriesTitle,
} from '../types/categories'

export const codeOptions = [{ value: '', label: '---' },
  { value: AllItemsByCategories.BIQUINI, label: AllItemsByCategoriesTitle.BIQUINI },
  { value: AllItemsByCategories.BLUSA, label: AllItemsByCategoriesTitle.BLUSA },
  { value: AllItemsByCategories.BODY, label: AllItemsByCategoriesTitle.BODY },
  { value: AllItemsByCategories.BOLSA, label: AllItemsByCategoriesTitle.BOLSA },
  { value: AllItemsByCategories.BRINCO, label: AllItemsByCategoriesTitle.BRINCO },
  { value: AllItemsByCategories.CALCA, label: AllItemsByCategoriesTitle.CALCA },
  { value: AllItemsByCategories.CINTO, label: AllItemsByCategoriesTitle.CINTO },
  { value: AllItemsByCategories.COLAR, label: AllItemsByCategoriesTitle.COLAR },
  { value: AllItemsByCategories.CONJUNTO, label: AllItemsByCategoriesTitle.CONJUNTO },
  { value: AllItemsByCategories.CROPPED, label: AllItemsByCategoriesTitle.CROPPED },
  { value: AllItemsByCategories.MACACAO, label: AllItemsByCategoriesTitle.MACACAO },
  { value: AllItemsByCategories.MACAQUINHO, label: AllItemsByCategoriesTitle.MACAQUINHO },
  { value: AllItemsByCategories.RASTEIRINHA, label: AllItemsByCategoriesTitle.RASTEIRINHA },
  { value: AllItemsByCategories.SAIA, label: AllItemsByCategoriesTitle.SAIA },
  { value: AllItemsByCategories.SHORT, label: AllItemsByCategoriesTitle.SHORT },
  { value: AllItemsByCategories.TENIS, label: AllItemsByCategoriesTitle.TENIS },
  { value: AllItemsByCategories.VESTIDO, label: AllItemsByCategoriesTitle.VESTIDO },
]

export const categoryOptions = [{ value: '', label: '---' },
  { value: Categories.ACCESSORIES, label: CategoriesTitle.ACCESSORIES },
  { value: Categories.CLOTHES, label: CategoriesTitle.CLOTHES },
  { value: Categories.FOOTWEAR, label: CategoriesTitle.FOOTWEAR },
  { value: Categories.KIDS, label: CategoriesTitle.KIDS },
  { value: Categories.PLUS_SIZE, label: CategoriesTitle.PLUS_SIZE },
]