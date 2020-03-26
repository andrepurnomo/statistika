$(".result").hide();
$("textarea#data").val(
  "65, 65, 67, 68, 69, 70, 70, 70, 70, 71\n71, 71, 72, 72, 72, 72, 72, 72, 73, 73\n73, 74, 74, 74, 74, 74, 74, 74, 75, 75\n75, 75, 75, 76, 77, 78, 79, 79, 80, 82"
);

function get_result() {
  value = $("textarea#data").val();
  length_line = 0;
  length_column = 0;

  if (value) {
    length_line = value.split("\n").length;
    length_column = value.split("\n")[0].split(",").length;
  }
  if (length_column) $(".result").show();

  data = Array.from(value.replace(/(\r\n|\n|\r)/gm, ",").split(","), Number);
  get_result_a();
  get_result_b();
  get_result_c();
  get_result_d();
  get_result_e();
  get_result_f();
}

function get_result_a() {
  $(".result-a-table").empty();
  data.sort();
  temp_col = 0;
  for (var i = 0; i < data.length; i++) {
    if (temp_col == 0) {
      row = document.createElement("tr");
    }

    col = document.createElement("td");
    val = document.createTextNode(data[i]);
    col.appendChild(val);
    row.appendChild(col);

    if (temp_col == length_column - 1) {
      $(".result-a-table").append(row);
      temp_col = 0;
    } else {
      temp_col += 1;
    }
  }
}

function get_result_b() {
  max = Math.max.apply(Math, data);
  min = Math.min.apply(Math, data);
  jangkauan = max - min;
  $("#resultb").text(max + " - " + min + " = " + jangkauan);
}

function get_result_c() {
  log = 3.3 * Math.log10(data.length);
  kelas = Math.round(1 + 3.3 * Math.log10(data.length));
  $("#resultc").html(
    "k = 1 + 3.3 log " +
      data.length +
      "</br><font color='white'>__</font>= 1 + " +
      Number(log).toFixed(1) +
      " = " +
      Number(1 + log).toFixed(1) +
      "</br><font color='white'>__</font>= " +
      kelas
  );
}

function get_result_d() {
  interval = Math.ceil(jangkauan / kelas);
  $("#resultd").html(
    "i = " +
      jangkauan +
      "/" +
      kelas +
      "</br><font color='white'>__</font>= " +
      Number(jangkauan / kelas).toFixed(1) +
      "</br><font color='white'>__</font>= " +
      interval
  );
}

function get_result_e() {
  $("#resulte").html(min);
}

function get_result_f() {
  $(".result-f-table").empty();
  first = true;
  start = min;
  end = max;
  total = 0;

  for (var i = 0; i < kelas; i++) {
    if (first) {
      $(".result-f-table").append(
        "<tr><th>Diameter</th><th>Frekuensi</th></tr>"
      );
    }

    row = document.createElement("tr");
    col_diameter = document.createElement("td");
    col_frekuensi = document.createElement("td");

    next = start + interval - 1;
    count = data.filter(get_between);
    total += count.length;
    diameter = document.createTextNode(start + " - " + next);
    frekuensi = document.createTextNode(count.length);

    col_diameter.appendChild(diameter);
    col_frekuensi.appendChild(frekuensi);
    row.appendChild(col_diameter);
    row.appendChild(col_frekuensi);

    $(".result-f-table").append(row);

    first = false;
    start = next + 1;
  }

  $(".result-f-table").append("<tr><th>Jumlah</th><th>" + total + "</th>");
}

function get_between(val) {
  if ((val >= start) & (val <= next)) return val;
  else return false;
}
