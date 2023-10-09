/* tab의 값에 따라 관리하고자하는 target 화면 보여주기 */
const tabs = Array.prototype.slice.call(
  document.querySelectorAll("#tabs li"),
  0,
);
const contents = Array.prototype.slice.call(
  document.querySelectorAll(".content-tab"),
  0,
);

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("is-active"));
    tab.classList.add("is-active");

    contents.forEach((c) => c.classList.remove("is-active"));
    document.getElementById(contents[index].id).classList.add("is-active");
  });
});
