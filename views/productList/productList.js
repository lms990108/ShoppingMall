// 우선 실행 코드(페이지 로드 이전에 필요한 것)
const URLMatch = new URLSearchParams(location.search); // 쿼리스트링이 있는지 없는지
let mainCategory = URLMatch.get("higherCategory");      // 상위카테고리
let subCategory = URLMatch.get("lowerCategory");       // 하위카테고리

// 둘 중에 하나라도 없으면
if (!mainCategory || !subCategory) {
  getCategoryCode(); // 실행
 
}

// 상위, 하위 카테고리 완성 -> 페이지 이동 메서드
async function getCategoryCode() {
  
  // 전체 카테고리 조회
  const allCategory = await getAllCategories();
  console.log(allCategory)

  if (!mainCategory) {
    const higher = allCategory.filter((item) => !item.parent); // 상위 카테고리

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
      subCategory = lower[0].name // ex) 기계식키보드
    }

  }
  window.location.replace("/products?higherCategory=" + mainCategory + "&lowerCategory=" + subCategory)

}

// 카테고리 제목 (메인 카테고리 타이틀)
document.querySelector(".main_title").innerText = mainCategory




// 하위 카테고리 찾는 메서드(탭 버튼)
const tabs = findSubCategory();
makeTabButtons(tabs); // 버튼 동적 생성 메서드 호출

async function findSubCategory() {
  const allCategory = await getAllCategories();
  const higherId = allCategory.find((item) => item.name === mainCategory)
  const lower = allCategory.filter((item) => item.parent && higherId._id === item.parent);
  return lower;
}
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

// 상품목록
  const list = getProductsList();

  // 상품 목록 엘리멘트 생성 메서드
  makeProductList(list);



// 상품 목록 호출 메소드
async function getProductsList() {

  // 페이징 처리를 위한 초기값
  let page = 1;
  // 페이지에 맞는 페이지 값
  if (URLMatch.get("page")) page = Number(URLMatch.get("page"))
  

  const res = await fetch("/api/product/?lowerCategory=" + subCategory + "&page=" + page)
  const data2 = await res.json();
  console.log(data2);

  // 더미 데이터(테스트용)
  const data = [
    {
      product_number: 1,
      product_name: '멜긱 키보드1',
      main_img_url: 'https://www.melgeek.com/cdn/shop/products/MelGeekMojo68PlasticSee-throughMechanicalKeyboard2.jpg?v=1681976059&width=800',
      des_img_url: '이미지 설명',
      content: 'ㄴㅇㄹㄴㅇㄹ',
      price: 200000,
      higher_category: '키보드',
      lower_category: '기계식 키보드',
    },
    {
      product_number: 2,
      product_name: '키크론 키보드2',
      main_img_url: 'https://shop-phinf.pstatic.net/20230821_63/16926169896767Chxc_PNG/24681734468048794_765040701.png?type=m510',
      des_img_url: '이미지 설명',
      content: 'ㄴㅇㄹㄴㅇㄹ',
      price: 200000,
      higher_category: '키보드',
      lower_category: '기계식 키보드',
    },
    {
      product_number: 3,
      product_name: '키크론 키보드3',
      main_img_url: 'https://shop-phinf.pstatic.net/20230821_63/16926169896767Chxc_PNG/24681734468048794_765040701.png?type=m510',
      des_img_url: '이미지 설명',
      content: 'ㄴㅇㄹㄴㅇㄹ',
      price: 200000,
      higher_category: '키크론 키보드',
      lower_category: '기계식 키보드',
    },
    {
      product_number: 4,
      product_name: '키크론 키보드4',
      main_img_url: 'https://shop-phinf.pstatic.net/20230821_63/16926169896767Chxc_PNG/24681734468048794_765040701.png?type=m510',
      des_img_url: '이미지 설명',
      content: 'ㄴㅇㄹㄴㅇㄹ',
      price: 200000,
      higher_category: '키크론 키보드',
      lower_category: '기계식 키보드',
    },
    {
      product_number: 5,
      product_name: '키크론 키보드5',
      main_img_url: 'https://shop-phinf.pstatic.net/20230821_63/16926169896767Chxc_PNG/24681734468048794_765040701.png?type=m510',
      des_img_url: '이미지 설명',
      content: 'ㄴㅇㄹㄴㅇㄹ',
      price: 200000,
      higher_category: '키보드',
      lower_category: '기계식 키보드',
    },
    {
      product_number: 6,
      product_name: '키크론 키보드6',
      main_img_url: 'https://shop-phinf.pstatic.net/20230821_63/16926169896767Chxc_PNG/24681734468048794_765040701.png?type=m510',
      des_img_url: '이미지 설명',
      content: 'ㄴㅇㄹㄴㅇㄹ',
      price: 200000,
      higher_category: '키보드',
      lower_category: '기계식 키보드',
    },
    {
      product_number: 7,
      product_name: '키크론 키보드7',
      main_img_url: 'https://shop-phinf.pstatic.net/20230821_63/16926169896767Chxc_PNG/24681734468048794_765040701.png?type=m510',
      des_img_url: '이미지 설명',
      content: 'ㄴㅇㄹㄴㅇㄹ',
      price: 200000,
      higher_category: '키보드',
      lower_category: '기계식 키보드',
    },
    {
      product_number: 8,
      product_name: '키크론 키보드8',
      main_img_url: 'https://shop-phinf.pstatic.net/20230821_63/16926169896767Chxc_PNG/24681734468048794_765040701.png?type=m510',
      des_img_url: '이미지 설명',
      content: 'ㄴㅇㄹㄴㅇㄹ',
      price: 200000,
      higher_category: '키보드',
      lower_category: '기계식 키보드',
    }
  ];

  return data;

}



// 상품목록 엘리먼트 생성
function makeProductList(data) {
  const list = document.querySelector('.items');

  data.forEach((item) => {

    const li = document.createElement('li');
    const a = document.createElement("a");

    a.href = "/product_detail?productNumber=" + item.product_number;
    const img = document.createElement('img');
    img.src = item.main_img_url;
    const title =  document.createElement('p');
    const price = document.createElement('p');
    
    title.innerText = item.product_name;
    price.innerText = priceFormat(item.price) + '원';
    
    li.appendChild(a);
    a.appendChild(img);
    a.appendChild(title);
    a.appendChild(price);
    list.appendChild(li);
  })
  
}

// 가격 콤마 표시 함수 (3자리 단위로)
function priceFormat(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
}



