const getAllCategories = async () => {
  try {
    const response = await fetch("http://localhost:5001/api/category", {
      method: "GET",
    });
    const category = await response.json();
    return category;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

const addCategory = async () => {};

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

export { getCategoryMap };
