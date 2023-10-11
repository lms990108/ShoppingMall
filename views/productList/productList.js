// 우선 실행 코드(페이지 로드 이전에 필요한 것)
const URLMatch = new URLSearchParams(location.search); // 쿼리스트링이 있는지 없는지
let mainCategory = URLMatch.get("higherCategory");      // 상위카테고리
let subCategory = URLMatch.get("lowerCategory");       // 하위카테고리

// 둘 중에 하나라도 없으면
if (!mainCategory || !subCategory) {
  getCategoryCode(); // 실행
 
}

/* GET category List */

const getAllCategories = async () => {
  try {
    const response = await fetch("http://localhost:5001/api/category/");
    const category = await response.json();
    return category;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

// 상위, 하위 카테고리 완성 -> 페이지 이동 메서드
async function getCategoryCode() {
  
  // 전체 카테고리 조회
  const allCategory = await getAllCategories();
  // console.log(allCategory)

  if (!mainCategory) {
    const higher = allCategory.filter((item) => !item.parent); // 상위 카테고리 (parent는 기본적으로 null 인 상태)

    if (higher.length > 0) { // 상위 카테고리가 항상 있을때 동작
      if (subCategory) { // 서브 카테고리가 있으면
        const lowerID = allCategory.find((item) => item.name === subCategory); // 현재에 맞는 하위 카테고리를 찾고
        const higherID = allCategory.find((item) => item._id === lowerID.parent); // 하위 카테고리에 맞는 상위 카테고리를 찾는다.
        mainCategory = higherID.name;

      } else {
        mainCategory = higher[0].name
      }
    }
  }

  if (!subCategory) { // 하위 카테고리가 없을때
    const higherId = allCategory.find((item) => item.name === mainCategory)
    // 전체카테고리에서 상위카테고리의 id와 하위카테고리의 parent와 같을때..
    const lower = allCategory.filter((item) => item.parent && higherId._id === item.parent);
    
    if (lower.length > 0) { // 하위 카테고리가 있을때
      subCategory = lower[0].name // 기계식키보드
    }

  }
  location.replace("/products?higherCategory=" + mainCategory + "&lowerCategory=" + subCategory)

}

// 카테고리 제목 (메인 카테고리 타이틀)
document.querySelector(".main_title").innerText = mainCategory



// 하위 카테고리 찾는 메서드(탭 버튼)
const tabs = findSubCategory();
makeTabButtons(tabs); // 탭 버튼 동적 생성 메서드 호출

async function findSubCategory() {
  const allCategory = await getAllCategories();
  const higherId = allCategory.find((item) => item.name === mainCategory)
  const lower = allCategory.filter((item) => item.parent && higherId._id === item.parent);
  return lower;
}

// 탭 버튼(하위카테고리) 동적 생성 메서드
async function makeTabButtons(tabs) {
  const tabbtns = document.querySelector(".tabs");
  const list = await tabs

  list.forEach((tab) => {
    const subbtn = document.createElement("a")
    subbtn.classList.add('button')

    if (subCategory === tab.name) subbtn.classList.add('bg-primary');
    else subbtn.classList.add('bg-primary2');

    subbtn.href = "/products?higherCategory=" + mainCategory + "&lowerCategory=" + tab.name
    subbtn.innerText = tab.name
    tabbtns.appendChild(subbtn)
  })
}


getProductsList();


// 상품 목록 호출 메소드
async function getProductsList() {

  // 페이징 처리를 위한 초기값
  let page = 1;
  // 페이지에 맞는 페이지 값
  if (URLMatch.get("page")) page = Number(URLMatch.get("page"))
  
  // Response data
  const res = await fetch("/api/product/?lowerCategory=" + subCategory + "&page=" + page)

  const listdata = await res.json();
  console.log(listdata);
  
  makeProductList(listdata);

}


// 상품 목록 엘리먼트 생성 메서드
function makeProductList(listdata) {
  const list = document.querySelector('.products_container .items');

  listdata.forEach((item) => {
    const div = document.createElement("div");
    const li = document.createElement('li');
    const a = document.createElement("a");

    a.href = "/product_detail?productNumber=" + item.product_number;
    const img = document.createElement('img');
    img.src = item.main_img_url;

    const title =  document.createElement('p');
    const price = document.createElement('p');
    
    title.innerText = item.product_name;
    price.innerText = priceFormat(item.price) + '원';
    
    a.appendChild(div);
    div.appendChild(img);
    a.appendChild(title);
    a.appendChild(price);
    li.appendChild(a);
    list.appendChild(li);
  })
  
}

// 가격 콤마 표시 함수 (3자리 단위로)
function priceFormat(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
}



