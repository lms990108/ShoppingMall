const url = "http://localhost:5001";

const getAllCategories = async () => {
  try {
    const response = await fetch(`${url}/api/category`, {
      method: "GET",
    });
    const category = await response.json();
    return category;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

/* parent의 유무에 따라 상위 카테고리와 하위 카테고리를 분리하여 리턴하는 함수 */

const getCategoryMap = async () => {
  const category = await getAllCategories();
  let higher_category = category.filter((item) => item.parent === null); // 상위카테고리
  let lower_category = category.filter((item) => item.parent !== null); // 하위카테고리
  let category_map = [];
  higher_category.forEach((higherItem, idx) => {
    category_map.push({ higher_category: higherItem, lower_category: [] });
    lower_category.forEach((lowerItem) => {
      if (higherItem._id === lowerItem.parent) {
        category_map[idx].lower_category.push(lowerItem);
      }
    });
  });
  return category_map;
};

const getLowerCategory = async (higherCategory) => {
  const category = await getAllCategories();
  const target_higher = category.find((item) => item.name === higherCategory);
  return category.filter((item) => item.parent === target_higher._id);
};

const getCategoryNameFromCategoryId = async (categoryId) => {
  const category = await getAllCategories();
  const target = category.find((item) => item._id === categoryId);
  return category && target ? target.name : "";
};

export { getCategoryMap, getCategoryNameFromCategoryId, getLowerCategory };
