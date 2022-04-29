using Microsoft.AspNetCore.Mvc;
using Pharmacy.Models;
using Pharmacy.Services;
using System.Diagnostics;
using System.Net;
using System.Net.Mail;

namespace Pharmacy.Controllers
{
    [Route("api/account")]
    public class AccountController : Controller
    {
        private AccountService accountService;
        private RoleService roleService;
        public AccountController(AccountService _accountService, RoleService _roleService)
        {
            accountService = _accountService;
            roleService = _roleService;
        }
        
        

        [Produces("application/json")]
        [HttpGet("findAll")]
        public IActionResult findAll()
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
        [Route("find/{id}")]
        public IActionResult find(int id)
        {
            try
            {
                var account = accountService.Find(id);
                return Ok(new
                {
                    Id = account.Id,
                    Username = account.Username,
                  
                    Password = account.Password,
                 /*   Fullname = account.Fullname,
                    Gender = account.Gender,
                    Status = account.Status,
                    Dob = account.Dob,*/
                    Email = account.Email,
                      Code = account.Code,
                });
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [Route("findAccount/{username}")]
        public IActionResult findAccount(string username)
        {
            try
            {
                
                var account = accountService.FindAccount(username);
                return Ok(new
                {
                    
                    Id = account.Id,
                    RoleId = account.RoleId,
                    RoleName = account.Role.Name,
                    Username = account.Username,
            /*        Fullname = account.Fullname,
                    Password = account.Password,
                    Gender = account.Gender,
                    Status = account.Status,
                    Dob = account.Dob,*/
                    Email = account.Email,
                    Code = account.Code,
                });
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [Route("findEmail/{email}")]
        public IActionResult findEmail(string email)
        {
            try
            {
                var account = accountService.FindEmail(email);
                return Ok(new
                {
                    Id = account.Id,
                    Username = account.Username,
                    Password = account.Password,
                   /* Fullname = account.Fullname,
                    Gender = account.Gender,
                    Status = account.Status,
                    Dob = account.Dob,*/
                    Email = account.Email,
                    Code = account.Code,
                });
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("accountInfo/{username}")]
        public IActionResult accountInfo(string username)
        {
            try
            {
                return Ok(accountService.AccountInfo(username));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("create")]
        public IActionResult create([FromBody] Account account)
        {
            try
            {
                string token = RandomCode.RandomString(6);
                string message = "Check Code: " + token;
                SendEmail(account.Email, "confirm code susseccfully", message);
                account.Code = token;
                
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
        public IActionResult update( [FromBody] AccountUpdateRequest account)
        {
            try
            {
                var accountInfo = accountService.FindAccount(account.Username);

                accountInfo.Fullname = account.Fullname;
                accountInfo.Gender = account.Gender;
                accountInfo.Dob = account.Dob;
                
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
        public IActionResult delete(int id)
        {
            try
            {
                return Ok(new
                {
                    Result = accountService.Delete(id)
                }) ;
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("login")]
        public IActionResult login([FromBody] Login login)
        {

            try
            {
                /*var account = accountService.Login(login); 
                return Ok(account); */           
                var account = accountService.Login(login);
                if (account != null)
                {
                   
                    return Ok(new {
                        Id = account.Id,
                        Username = account.Username,
                       
                        Password = account.Password,
                        /*   Fullname = account.Fullname,
                         *  Gender = account.Gender,
                          Status = account.Status,
                          Dob = account.Dob,*/
                        Email = account.Email,
                        Code = account.Code,
                        RoleId = account.RoleId,
                    });
                   
                }return null;
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
            
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpGet("checkcode/{id}/{checkCodeEmail}")]
        public IActionResult checkCode(int id, string checkCodeEmail)
        {

            try
            {
                return Ok(new
                {
                    Result = accountService.CheckCode(id, checkCodeEmail)
                });
            }
            catch
            {
                return BadRequest();
            }

        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpGet("checkrole")]
        public IActionResult checkRole(string roleName)
        {

            try
            {
                return Ok(new
                {
                    Result = accountService.FindRoleName(roleName)
                });
            }
            catch
            {
                return BadRequest();
            }

        }


        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("changePassword")]
        public IActionResult changePassword([FromBody] AccountChangePassword account)
        {
            try
            {
                var accountChangePassword = accountService.FindEmail(account.Email);
                accountChangePassword.Password = account.Password;


                return Ok(new
                {

                    Result = accountService.ChangePassword(accountChangePassword)
                });
            }
            catch
            {
                return BadRequest();
            }

        }

        public static void SendEmail(string email, string subject, string body)
        {
            using (MailMessage mail = new MailMessage())
            {
                mail.From = new MailAddress("to.c2003l@gmail.com");
                mail.To.Add(email);
                mail.Subject = subject;
                mail.Body = body;
                mail.IsBodyHtml = true;  
                using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                {
                    smtp.Credentials = new NetworkCredential("to.c2003l@gmail.com", "kahpslobpvwaaixe");
                    smtp.EnableSsl = true;
                    smtp.Send(mail);
                }
            }
        }

       
        [Produces("application/json")]
        [HttpGet("sendemail/{email}")]
        public IActionResult sendemail( string email)
        {
            try
            {
                var acc = accountService.FindEmail(email);
                string token = RandomCode.RandomString(6);
                string message = "Check Code: " + token;
                SendEmail(email, "confirm code susseccfully", message);
                var Code = token;
                if (acc != null)
                {
                    acc.Code = Code;
                }
                return Ok(new
                {
                    Result = accountService.UpdateCode(acc)
                });
            }
            catch
            {
                return BadRequest();
            }
        }


    }
}
