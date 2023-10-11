// 우선 실행 코드(페이지 로드 이전에 필요한 것)
const URLMatch = new URLSearchParams(location.search); // 쿼리스트링이 있는지 없는지
let mainCategory = URLMatch.get("higherCategory");      // 상위카테고리
let subCategory = URLMatch.get("lowerCategory");       // 하위카테고리
let maxPage = 1;    // 최대 페이지.
let nowPage = 1;    // 현재 페이지
const pageSize = 6; // 한 페이지당 호출할 상품 갯수

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

// 둘 중에 하나라도 없으면
if (!mainCategory || !subCategory) {
  getCategoryCode(); // 실행
 
}



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


if (mainCategory && subCategory) getProductsList();


// 상품 목록 호출 메소드
async function getProductsList() {

  // 페이징 처리를 위한 초기값
  let page = 1;
  // 페이지에 맞는 페이지 값
  if (URLMatch.get("page")) page = Number(URLMatch.get("page"))
  
  try {
    // Response data
    const res = await fetch("/api/product/?lowerCategory=" + subCategory + "&page=" + page + '&pageSize=' + pageSize)

    const listdata = await res.json();
    
    makeProductList(listdata.products);  // 상품 엘리먼트 생성
    makePagenation(listdata.totalCnt)  // totalCnt. 페이지 엘리먼트 생성.
  } catch(err) {
    console.log(err)
    alert('데이터 호출에 실패했습니다. 잠시 후, 다시 시도해 주세요.')
  }

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

// 페이징 생성 메서드
function makePagenation(totalCnt) { // (Number) 총 상품 갯수. totalCnt
  const pageWrap = document.querySelector('.pagination-list');
  maxPage = Math.floor(totalCnt / pageSize) + 1;
  if (URLMatch.get("page")) nowPage = Number(URLMatch.get("page"))

  for (var i = 1; i <= maxPage; i++) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.classList.add('pagination-link')
    a.innerText = i
    a.href = "/products?higherCategory=" + mainCategory + "&lowerCategory=" + subCategory + '&page=' + i

    // 페이지 버튼을 만드는 순서 i 와 현재 들어온 페이지가 같으면
    if (i === nowPage) {
      a.classList.add('is-current')
      a.setAttribute('area-label', 'Page ' + i)
      a.setAttribute('area-current', 'page')
    
    // 그 외 페이지
    } else {
      a.setAttribute('area-label', 'Goto Page ' + i)
    }
    li.appendChild(a)
    pageWrap.appendChild(li)
  }
}

// 이전 페이지 이동 메서드
function goToPrevPage() {
  if (nowPage === 1) return false
  
  location.href = "/products?higherCategory=" + mainCategory + "&lowerCategory=" + subCategory + '&page=' + (nowPage - 1)
}

// 다음 페이지 이동 메서드
function goToNextPage() {
  if (nowPage === maxPage) return false

  location.href = "/products?higherCategory=" + mainCategory + "&lowerCategory=" + subCategory + '&page=' + (nowPage + 1)
}

// 가격 콤마 표시 함수 (3자리 단위로)
function priceFormat(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
}



