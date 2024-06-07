using API_Intro.DTOs.EmployeeDTOs;
using API_Intro.Models;
using API_Intro.Repositories.Abstracts;
using API_Intro.Tools.EmployeesConvert;

namespace API_Intro.Repositories.Concretes
{
    public class EmployeeService : IEmployeeService
    {
        private readonly NorthwndContext _context;

        public EmployeeService(NorthwndContext context)
        {
            _context = context;
        }
        public string CreateEmployee(EmployeeDTO employeeDTO)
        {
            var created = EmployeeConvertDTO.ConvertEmployeeDTO(employeeDTO);

            if (created != null)
            {
                _context.Employees.Add(created);
                _context.SaveChanges();
                return "Başarılı bir şekilde kaydedildi";
            }
            return "Bir hata meydana geldi";
        }

        public string DeleteEmployee(int id)
        {
            try
            {
                var deleted = _context.Employees.FirstOrDefault(x=>x.EmployeeId == id);

                _context.Employees.Remove(deleted);
                _context.SaveChanges();

                return "Veri Silindi";
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public EmployeeDTO GetEmployeeById(int id)
        {
            try
            {
                var employee = EmployeeConvertDTO.ConvertEmployee(_context.Employees.Find(id));

                return employee;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public List<EmployeeDTO> GetlAllEmployees()
        {
            try
            {
                return EmployeeConvertDTO.ConvertEmployees(_context.Employees.ToList());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string UpdateEmployee(EmployeeDTO employeeDTO)
        {
            try
            {
                var updated = EmployeeConvertDTO.ConvertEmployeeDTO(employeeDTO);

                _context.Entry(updated).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                _context.SaveChanges();
                return "Veri başarılır bir şekilde güncellendi";
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
