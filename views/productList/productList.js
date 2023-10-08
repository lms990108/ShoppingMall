// 우선 실행 코드(페이지 로드 이전에 필요한 것)
const URLMatch = new URLSearchParams(location.search); // 쿼리스트링이 있는지 없는지
let mainCategory = URLMatch.get("higherCategory");      // 상위카테고리
let subCategory = URLMatch.get("lowerCategory");       // 하위카테고리


// 쿼리스트링 실제로 있는지 없는지 체크!
if (!mainCategory) { // 상위 카테고리 없으면..
  mainCatgory = getCategoryCode("higherCategory")

}
if (!subCategory) { // 하위 카테고리 없으면..
  subCategory = getCategoryCode("lowerCategory")
  
}

getCategoryCode();
// api 동작이 정상화 되면 이후 진행예정..
function getCategoryCode(type) {

  fetching("/category/")

}


// 페이지 로드 완료된 후 실행. 
window.addEventListener("DOMContentLoaded", () => { 
  // 이 안에서 코드 작성

  const list = getProductsList();

  makeProductList(list);



})

// 상품 목록 호출 메소드
function getProductsList(param) {
  // 더미 데이터(테스트용)
  const data = [
    {
      product_number: 1,
      product_name: '키크론 키보드1',
      main_img_url: 'https://shop-phinf.pstatic.net/20230821_63/16926169896767Chxc_PNG/24681734468048794_765040701.png?type=m510',
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

    a.href = "/product?productNumber=" + item.product_number;
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
  
 
  


  // const li = document.createElement('li');
  //   const a = document.createElement("a");

  //   a.href = "/product?productNumber=" + data[i].product_number;
  //   const img = document.createElement('img');
  //   img.src = data[i].main_img_url;
  //   const title =  document.createElement('p');
  //   const price = document.createElement('p');
    
  //   title.innerText = data[i].product_name;
  //   price.innerText = priceFormat(data[i].price) + '원';
    
  //   li.appendChild(a);
  //   a.appendChild(img);
  //   a.appendChild(title);
  //   a.appendChild(price);
  //   list.appendChild(li);
}

// 가격 콤마 표시 함수 (3자리 단위로)
function priceFormat(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
}



