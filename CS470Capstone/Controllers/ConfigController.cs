using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CCFLoggingConfig.Controllers
{
    public class ConfigController : Controller
    {
        // GET: Config
        public ActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public JsonResult GetConfigsForDataTable()
        {
            try
            {
                var draw = Request.Form.GetValues("draw").FirstOrDefault();
                var start = Request.Form.GetValues("start").FirstOrDefault();
                var length = Request.Form.GetValues("length").FirstOrDefault();

                var sortDirection = Request.Form.GetValues("order[0][dir]").FirstOrDefault();

                var sortColumnIndex = Request.Form.GetValues("order[0][column]").FirstOrDefault();
                var sortColumn = Request.Form.GetValues(String.Format("columns[{0}][name]", sortColumnIndex)).FirstOrDefault();


                //Paging Size (10,20,50,100)    
                int pageSize = length != null ? Convert.ToInt32(length) : 0;
                int skip = start != null ? Convert.ToInt32(start) : 0;
                int recordsTotal = 0;

                using (var db = new logconfigEntities())
                {
                    IQueryable<Log> query = db.Logs;

                    //Sorting    
                    if (sortDirection.ToLowerInvariant() == "asc")
                    {
                        //query = query.OrderBy(sortColumn);
                    }
                    else
                    {
                        //query = query.OrderBy(sortColumn + " " + sortDirection);
                    }

                    ////Search
                    //if (!string.IsNullOrEmpty(searchValue))
                    //{
                    //    query = query.Where(l => l.Title == searchValue);
                    //}

                    //total number of rows count     
                    recordsTotal = query.Count();
                    //Paging     
                    var data = query.Skip(skip).Take(pageSize).ToList();

                    //Returning Json Data    
                    return Json(new { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = data });
                }
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }

        //public void CreateConfig()
        //{
        //    using(var db = new logconfigEntities1())
        //    {
        //        Configuration a = new Configuration
        //        {
        //            Application = "AcademicRVU",
        //            Key = "LoginNotificationMsg",
        //            Value = "<div>hello world</div>"
        //        };
        //        db.Configurations.Add(a);

        //        Configuration b = new Configuration
        //        {
        //            Application = "AcademicRVU",
        //            Key = "MaintenanceMode",
        //            Value = "FALSE"
        //        };
        //        db.Configurations.Add(b);

        //        Configuration c = new Configuration
        //        {
        //            Application = "AcademicRVU",
        //            Key = "MembershipAppID",
        //            Value = "8"
        //        };
        //        db.Configurations.Add(c);

        //        Configuration d = new Configuration
        //        {
        //            Application = "AkronPeerReview",
        //            Key = "ApplicationStatus",
        //            Value = "online"
        //        };
        //        db.Configurations.Add(d);

        //        Configuration e = new Configuration
        //        {
        //            Application = "AkronPeerReview",
        //            Key = "SessionErrorURL",
        //            Value = "http://iweb4.ccf.org/imaging/SessionError.html"
        //        };
        //        db.Configurations.Add(e);

        //        Configuration f = new Configuration
        //        {
        //            Application = "C0100 - Load Fact Tables",
        //            Key = "Checkpoint: FACT_ProcedureUpdate Completed",
        //            Value = "Aug 29 2018 12:00AM"
        //        };
        //        db.Configurations.Add(f);

        //        Configuration g = new Configuration
        //        {
        //            Application = "ContrastProtocols",
        //            Key = "ApplicationStatus",
        //            Value = "online"
        //        };
        //        db.Configurations.Add(g);

        //        Configuration h = new Configuration
        //        {
        //            Application = "Encore",
        //            Key = "ApplicationStatus",
        //            Value = "online"
        //        };
        //        db.Configurations.Add(h);

        //        db.SaveChanges();
        //    }
        //}

        //public void CreateSSISConfig()
        //{
        //    using (var db = new logconfigEntities1())
        //    {
        //        SSIS_Configuration a = new SSIS_Configuration
        //        {
        //            ConfigurationFilter = "PS360_002 - StageReportIDMapping",
        //            ConfiguredValue = "Data Source=XXXXXXXXX;Initial Catalog=RPT_SyngoWorkflow;Provider=SQLNCLI11.1;Integrated Security=SSPI;",
        //            PackagePath = "\\Package.Connections[Reporting Database].Properties[ConnectionString]",
        //            ConfiguredValueType = "String"
        //        };
        //        db.SSIS_Configurations.Add(a);

        //        SSIS_Configuration b = new SSIS_Configuration
        //        {
        //            ConfigurationFilter = "ImagingDataStaging-FRDMart",
        //            ConfiguredValue = "radsoftwaredev@ccf.org",
        //            PackagePath = "\\Package.Variables[User::NotificationSender].Properties[Value]",
        //            ConfiguredValueType = "String"
        //        };
        //        db.SSIS_Configurations.Add(b);

        //        SSIS_Configuration c = new SSIS_Configuration
        //        {
        //            ConfigurationFilter = "PS360_002 - StageReportIDMapping",
        //            ConfiguredValue = "Data Source=XXXXXXXXX;Initial Catalog=ImagingDataRepository;Provider=SQLNCLI11.1;Integrated Security=SSPI;Auto Translate=False;",
        //            PackagePath = "\\Package.Connections[ImagingDataRepository].Properties[ConnectionString]",
        //            ConfiguredValueType = "String"
        //        };
        //        db.SSIS_Configurations.Add(c);

        //        SSIS_Configuration d = new SSIS_Configuration
        //        {
        //            ConfigurationFilter = "ImagingDataStaging-FRDMart",
        //            ConfiguredValue = "wetzelj@ccf.org;ciancim@ccf.org;marrerl@ccf.org",
        //            PackagePath = "\\Package.Connections[ImagingDataRepository].Properties[ConnectionString]",
        //            ConfiguredValueType = "String"
        //        };
        //        db.SSIS_Configurations.Add(d);

        //        SSIS_Configuration e = new SSIS_Configuration
        //        {
        //            ConfigurationFilter = "ImagingDataStaging-FRDMart",
        //            ConfiguredValue = "SmtpServer=XXXXXXXXX;UseWindowsAuthentication=False;EnableSsl=False;",
        //            PackagePath = "\\Package.Connections[CCF Email].Properties[ConnectionString]",
        //            ConfiguredValueType = "String"
        //        };
        //        db.SSIS_Configurations.Add(e);

        //        SSIS_Configuration f = new SSIS_Configuration
        //        {
        //            ConfigurationFilter = "IDRMasterTables-Doctor",
        //            ConfiguredValue = "Data Source=XXXXXXXXX;Initial Catalog=ImagingDataStaging;Provider=SQLNCLI11.1;Integrated Security=SSPI;Auto Translate=False;",
        //            PackagePath = "\\Package.Connections[ImagingDataStaging].Properties[ConnectionString]",
        //            ConfiguredValueType = "String"
        //        };
        //        db.SSIS_Configurations.Add(f);

        //        SSIS_Configuration g = new SSIS_Configuration
        //        {
        //            ConfigurationFilter = "SWF003_GRAILSTRIVEExport",
        //            ConfiguredValue = "SmtpServer=XXXXXXXXX;UseWindowsAuthentication=False;EnableSsl=False;",
        //            PackagePath = "\\Package.Connections[CCF Email].Properties[ConnectionString]",
        //            ConfiguredValueType = "String"
        //        };
        //        db.SSIS_Configurations.Add(g);

        //        SSIS_Configuration h = new SSIS_Configuration
        //        {
        //            ConfigurationFilter = "SWF003_GRAILSTRIVEExport",
        //            ConfiguredValue = "TRUE",
        //            PackagePath = "\\Package.Variables[User::Production].Properties[Value]",
        //            ConfiguredValueType = "Boolean"
        //        };
        //        db.SSIS_Configurations.Add(h);

        //        SSIS_Configuration i = new SSIS_Configuration
        //        {
        //            ConfigurationFilter = "SWF003_GRAILSTRIVEExport",
        //            ConfiguredValue = "6588",
        //            PackagePath = "\\Package.Variables[User::SystemUserID].Properties[Value]",
        //            ConfiguredValueType = "Int32"
        //        };
        //        db.SSIS_Configurations.Add(i);

        //        SSIS_Configuration j = new SSIS_Configuration
        //        {
        //            ConfigurationFilter = "VW002_Export Techical Work Units",
        //            ConfiguredValue = "H:\\TemporaryFileStorage\\",
        //            PackagePath = "\\Package.Variables[User::FilePath].Properties[Value]",
        //            ConfiguredValueType = "String"
        //        };
        //        db.SSIS_Configurations.Add(j);

        //        db.SaveChanges();
        //    }
        //}
    }
}