using API_Intro.DTOs.EmployeeDTOs;

namespace API_Intro.Repositories.Abstracts
{
    public interface IEmployeeService
    {
        List<EmployeeDTO> GetlAllEmployees();
        EmployeeDTO GetEmployeeById(int id);
        string CreateEmployee(EmployeeDTO employeeDTO);
        string DeleteEmployee(int id);
        string UpdateEmployee(EmployeeDTO employeeDTO);
    }
}
