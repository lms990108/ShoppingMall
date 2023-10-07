// 우선 실행 코드(페이지 로드 이전에 필요한 것)
const URLMatch = new URLSearchParams(location.search); // 쿼리스트링이 있는지 없는지
let mainCategory = URLMatch.get("higherCategory");      // 상위카테고리
let subCategory = URLMatch.get("lowerCategory");       // 하위카테고리


// 쿼리스트링 실제로 있는지 없는지 체크!
if (!mainCategory) {
  mainCatgory = getCategoryCode("higherCategory")

}
if (!subCategory) {
  subCategory = getCategoryCode("lowerCategory")
  
}
getCategoryCode(); // api 동작이 정상화 되면 이후 진행..


function getCategoryCode(type) {
  axios.get('http://localhost:5001/category/')
		.then(res => res.data)
        .then(data => console.log(data));
}

// 페이지 로드 완료된 후 실행. 
window.addEventListener("DOMContentLoaded", () => { 
  // 이 안에서 코드 작성






})






// axios.get('http://localhost:5001/product/')
// 		.then(res => res.data)
//         .then(data => console.log(data));