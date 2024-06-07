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
                            <td id='employeeID'>${value.id}</td>
                            <td>${value.firstname}</td>
                            <td>${value.lastname}</td>
                            <td>
                            <button id='deleteEmployee' class='btn btn-xs btn-danger'>Delete</button>
                            <button class='btn btn-xs btn-warning'>Update</button>

                            </td>
                        </tr>
                `
        )
    })


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
        },
        error: function (err) {

        }
    })



})

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