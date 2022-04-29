

using Microsoft.EntityFrameworkCore;
using Pharmacy.Converters;
using Pharmacy.Models;
using Pharmacy.Services;
using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddControllers().AddJsonOptions(option =>
{
    option.JsonSerializerOptions.Converters.Add(new DateConverter());
});


builder.Services.AddCors();

builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
var connectionString = builder.Configuration["ConnectionStrings:DefaultConnection"];

Debug.WriteLine("connectionstring: " + connectionString);

builder.Services.AddDbContext<DatabaseContext>(options => options.UseLazyLoadingProxies().UseSqlServer(connectionString));

builder.Services.AddScoped<CandidateService, CandidateServiceImpl>();
builder.Services.AddScoped<ProductService, ProductServiceImpl>();
builder.Services.AddScoped<InvoiceService, InvoiceServiceImpl>();
builder.Services.AddScoped<ClientService, ClientServiceImpl>();
builder.Services.AddScoped<FeedbackService, FeedbackServiceImpl>();
builder.Services.AddScoped<AccountService, AccountServiceImpl>();
builder.Services.AddScoped<JobService,JobServiceImpl>();
builder.Services.AddScoped<RoleService, RoleServiceImpl>();
builder.Services.AddScoped<CategoryService, CategoryServiceImpl>();
builder.Services.AddScoped<AccountAdminService, AccountAdminServiceImpl>();
builder.Services.AddScoped<CandidateAdminService, CandidateAdminServiceImpl>();
builder.Services.AddScoped<CategoryAdminService, CategoryAdminServiceImpl>();
builder.Services.AddScoped<RoleAdminService, RoleAdminServiceImpl>();
builder.Services.AddScoped<JobApplicationStatusAdminService, JobApplicationStatusAdminServiceImpl>();
builder.Services.AddScoped<ClientAdminService, ClientAdminServiceImpl>();
builder.Services.AddScoped<FeedbackAdminService, FeedbackAdminServiceImpl>();
builder.Services.AddScoped<InvoiceAdminService, InvoiceAdminServiceImpl>();
builder.Services.AddScoped<InvoiceDetailAdminService, InvoiceDetailAdminServiceImpl>();
builder.Services.AddScoped<JobAdminService, JobAdminServiceImpl>();
builder.Services.AddScoped<JobApplicationAdminService, JobApplicationAdminServiceImpl>();
builder.Services.AddScoped<ProductAdminService, ProductAdminServiceImpl>();
builder.Services.AddScoped<ProductFileUploadAdminService, ProductFileUploadAdminServiceImpl>();
builder.Services.AddScoped<CandidateFileUploadAdminService, CandidateFileUploadAdminServiceImpl>();
builder.Services.AddScoped<AboutUsAdminService, AboutUsAdminServiceImpl>();
builder.Services.AddCors();

var app = builder.Build();
app.UseCors(builder => builder
                .AllowAnyHeader()
                .AllowAnyMethod()
                .SetIsOriginAllowed((host) => true)
                .AllowCredentials()
            );
app.UseStaticFiles();
app.UseRouting();

app.MapControllers();

app.Run();
