using System;
using System.Collections.Generic;
using System.Linq.Dynamic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AutoMapper;
using CCFLoggingConfig.Models;

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
                    var request = Mapper.Map<LogViewModel>(log);
                    return Json(request);
                }
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }

        }

        [HttpPost]
        public JsonResult GetLogForDataTable(string application,string searchTerm)
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
                        query = query.OrderBy(sortColumn);
                    }
                    else
                    {
                        query = query.OrderBy(sortColumn + " " + sortDirection);
                    }

                    //filtering
                    if (!String.IsNullOrWhiteSpace(application))
                    {
                        query = query.Where(l => l.Title == application.Trim());
                    }

                    if (!String.IsNullOrWhiteSpace(searchTerm))
                    {
                        query = query.Where(l => l.Message.Contains(searchTerm) ||
                            l.Title.Contains(searchTerm) ||
                            l.AuthenticatedUser.Contains(searchTerm));
                    }

                    //total number of rows count     
                    recordsTotal = query.Count();
                    //Paging     
                    var data = query
                        .Skip(skip)
                        .Take(pageSize)
                        .ToList();

                    var requests = Mapper.Map<List<LogViewModel>>(data);

                    //Returning Json Data    
                    return Json(new { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = requests });
                }
            }
            catch(Exception ex)
            {
                return Json(ex.Message);
            }
        }

        public JsonResult GetApplications() {
            try
            {
                using (var db = new logconfigEntities())
                {
                    var applications = db.Logs.Select(l => l.Title).Distinct().ToList();

                    return Json(applications);
                }
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }
    }
}