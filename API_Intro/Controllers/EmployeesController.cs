using API_Intro.DTOs.EmployeeDTOs;
using API_Intro.Repositories.Abstracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API_Intro.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeesController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        public IActionResult GetEmployees()
        {
            return Ok(_employeeService.GetlAllEmployees());
        }

        [HttpGet("{id}")]
        public IActionResult GetEmployee(int id)
        {
            return Ok(_employeeService.GetEmployeeById(id));
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            return Ok(_employeeService.DeleteEmployee(id));
        }

        [HttpPost]
        public IActionResult PostEmployee(EmployeeDTO employeeDTO)
        {
            return Ok(_employeeService.CreateEmployee(employeeDTO));
        }

        [HttpPut]
        public IActionResult PutEmployee(EmployeeDTO employeeDTO)
        {
            return Ok(_employeeService.UpdateEmployee(employeeDTO));
        }
    }
}
