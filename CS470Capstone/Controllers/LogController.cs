using System;
using System.Collections.Generic;
using System.Linq.Dynamic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CCFLoggingConfig.Controllers
{
    public class LogController : Controller
    {

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetLog(int logID)
        {
            try
            {
                using (var db = new logconfigEntities())
                {
                    var log = db.Logs.Find(logID);
                    return Json(log);
                }
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }

        }

        [HttpPost]
        public JsonResult GetLogForDataTable()
        {
            try
            {
                var draw = Request.Form.GetValues("draw").FirstOrDefault();
                var start = Request.Form.GetValues("start").FirstOrDefault();
                var length = Request.Form.GetValues("length").FirstOrDefault();

                var searchValue = Request.Form["search[value]"].FirstOrDefault().ToString();

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
                        query = query.OrderBy(sortColumn);
                    }
                    else
                    {
                        query = query.OrderBy(sortColumn + " " + sortDirection);
                    }

                    // TODO:
                    // fix this

                    ////Search
                    if (!string.IsNullOrEmpty(searchValue))
                    {
                        query = query.Where(l => l.Title.Contains(searchValue) ||
                            l.AuthenticatedUser.Contains(searchValue));
                    }

                    //total number of rows count     
                    recordsTotal = query.Count();
                    //Paging     
                    var data = query.Skip(skip).Take(pageSize).ToList();

                    //Returning Json Data    
                    return Json(new { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = data });
                }
            }
            catch(Exception ex)
            {
                return Json(ex.Message);
            }
        }

        //public void CreateSSISLog()
        //{
        //    using (var db = new logconfigEntities1())
        //    {
        //        sysssislog a = new sysssislog
        //        {
        //            id = 839627,
        //            @event = "PackageStart",
        //            computer = "CC-RADETL02",
        //            @operator = "CC\rptsw_svc",
        //            source = "P0002 - Orchestrate Daily Incremental Load",
        //            sourceid = new Guid("778EE331-0031-42DE-B8E2-24F8833D1072"),
        //            executionid = new Guid("6CEB3F08-111B-4671-A930-8D95ADD57AED"),
        //            starttime = DateTime.Now,
        //            endtime = DateTime.Now,
        //            datacode = 0,
        //            databytes = new byte[0],
        //            message = "Beginning of package execution."
        //        };
        //        db.sysssislogs.Add(a);

        //        sysssislog b = new sysssislog
        //        {
        //            id = 839628,
        //            @event = "User:PackageStart",
        //            computer = "CC-RADETL02",
        //            @operator = "CC\rptsw_svc",
        //            source = "P0002 - Orchestrate Daily Incremental Load",
        //            sourceid = new Guid("778EE331-0031-42DE-B8E2-24F8833D1072"),
        //            executionid = new Guid("6CEB3F08-111B-4671-A930-8D95ADD57AED"),
        //            starttime = DateTime.Now,
        //            endtime = DateTime.Now,
        //            datacode = 0,
        //            databytes = new byte[0],
        //            message = "Beginning of package execution."
        //        };
        //        db.sysssislogs.Add(b);

        //        sysssislog c = new sysssislog
        //        {
        //            id = 839628,
        //            @event = "OnPreExecute",
        //            computer = "CC-RADETL02",
        //            @operator = "CC\rptsw_svc",
        //            source = "P0002 - Orchestrate Daily Incremental Load",
        //            sourceid = new Guid("778EE331-0031-42DE-B8E2-24F8833D1072"),
        //            executionid = new Guid("6CEB3F08-111B-4671-A930-8D95ADD57AED"),
        //            starttime = DateTime.Now,
        //            endtime = DateTime.Now,
        //            datacode = 0,
        //            databytes = new byte[0],
        //            message = ""
        //        };
        //        db.sysssislogs.Add(c);

        //        sysssislog d = new sysssislog
        //        {
        //            id = 839628,
        //            @event = "OnPreExecute",
        //            computer = "CC-RADETL02",
        //            @operator = "CC\rptsw_svc",
        //            source = "P0002 - Orchestrate Daily Incremental Load",
        //            sourceid = new Guid("778EE331-0031-42DE-B8E2-24F8833D1072"),
        //            executionid = new Guid("6CEB3F08-111B-4671-A930-8D95ADD57AED"),
        //            starttime = DateTime.Now,
        //            endtime = DateTime.Now,
        //            datacode = 0,
        //            databytes = new byte[0],
        //            message = ""
        //        };
        //        db.sysssislogs.Add(d);

        //        sysssislog e = new sysssislog
        //        {
        //            id = 839631,
        //            @event = "OnPreExecute",
        //            computer = "CC-RADETL02",
        //            @operator = "CC\rptsw_svc",
        //            source = "Truncate GLAccount Tables",
        //            sourceid = new Guid("29FB22B0-396A-4002-8742-1273D5B09081"),
        //            executionid = new Guid("6CEB3F08-111B-4671-A930-8D95ADD57AED"),
        //            starttime = DateTime.Now,
        //            endtime = DateTime.Now,
        //            datacode = 0,
        //            databytes = new byte[0],
        //            message = ""
        //        };
        //        db.sysssislogs.Add(e);

        //        sysssislog f = new sysssislog
        //        {
        //            id = 839631,
        //            @event = "OnPreExecute",
        //            computer = "CC-RADETL02",
        //            @operator = "CC\rptsw_svc",
        //            source = "Truncate GLAccount Tables",
        //            sourceid = new Guid("E6A156BA-5CFC-4BBC-8EE0-51C82C094D24"),
        //            executionid = new Guid("6CEB3F08-111B-4671-A930-8D95ADD57AED"),
        //            starttime = DateTime.Now,
        //            endtime = DateTime.Now,
        //            datacode = 0,
        //            databytes = new byte[0],
        //            message = ""
        //        };
        //        db.sysssislogs.Add(f);

        //        db.SaveChanges();
        //    }
        //}

            //public JsonResult CreateLog()
            //{
            //    using (var db = new logconfigEntities1()) {
            //        Log a = new Log
            //        {
            //            LogID = 309695,
            //            EventID = 2,
            //            Priority = 1,
            //            Severity = "Information",
            //            Title = "RadPeerReview - Audit",
            //            Timestamp = DateTime.Now,
            //            MachineName = "CC-CLWEB52",
            //            AppDomainName = "/LM/W3SVC/27/ROOT/imaging/radpeerreview-30-131775097541452917",
            //            ProcessID = "4860",
            //            ProcessName = "c:\\windows\\system32\\inetsrv\\w3wp.exe",
            //            ThreadName = "NULL",
            //            Win32ThreadId = "8612",
            //            AuthenticatedUser = "larricr1",
            //            Message = "User Login",
            //            FormattedMessage = "{\"AuthenticatedUser\":\"larricr1\",\"EntityKey\":null,\"Message\":\"User Login\",\"Categories\":[\"RadPeerReview\"],\"Priority\":1,\"EventId\":2,\"Severity\":8,\"LoggedSeverity\":\"Information\",\"Title\":\"RadPeerReview - Audit\",\"TimeStamp\":\"2018 - 08 - 01T01:29:00.4309166Z\",\"MachineName\":\"CC - CLWEB52\",\"AppDomainName\":\" / LM / W3SVC / 27 / ROOT / imaging / radpeerreview - 30 - 131775097541452917\",\"ProcessId\":\"4860\",\"ProcessName\":\"c:\\windows\\system32\\inetsrv\\w3wp.exe\",\"ManagedThreadName\":null,\"Win32ThreadId\":\"8612\",\"ExtendedProperties\":{\"ImpersonationName\":\"Larrick, Randy\",\"URL\":\"http://iweb4.ccf.org/imaging/radpeerreview/Login/LoginEmployee.aspx\",\"HTTPMethod\":\"POST\",\"IsAuthenticated\":false,\"UserAgent\":\"Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko\"},\"TimeStampString\":\"8/1/2018 1:29:00 AM\",\"ActivityId\":\"00000000-0000-0000-0000-000000000000\",\"RelatedActivityId\":null,\"ErrorMessages\":null,\"ActivityIdString\":\"00000000-0000-0000-0000-000000000000\",\"CategoriesStrings\":[\"RadPeerReview\"]}",
            //            EntityKey = "NULL"
            //        };
            //        db.Logs.Add(a);
            //        Log b = new Log
            //        {
            //            LogID = 309696,
            //            EventID = 3,
            //            Priority = 1,
            //            Severity = "Information",
            //            Title = "RadPeerReview - Audit",
            //            Timestamp = DateTime.Now,
            //            MachineName = "CC-CLWEB52",
            //            AppDomainName = "/LM/W3SVC/27/ROOT/imaging/radpeerreview-30-131775097541452917",
            //            ProcessID = "4860",
            //            ProcessName = "c:\\windows\\system32\\inetsrv\\w3wp.exe",
            //            ThreadName = "NULL",
            //            Win32ThreadId = "19036",
            //            AuthenticatedUser = "larricr1",
            //            Message = "Peer Review Auto Assigmnent",
            //            FormattedMessage = "{\"AuthenticatedUser\":\"larricr1\",\"EntityKey\":null,\"Message\":\"User Login\",\"Categories\":[\"RadPeerReview\"],\"Priority\":1,\"EventId\":2,\"Severity\":8,\"LoggedSeverity\":\"Information\",\"Title\":\"RadPeerReview - Audit\",\"TimeStamp\":\"2018 - 08 - 01T01:29:00.4309166Z\",\"MachineName\":\"CC - CLWEB52\",\"AppDomainName\":\" / LM / W3SVC / 27 / ROOT / imaging / radpeerreview - 30 - 131775097541452917\",\"ProcessId\":\"4860\",\"ProcessName\":\"c:\\windows\\system32\\inetsrv\\w3wp.exe\",\"ManagedThreadName\":null,\"Win32ThreadId\":\"8612\",\"ExtendedProperties\":{\"ImpersonationName\":\"Larrick, Randy\",\"URL\":\"http://iweb4.ccf.org/imaging/radpeerreview/Login/LoginEmployee.aspx\",\"HTTPMethod\":\"POST\",\"IsAuthenticated\":false,\"UserAgent\":\"Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko\"},\"TimeStampString\":\"8/1/2018 1:29:00 AM\",\"ActivityId\":\"00000000-0000-0000-0000-000000000000\",\"RelatedActivityId\":null,\"ErrorMessages\":null,\"ActivityIdString\":\"00000000-0000-0000-0000-000000000000\",\"CategoriesStrings\":[\"RadPeerReview\"]}",
            //            EntityKey = "NULL"
            //        };
            //        db.Logs.Add(b);
            //        Log c = new Log
            //        {
            //            LogID = 309697,
            //            EventID = 4,
            //            Priority = 1,
            //            Severity = "Information",
            //            Title = "PS360Parsing_MRMS - SystemAction",
            //            Timestamp = DateTime.Now,
            //            MachineName = "CC-RADETL02",
            //            AppDomainName = "PS360Parsing_MRMS.exe",
            //            ProcessID = "12448",
            //            ProcessName = "c:\\windows\\system32\\inetsrv\\w3wp.exe",
            //            ThreadName = "NULL",
            //            Win32ThreadId = "8300",
            //            AuthenticatedUser = "NULL",
            //            Message = "Processing Completed",
            //            FormattedMessage = "{\"AuthenticatedUser\":\"larricr1\",\"EntityKey\":null,\"Message\":\"User Login\",\"Categories\":[\"RadPeerReview\"],\"Priority\":1,\"EventId\":2,\"Severity\":8,\"LoggedSeverity\":\"Information\",\"Title\":\"RadPeerReview - Audit\",\"TimeStamp\":\"2018 - 08 - 01T01:29:00.4309166Z\",\"MachineName\":\"CC - CLWEB52\",\"AppDomainName\":\" / LM / W3SVC / 27 / ROOT / imaging / radpeerreview - 30 - 131775097541452917\",\"ProcessId\":\"4860\",\"ProcessName\":\"c:\\windows\\system32\\inetsrv\\w3wp.exe\",\"ManagedThreadName\":null,\"Win32ThreadId\":\"8612\",\"ExtendedProperties\":{\"ImpersonationName\":\"Larrick, Randy\",\"URL\":\"http://iweb4.ccf.org/imaging/radpeerreview/Login/LoginEmployee.aspx\",\"HTTPMethod\":\"POST\",\"IsAuthenticated\":false,\"UserAgent\":\"Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko\"},\"TimeStampString\":\"8/1/2018 1:29:00 AM\",\"ActivityId\":\"00000000-0000-0000-0000-000000000000\",\"RelatedActivityId\":null,\"ErrorMessages\":null,\"ActivityIdString\":\"00000000-0000-0000-0000-000000000000\",\"CategoriesStrings\":[\"RadPeerReview\"]}",
            //            EntityKey = "NULL"
            //        };
            //        db.Logs.Add(c);
            //        Log d = new Log
            //        {
            //            LogID = 309698,
            //            EventID = 3,
            //            Priority = 1,
            //            Severity = "Information",
            //            Title = "RadPeerReview - UserAction",
            //            Timestamp = DateTime.Now,
            //            MachineName = "CC-CLWEB52",
            //            AppDomainName = "/LM/W3SVC/27/ROOT/imaging/radpeerreview-30-131775097541452917",
            //            ProcessID = "4860",
            //            ProcessName = "c:\\windows\\system32\\inetsrv\\w3wp.exe",
            //            ThreadName = "NULL",
            //            Win32ThreadId = "18652",
            //            AuthenticatedUser = "larricr1",
            //            Message = "Peer Review Submission",
            //            FormattedMessage = "{\"AuthenticatedUser\":\"larricr1\",\"EntityKey\":null,\"Message\":\"User Login\",\"Categories\":[\"RadPeerReview\"],\"Priority\":1,\"EventId\":2,\"Severity\":8,\"LoggedSeverity\":\"Information\",\"Title\":\"RadPeerReview - Audit\",\"TimeStamp\":\"2018 - 08 - 01T01:29:00.4309166Z\",\"MachineName\":\"CC - CLWEB52\",\"AppDomainName\":\" / LM / W3SVC / 27 / ROOT / imaging / radpeerreview - 30 - 131775097541452917\",\"ProcessId\":\"4860\",\"ProcessName\":\"c:\\windows\\system32\\inetsrv\\w3wp.exe\",\"ManagedThreadName\":null,\"Win32ThreadId\":\"8612\",\"ExtendedProperties\":{\"ImpersonationName\":\"Larrick, Randy\",\"URL\":\"http://iweb4.ccf.org/imaging/radpeerreview/Login/LoginEmployee.aspx\",\"HTTPMethod\":\"POST\",\"IsAuthenticated\":false,\"UserAgent\":\"Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko\"},\"TimeStampString\":\"8/1/2018 1:29:00 AM\",\"ActivityId\":\"00000000-0000-0000-0000-000000000000\",\"RelatedActivityId\":null,\"ErrorMessages\":null,\"ActivityIdString\":\"00000000-0000-0000-0000-000000000000\",\"CategoriesStrings\":[\"RadPeerReview\"]}",
            //            EntityKey = "NULL"
            //        };
            //        db.Logs.Add(d);
            //        Log e = new Log
            //        {
            //            LogID = 309699,
            //            EventID = 2,
            //            Priority = 1,
            //            Severity = "Information",
            //            Title = "Encore - Audit",
            //            Timestamp = DateTime.Now,
            //            MachineName = "CC-CLWEB52",
            //            AppDomainName = "/LM/W3SVC/27/ROOT/imaging/radpeerreview-30-131775097541452917",
            //            ProcessID = "4860",
            //            ProcessName = "c:\\windows\\system32\\inetsrv\\w3wp.exe",
            //            ThreadName = "NULL",
            //            Win32ThreadId = "18652",
            //            AuthenticatedUser = "poturam",
            //            Message = "Logon",
            //            FormattedMessage = "{\"AuthenticatedUser\":\"larricr1\",\"EntityKey\":null,\"Message\":\"User Login\",\"Categories\":[\"RadPeerReview\"],\"Priority\":1,\"EventId\":2,\"Severity\":8,\"LoggedSeverity\":\"Information\",\"Title\":\"RadPeerReview - Audit\",\"TimeStamp\":\"2018 - 08 - 01T01:29:00.4309166Z\",\"MachineName\":\"CC - CLWEB52\",\"AppDomainName\":\" / LM / W3SVC / 27 / ROOT / imaging / radpeerreview - 30 - 131775097541452917\",\"ProcessId\":\"4860\",\"ProcessName\":\"c:\\windows\\system32\\inetsrv\\w3wp.exe\",\"ManagedThreadName\":null,\"Win32ThreadId\":\"8612\",\"ExtendedProperties\":{\"ImpersonationName\":\"Larrick, Randy\",\"URL\":\"http://iweb4.ccf.org/imaging/radpeerreview/Login/LoginEmployee.aspx\",\"HTTPMethod\":\"POST\",\"IsAuthenticated\":false,\"UserAgent\":\"Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko\"},\"TimeStampString\":\"8/1/2018 1:29:00 AM\",\"ActivityId\":\"00000000-0000-0000-0000-000000000000\",\"RelatedActivityId\":null,\"ErrorMessages\":null,\"ActivityIdString\":\"00000000-0000-0000-0000-000000000000\",\"CategoriesStrings\":[\"RadPeerReview\"]}",
            //            EntityKey = "NULL"
            //        };
            //        db.Logs.Add(e);

            //        db.SaveChanges();
            //    }
            //        return Json(true);
            //}
    }
}