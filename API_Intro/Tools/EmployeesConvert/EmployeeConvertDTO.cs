using API_Intro.DTOs.EmployeeDTOs;
using API_Intro.Models;

namespace API_Intro.Tools.EmployeesConvert
{
    public class EmployeeConvertDTO
    {
        public static List<EmployeeDTO> ConvertEmployees(List<Employee> employees)
        {
            return employees.Select(e => new EmployeeDTO
            {
                ID = e.EmployeeId,
                Firstname = e.FirstName,
                Lastname = e.LastName
            }).ToList();
        }

        public static EmployeeDTO ConvertEmployee(Employee employee)
        {
            EmployeeDTO employeeDTO = new EmployeeDTO()
            {
                ID = employee.EmployeeId,
                Firstname = employee.FirstName,
                Lastname = employee.LastName
            };

            return employeeDTO;
        }

        public static List<Employee> ConvertEmployeesDTOs(List<EmployeeDTO> employeeDTOs)
        {
            return employeeDTOs.Select(e => new Employee
            {
                EmployeeId = e.ID,
                FirstName = e.Firstname,
                LastName = e.Lastname
            }).ToList();
        }

        public static Employee ConvertEmployeeDTO(EmployeeDTO employeeDTO)
        {
            Employee employee = new Employee()
            {
                EmployeeId = employeeDTO.ID,
                FirstName = employeeDTO.Firstname,
                LastName = employeeDTO.Lastname
            };
            return employee;
        }
    }
}
