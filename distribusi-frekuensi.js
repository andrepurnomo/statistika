$(".result").hide();

function get_generate() {
  number_start = $("input[name=number_start]").val();
  number_end = $("input[name=number_end]").val();
  count_row = $("input[name=count_row]").val();
  count_column = $("input[name=count_column]").val();

  datas = "";

  for (var r = 0; r < count_row; r++) {
    for (var c = 0; c < count_column; c++) {
      datas += self.getRandomInt(number_start, number_end);

      if (!(c == count_column - 1)) datas += ", ";
    }
    if (!(r == count_row - 1)) datas += "\n";
  }

  $("textarea#data").val(datas);
}

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
  kelas = [];

  floor = Math.floor(1 + 3.3 * Math.log10(data.length));
  ceil = Math.ceil(1 + 3.3 * Math.log10(data.length));

  if (!kelas.includes(floor)) kelas.push(floor);
  if (!kelas.includes(ceil)) kelas.push(ceil);

  $("#resultc").html(
    "k = 1 + 3.3 log " +
      data.length +
      "</br><font color='white'>__</font>= 1 + " +
      Number(log).toFixed(1) +
      " = " +
      Number(1 + log).toFixed(1) +
      "</br><font color='white'>__</font>= " +
      kelas.join(" dan ")
  );
}

function get_result_d() {
  interval = [];
  str_print = "i ";
  for (var i = 0; i < kelas.length; i++) {
    floor = Number(Math.floor(jangkauan / kelas[i])).toFixed(0);
    ceil = Number(Math.ceil(jangkauan / kelas[i])).toFixed(0);

    interval.push([kelas[i], parseInt(floor)]);
    if (floor != ceil) interval.push([kelas[i], parseInt(ceil)]);
  }

  for (var i = 0; i < interval.length; i++) {
    str_print +=
      " = " +
      jangkauan +
      " / " +
      interval[i][0] +
      "</br><font color='white'>__</font>= " +
      interval[i][1] +
      "</br><font color='white'>__</font>= " +
      "Kelas " +
      interval[i][0] +
      " dengan interval " +
      interval[i][1] +
      "</br><font color='white'>__</font>";
  }

  $("#resultd").html(str_print);
}

function get_result_e() {
  $("#resulte").html(min);
}

function get_result_f() {
  $(".result-f-table").empty();
  str_table_header =
    "<table class='table'><thead><tr><th>Diameter</th><th>Frekuensi</th></tr></thead><tbody>";
  str_table_tr_first = "<tr>";
  str_table_tr_end = "</tr>";
  str_table_td_first = "<td>";
  str_table_td_end = "</td>";
  str_final = "";

  for (var i = 0; i < interval.length; i++) {
    start = min;
    total = 0;
    str_final +=
      "<p> Kelas " + interval[i][0] + " Interval " + interval[i][1] + "</p>";
    str_final += str_table_header;

    for (var k = 0; k < interval[i][0]; k++) {
      next = start + interval[i][1] - 1;
      count = data.filter(get_between).length;
      total += count;

      str_final += "<tr><td>" + start + " - " + next + "</td>";
      str_final += "<td>" + count + "</td></tr>";

      start = next + 1;
    }

    str_final += "<tr><th>Jumlah</th><th>" + total + "</th></tbody></table>";
  }

  $("#resultf").html(str_final);
}

function get_between(val) {
  if ((val >= start) & (val <= next)) return val;
  else return false;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
