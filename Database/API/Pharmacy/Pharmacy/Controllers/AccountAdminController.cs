using Microsoft.AspNetCore.Mvc;
using Pharmacy.Models;
using Pharmacy.Services;

namespace Pharmacy.Controllers
{
    [Route("api/admin/account")]
    public class AccountAdminController : Controller
    {
        
        private AccountAdminService accountService;

        public AccountAdminController(AccountAdminService _accountService)
        {
            accountService = _accountService;
        }

        [Produces("application/json")]
        [HttpGet("findall")]
        public IActionResult FindAll()
        {
            try
            {
                return Ok(accountService.FindAll());
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("find/{id}")]
        public IActionResult Find(int id)
        {
            try
            {
                return Ok(accountService.Find(id));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("create")]
        public IActionResult Create([FromBody] Account account)
        {
            try
            {
                return Ok(new
                {
                    Result = accountService.Create(account)
                });
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("update")]
        public IActionResult Update([FromBody] Account account)
        {
            try
            {
                var accountInfo = accountService.Find2(account.Id);
                
                
                accountInfo.RoleId = account.RoleId;
                accountInfo.Status = account.Status;
                accountInfo.Email = account.Email;

                return Ok(new
                {
                    Result = accountService.Update(accountInfo)
                });
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                return Ok(new
                {
                    Result = accountService.Delete(id)
                });
            }
            catch
            {
                return BadRequest();
            }
        }


        [Produces("application/json")]
        [HttpGet("search/{keyword}")]
        public IActionResult Search(string keyword)
        {
            try
            {
                return Ok(accountService.Search(keyword));
            }
            catch
            {
                return BadRequest();
            }
        }
        
    }
}
