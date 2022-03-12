import Swal from "sweetalert2";

export var authUser = JSON.parse(localStorage.getItem("user"));

export function alertMessage(type, message) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 6000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  var contents = "<ul>";
  for (var i = 0; i < message.length; i++) {
    contents += "<li>" + message[i] + "</li>";
  }
  contents += "</ul>";

  if (type == "success") {
    Toast.fire({
      icon: type,
      title: message,
    });
  } else if (type == "validation") {
    Toast.fire({
      icon: "error",
      title: contents,
    });
  } else if (type == "error") {
    Toast.fire({
      icon: "error",
      title: message,
    });
  }
}

export function deleteMessage(message) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.value) {
      Swal.fire("Deleted!", message, "success");
    }
  });
}


export function addMessage(message) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Confirm!",
  }).then((result) => {
    if (result.value) {
      Swal.fire("Assigned!", message, "success");
    }
  });
}


export function errorMessage(message) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.value) {
      Swal.fire("Deleted!", message, "success");
    }
  });
}

export function tableSearch() {
  var input, filter, found, table, tr, td, i, j;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td");
    for (j = 0; j < td.length; j++) {
      if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
        found = true;
      }
    }
    if (found) {
      tr[i].style.display = "";
      found = false;
    } else {
      tr[i].style.display = "none";
    }
  }
}
