// get the table element
var $table = document.getElementById("myHistoryTable"),
  // number of rows per page
  $n = 10,
  // number of rows of the table
  $rowCount = $table.rows.length,
  // get the first cell's tag name (in the first row)
  $firstRow = $table.rows[0].firstElementChild.tagName,
  // boolean var to check if table has a head row
  $hasHead = $firstRow === "TH",
  // an array to hold each row
  $tr = [],
  // loop counters, to start count from rows[1] (2nd row) if the first row has a head tag
  $i,
  $ii,
  $j = $hasHead ? 1 : 0,
  // holds the first row if it has a (<TH>) & nothing if (<TD>)
  $th = $hasHead ? $table.rows[0].outerHTML : "";
// count the number of pages
var $pageCount = Math.ceil($rowCount / $n);
// if we had one page only, then we have nothing to do ..
if ($pageCount > 1) {
  // assign each row outHTML (tag name & innerHTML) to the array
  for ($i = $j, $ii = 0; $i < $rowCount; $i++, $ii++)
    $tr[$ii] = $table.rows[$i].outerHTML;
  // create a div block to hold the buttons
  document
    .getElementById("tables")
    .insertAdjacentHTML("afterend", "<div id='buttons'></div");
  // the first sort, default page is the first one
  sort(1);
}

var monthSelect = document.querySelector(".selection.month");
var yearSelect = document.querySelector(".selection.year");

// ($p) is the selected page number. it will be generated when a user clicks a button
function sort($p) {
  /* create ($rows) a variable to hold the group of rows
   ** to be displayed on the selected page,
   ** ($s) the start point .. the first row in each page, Do The Math
   */
  var $rows = $th,
    $s = $n * $p - $n;
  for ($i = $s; $i < $s + $n && $i < $tr.length; $i++) $rows += $tr[$i];

  // now the table has a processed group of rows ..
  $table.innerHTML = $rows;
  // create the pagination buttons
  document.getElementById("buttons").innerHTML = pageButtons($pageCount, $p);
  // CSS Stuff
  document.getElementById("id" + $p).setAttribute("class", "active");
}

// ($pCount) : number of pages,($cur) : current page, the selected one ..
function pageButtons($pCount, $cur) {
  /* this variables will disable the "Prev" button on 1st page
       and "next" button on the last one */
  var $prevDis = $cur == 1 ? "disabled" : "",
    $nextDis = $cur == $pCount ? "disabled" : "",
    /* this ($buttons) will hold every single button needed
     ** it will creates each button and sets the onclick attribute
     ** to the "sort" function with a special ($p) number..
     */
    $buttons =
      "<input type='button' value='<< Prev' onclick='sort(" +
      ($cur - 1) +
      ")' " +
      $prevDis +
      ">";
  for ($i = 1; $i <= $pCount; $i++)
    $buttons +=
      "<input type='button' id='id" +
      $i +
      "'value='" +
      $i +
      "' onclick='sort(" +
      $i +
      ")'>";
  $buttons +=
    "<input type='button' value='Next >>' onclick='sort(" +
    ($cur + 1) +
    ")' " +
    $nextDis +
    ">";
  return $buttons;
}

$tableStore = $table.cloneNode(true);
$currentYear = new Date().getFullYear();
$currentMonth = null;

// console.log("Table",$table )
monthSelect.onchange = (event) => {
  console.log("Date filter: ", event.target.value, $tr);
  $currentMonth = Number(event.target.value);
  var rows = $tableStore.rows;
  var $res = $th;
  for (let i = 1; i < rows.length; i++) {
    var date = new Date(rows[i].querySelector(".date").innerText);
    if (
      $currentMonth === date.getMonth() + 1 &&
      $currentYear === date.getFullYear()
    ) {
      $res += rows[i].outerHTML;
    }
  }
  $table.innerHTML = $res;
};

yearSelect.onchange = (event) => {
  console.log("Year filter: ", event.target.value);
  $currentYear = Number(event.target.value);
  var rows = $tableStore.rows;
  var $res = $th;
  for (let i = 1; i < rows.length; i++) {
    var date = new Date(rows[i].querySelector(".date").innerText);
    if ($currentMonth) {
      if (
        Number($currentMonth) === date.getMonth() + 1 &&
        $currentYear === date.getFullYear()
      ) {
        $res += rows[i].outerHTML;
      }
    } else {
      if ($currentYear === date.getFullYear()) {
        $res += rows[i].outerHTML;
      }
    }
  }
  $table.innerHTML = $res;

  $(document).ready(function () {
    // Lắng nghe sự kiện khi form tìm kiếm được submit
    $(".search-field").submit(function (event) {
      event.preventDefault(); // Ngăn chặn sự kiện mặc định của form submit
      var searchValue = $('input[name="search"]').val().toLowerCase(); // Lấy giá trị tìm kiếm và chuyển về chữ thường
      var $table = $("#myTable"); // Chọn bảng

      // Lặp qua từng hàng (kể từ hàng thứ 2, bỏ qua hàng tiêu đề)
      $table.find("tbody tr").each(function (index, row) {
        var $row = $(row);
        var roomValue = $row.find("td:nth-child(4)").text().toLowerCase(); // Lấy giá trị trong cột "Room" và chuyển về chữ thường

        // Kiểm tra nếu giá trị tìm kiếm tồn tại trong giá trị của cột "Room"
        if (roomValue.indexOf(searchValue) !== -1) {
          $row.show(); // Hiển thị hàng nếu có kết quả tìm kiếm
        } else {
          $row.hide(); // Ẩn hàng nếu không có kết quả tìm kiếm
        }
      });
    });
  });
};

function filterTable() {
  var input = document.querySelector(".search-field input");
  var filter = input.value.toUpperCase();

  var table = document.getElementById("myHistoryTable");
  var rows = table.getElementsByTagName("tr");

  for (var i = 0; i < rows.length; i++) {
    var room = rows[i].getElementsByTagName("td")[2];
    if (room) {
      var roomText = room.textContent || room.innerText;
      if (roomText.toUpperCase().indexOf(filter) > -1) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  }
}

var searchForm = document.querySelector(".search-field");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Ngăn chặn sự kiện submit mặc định của form
  filterTable();
});
