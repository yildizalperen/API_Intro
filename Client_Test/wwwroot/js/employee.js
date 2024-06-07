$(document).ready(function () {


    GetAjax();



})

//Ajaxdan dönen veriyi tabloya dahil etme.

function GetEmployeeData(data) {

    $("#employeeTable").find("tr").remove();

    $.each(data, function (key, value) {
        $("#employeeTable").append(
            `
                 <tr>
                            <td>${value.id}</td>
                            <td>${value.firstname}</td>
                            <td>${value.lastname}</td>
                            <td>
                            <button onclick='deleteEmployee("${value.id}")' class='btn btn-xs btn-danger'>Delete</button>
                            <button onclick='updateEmployee("${value.id}")' class='btn btn-xs btn-warning'>Update</button>

                            </td>
                        </tr>
                `
        )
    })


}

function searchEmployee() {
    var input, filter, table, tr, td, value;
    input = document.getElementById("employeeSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("employeeTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            value = td.textContent || td.innerText;
            if (value.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


//GetEmployeeData Kullanım
GetEmployeeData();

$("#createEmployee").click(function () {


    const firstname = $("#firstname").val();
    const lastname = $("#lastname").val();

    //Post Ajax
    $.ajax({
        url: "https://localhost:7032/api/employees/postemployee",
        type: "Post",
        contentType: 'application/json',
        data: JSON.stringify(
            {
                Firstname: firstname,
                Lastname: lastname
            }
        ),
        success: function (data) {
            GetAjax();
            Swal.fire({
                title: "Başarılı!",
                text: "Veri Eklendi!",
                icon: "success"
            });
        },
        error: function (jqXHR, exception) {

            if (jqXHR.status === 500) {
                Swal.fire({
                    title: "Hata!",
                    text: "Servera Bağlanılamadı!",
                    icon: "warning"
                });
            }
            else if (jqXHR.status === 404) {
                Swal.fire({
                    title: "Hata!",
                    text: "Sayfa Bulunamadı!",
                    icon: "error"
                });
            }
        },
    })



})
function updateEmployee(employeeID) {
    const firstname = $("#firstname").val();
    const lastname = $("#lastname").val();

    $.ajax({
        url: 'https://localhost:7032/api/employees/putemployee',
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(
            {
                ID: employeeID,
                Firstname: firstname,
                Lastname: lastname
            }),
        success: function (data) {
            GetAjax();
            Swal.fire({
                title: "Başarılı!",
                text: "Veri Güncellendi!",
                icon: "success"
            });
        },
        error: function (jqXHR, exception) {

            if (jqXHR.status === 500) {
                Swal.fire({
                    title: "Hata!",
                    text: "Servera Bağlanılamadı!",
                    icon: "warning"
                });
            }
            else if (jqXHR.status === 404) {
                Swal.fire({
                    title: "Hata!",
                    text: "Sayfa Bulunamadı!",
                    icon: "error"
                });
            }
        },
    })
}

function deleteEmployee(employeeID) {
    $.ajax({
        url: 'https://localhost:7032/api/employees/deleteemployee/'+employeeID,
        type: 'DELETE',
        contentType: 'application/json',
        data: { ID: employeeID },
        success: function (data) {
            GetAjax();
            Swal.fire({
                title: "Başarılı!",
                text: "Veri Silindi!",
                icon: "success"
            });
        },
        error: function (jqXHR, exception) {

            if (jqXHR.status === 500) {
                Swal.fire({
                    title: "Hata!",
                    text: "Servera Bağlanılamadı!",
                    icon: "warning"
                });
            }
            else if (jqXHR.status === 404) {
                Swal.fire({
                    title: "Hata!",
                    text: "Sayfa Bulunamadı!",
                    icon: "error"
                });
            }
        },
    })
}

function GetAjax() {
    //Ajax isteği oluşturma
    $.ajax({
        url: 'https://localhost:7032/api/employees/getemployees',
        success: function (data) {

            GetEmployeeData(data);
        },
        error: function (jqXHR, exception) {

            if (jqXHR.status === 500) {
                Swal.fire({
                    title: "Hata!",
                    text: "Servera Bağlanılamadı!",
                    icon: "warning"
                });
            }
            else if (jqXHR.status === 404) {
                Swal.fire({
                    title: "Hata!",
                    text: "Sayfa Bulunamadı!",
                    icon: "error"
                });
            }
        },
    })
}